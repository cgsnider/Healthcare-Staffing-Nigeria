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
        let sql = `CALL get_postings('${req.user.email}', ${(req.body.category != undefined) ? "'req.body.category'" : 'null'})`
        let query = db.query(sql, (err, results) => {
            if (err);
            res.end(JSON.stringify(results))
        })
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/applications', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_applications('${req.user.email}')`
        let query = db.query(sql, (err, results) => {
            if (err) {
                console.log("Error in getting applications");
            }
            res.end(JSON.stringify(results));
        })
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/profile', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_profile('${req.user.email}')`
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            res.end(JSON.stringify(results))
        })
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/categories', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_posting_categories`;
        let query = db.query(sql, (err, results) => {
            if (err);
            res.end(JSON.stringify(results))
        })
    } else {
        res.end(JSON.stringify('402'));
    }
});

router.get('/education', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_education('${req.user.email}')`;
        let query = db.query(sql, (err, results) => {
            if (err);
            res.end(JSON.stringify(results))
        })
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


router.post('/profile', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        data = req.body;
        let params = `'${data.Email}', '${data.FName}', '${data.LName}', '${data.Email}',`
        params += `'${data.Specialization}', '${data.PhoneNumber}', '${data.MDCN}', '${data.Country}', '${data.City}', '${data.Street}'`
        const sql = `CALL update_professional_profile(${params})`;
        let query = db.query(sql, (err, results) => {
            if (err);
            res.end(JSON.stringify(results))
        })
    } else res.end(JSON.stringify(req.user));
})

router.post('/profile_picture', [...STD_MIDWARE, upload.single('image')], async (req, res) => {
    const file = req.file;
    await util.formatImage(file.path);

    const upload = await s3.upload(file);
    let sql = ` ('${req.user.email}', '${upload.Key}')`

    if (req.user['custom:type'] == 'Professional') {
        sql = `CALL update_professional_picture` + sql;
    } else if (req.user['custom:type'] == 'Facility') {
        sql = `CALL update_facility_picture` + sql;
    }

    query = db.query(sql, (err, results) => {
        if (err) console.log("FAILED TO LOG PROFILE PICTURE IN DB");
        else res.end(JSON.stringify(upload.Key))
    })

})

router.post('/education', STD_MIDWARE, (req, res) => {
    if(req.user != 402) {
        let data = util.objectArray(req.body);
        let out = []
        if(data.College != 'undefined') {
        data.forEach(e => {
            const sql = `call cmg_staffing_nigeria.add_education('${req.user.email}', '${e.College}', '${e.Degree}', '${e.StartDate}', '${e.EndDate}')`
            let query = db.query(sql, (err, results) => {
                if (err);
                out.push(results);
            })
        });
        res.end(JSON.stringify(util.arrayObject(out)));
    }
    } else res.end();
})

router.post('/jobs', STD_MIDWARE, (req, res) => {
    if (req.user != 402) {
        data = req.body;
        let params = `'${req.user.email}', '${data.Title}',`
        const sql = `CALL create_applications(${params})`;
        let query = db.query(sql, (err, results) => {
            if (err);
            res.end(JSON.stringify(results))
        })
    } else res.end();
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