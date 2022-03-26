const express = require('express');
const auth = require('../auth/auth.js');
const db = require('../database/database.js');
const util = require('./util.js');
const multer = require('multer')


const upload = multer({ dest: 'uploads/' })

const s3 = require('../database/s3.js')

const authenticate = auth.authenticateToken;

const router = express.Router();

router.use(express.urlencoded({extended: false}));

const STD_MIDWARE = [authenticate, db.handleNewUser]


router.get('/jobs', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        const procedure = 'get_postings';
        const params = [req.user.email, req.body.category];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify('Error fetching jobs')));
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/applications', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        const procedure = 'get_applications';
        const params = [req.user.email]
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end("Error Getting Applications"));
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/profile', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        const params = [req.user.email];
        let procedure = '';
        if (req.user['custom:type'] == 'Professional') {
            procedure = 'get_professional_profile';
        } else if (req.user['custom:type'] == 'Facility') {
            procedure = 'get_facility_profile';
        }

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify('Error fetching profile')));

    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/categories', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        const procedure = 'get_posting_categories';
        let sql = `CALL get_posting_categories`;
        db.call(procedure)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify("Error fetching categories")));
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/education', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_education('${req.user.email}')`;
        const procedure = 'get_education';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => res.end(results))
            .catch(err => res.end('Error fetching education'))
    } else {
        res.end(JSON.stringify('402'));
    }
});


router.get('/profile_picture/:key', (req, res) => {
    const key = req.params.key;
    const readstream = s3.download(key);
    console.log(readstream)
    readstream.pipe(res);
})

router.post('/apply_verification', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        const params = [req.user.email];
        let procedure = '';
        if (req.user['custom:type'] == 'Professional') {
            procedure = 'professionals_apply_for_verification'
        } else if (req.user['custom:type'] == 'Facility') {
            procedure = 'facility_apply_for_verification';
        }

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify('Error applying for verification')));

    } else res.end(JSON.stringify(req.user));
})


router.post('/profile', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        data = req.body;
        let params;
        let procedure;
        
        if (req.user['custom:type'] == 'Professional') {
            procedure = 'update_professional_profile';
            params = [req.user.email, data.FName, data.LName, data.Email, data.Specialization, 
                data.PhoneNumber, data.MDCN, data.Country, data.City, data.Street];
        } 
        else if (req.user['custom:type'] == 'Facility') {
            procedure = 'update_facility_profile';
            params = [req.user.email, data.City, data.Country, data.Email, data.FacName, data.State, 
                data.Descript, data.Street, data.CName, data.PhoneNumber];
        }

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end("Error saving profile"));

    } else res.end(JSON.stringify(req.user));
})

router.post('/profile_picture', [...STD_MIDWARE, upload.single('image')], async (req, res) => {
    const file = req.file;
    await util.formatImage(file.path);

    const upload = await s3.upload(file);

    let procedure;
    const params = [req.user.email, upload.Key];

    if (req.user['custom:type'] == 'Professional') {
        procedure = 'update_professional_picture';
    } else if (req.user['custom:type'] == 'Facility') {
        procedure = 'update_facility_picture'
    }

    db.call(procedure, params)
        .then(res.end(JSON.stringify(upload.Key)))
        .catch(err => res.end("FAILED TO LOG PROFILE PICTURE IN DB"))

})

router.post('/education', STD_MIDWARE, async (req, res) => {
    if(req.user != 402) {
        let data = util.objectArray(req.body);
        let out = []
        if(data.College != 'undefined') {
            const procedure = 'add_education';

            data.forEach(async e => {
                const params = [req.user.email, e.College, e.Degree, e.StartDate, e.EndDate];
                const result = await db.call(procedure, params);
                out.push(result);
            });

            res.end(JSON.stringify(util.arrayObject(out)));
            }
    } else res.end(req.user);
})

router.post('/jobs', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        data = req.body;
        t = new Date();
        date = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate();
        time = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        datetime = date + ' ' + time;
        cover = Object.keys(data.cover).map(function (key) { return data.cover[key] }).join("");

        const params = [data.email, req.user.email, data.title, cover, datetime];
        const procedure = 'create_application';

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)));

    } else res.end(req.user);
})

// router.post('/register', (req, res) => {
    
//     const newUser = {
//         email: req.body.email,
//         password: req.body.password,
//         fname: req.body.fname,
//         lname: req.body.lname
//     }

//     if (auth.RegisterUser(newUser)) {
//         console.log('Created User')
//         res.status(201).send('Created User');
//     } else {
//         console.log('Failed to Create user')
//         res.status(200).send('Failed to Create user')
//     }
// });

// router.post('/login', (req, res) => {
//     const {email, password} = req.body;

//     console.log(`email: ${email}, password:${password}`);
//     auth.SignIn({email, password});
//     res.status(200).send("recieved");

// });


// Other





module.exports = router;