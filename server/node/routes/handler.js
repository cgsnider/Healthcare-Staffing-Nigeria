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


/**
 * Code Overview
 * 
 * This file contains a list of all routes that the front end can request to this Node Server.
 * 
 * Most of the routes follows the following basic structure:
 * 
 *  router.api_call_type(url, middleware (request, result) => {
 *     if (req.user != 401) { -> If the user is valid according to authenticate middleware 
 *         const procedure = ...; -> Specifies the MySQL procedure to be use
 *         const params = [...]; -> Specifies any paramaters to be passed in as a list in appropriate order for the MySQL procedure (see .sql files in server/database)
 *         db.call(procedure, params) -> Calls db.call to asynchronously
 *              .then(results => res.end(JSON.stringify(results))) -> sends back the results of the query if successful
 *              .catch(err => res.end(JSON.stringify('Error fetching jobs'))); -> sends back an error message to client if query failed
 *     } else res.end(JSON.stringify(req.user)); -> if the user is not valid, sends back appropriate code (401)
 *  });
 * 
 *  Exact route structure varies. Common variation includes selecting different proceedures or parameters 
 *  depending on the type of client making the request.
 * 
 *  STD_MIDWARE contains middleware for authenitcating the user and checking/handling edge case for new users.
 * 
 *  S3 connects to the amazonAWS bucket for storing mass media
 *  multer handles sending mass media from client to node server
 * 
 */


router.get('/jobs', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {

        const procedure = 'get_postings';
        const params = [req.user.email, req.body.category];
        
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify('Error fetching jobs')));

    } else res.end(JSON.stringify(req.user));
});

router.get('/applications', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        let procedure;
        if (req.user['custom:type'] == 'Professional') {
            procedure = 'get_professional_applications';
        } else if (req.user['custom:type'] == 'Facility') {
            procedure = 'get_facility_applications';
        }

        const params = [req.user.email]
        db.call(procedure, params)
            .then(results => {
                console.log(results)
                res.end(JSON.stringify(results))})
            .catch(err => {
                console.log(err)
                res.end("Error Getting Applications")});
    } else res.end(JSON.stringify(req.user));

});

router.get('/profile', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
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

    } else res.end(JSON.stringify(req.user));
});

router.get('/categories', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        const procedure = 'get_posting_categories';
        db.call(procedure)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end(JSON.stringify("Error fetching categories")));
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.get('/education', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        const procedure = 'get_education';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end('Error fetching education'))
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.get('/resume', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
    
    let username = null;

    if (req.user['custom:type'] == 'Professional') {
        username = req.user.email;
    } else if (req.user['custom:type'] == 'Facility') {
        username = req.body.Email
    }

    const params = [username, 'RESUME', null]
    const procedure = 'get_document_professional'

    db.call(procedure, params, null)
        .then(result => {
            const meta = result[0][0]
            s3.download(meta.S3Key)
                .then(file => {
                    res.set('FileName', meta.FileName)
                    res.set('TimeUploaded', meta.TimeCreated)
                    res.end(file.Body)
                })
                .catch(err => console.log(err))
        }).catch(err => {
            res.end('err')
        })

    } else res.end(JSON.stringify(req.user));
})

router.get('/profile_picture/:key', (req, res) => {
    const filename = req.params.key
    const readstream = s3.download_stream(key);
    readstream.pipe(res);
})

router.get('/applicants', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        console.log(req.headers.params)
        const procedure = 'get_applicants';
        const params = [req.user.email, req.headers.params.PostingTitle];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end('Error fetching education'))
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.get('/review_prof_verification', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        const procedure = 'admin_verification_pending_professional';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => { console.log("results: ", results)
                res.end(JSON.stringify(results[0]))})
            .catch(err => { console.log("ERROR: ", err)
                res.end('Error fetching education')})
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.get('/postings', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        const procedure = 'get_fac_job_postings';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end('Error fetching postings'))
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.get('/review_fac_verification', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        const procedure = 'admin_verification_pending_facility';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.end('Error fetching education'))
    } else {
        res.end(JSON.stringify(req.user));
    }
});

router.post('/verify_professional', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {

        if (req.user['custom:type'] == 'Admin') {
            const procedure = 'admin_verify_professional'
            const params = [req.user.email, req.body.ProfEmail]

            console.log('PARAMS: ', params)

            db.call(procedure, params)
                .then(results => {console.log('RESULTS: ', results); res.end(JSON.stringify(results))})
                .catch(err => {console.log('ERROR: ', err);; res.end(418)});
        }
    }
});

router.post('/bulk_professionals', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        if (req.user['custom:type'] == 'Admin') {
            const procedure = 'admin_bulk_professionals'
            const params = [req.user.email]

            db.call(procedure, params)
                .then(results => res.end(JSON.stringify(results)))
                .catch(err => res.end(418));
        }
    }
});

router.post('/bulk_facilities', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        if (req.user['custom:type'] == 'Admin') {
            const procedure = 'admin_bulk_facilities'
            const params = [req.user.email]

            db.call(procedure, params)
                .then(results => res.end(JSON.stringify(results)))
                .catch(err => res.end(418));
        }
    }
});


router.post('/opening', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        if (req.user['custom:type'] == 'Facility') {
            const procedure = 'create_job_posting';
            const params = [req.user.email, req.body.Title, req.body.Salary, 
                req.body.Descript, req.body.Slots, req.body.Category, req.body.Shifts];

            db.call(procedure, params)
                .then(results => res.end(JSON.stringify(results)))
                .catch(err => res.end(418));

        } else res.end(JSON.stringify(401))
    } else res.end(JSON.stringify(req.user));
});

router.post('/hire_applicant', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
        if (req.user['custom:type'] == 'Facility') {
            const procedure = 'hire_applicant'
            const params = [req.user.email, req.body.ApplicantEmail, req.body.PostingTitle]

            db.call(procedure, params)
                .then(results => res.end(JSON.stringify(results)))
                .catch(err => res.end(418));
        }
    }
});


router.post('/apply_verification', STD_MIDWARE, (req, res) => {
    if (req.user != 401) {
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
    if (req.user != 401) {
        data = req.body;
        let params;
        let procedure;
        
        if (req.user['custom:type'] == 'Professional') {
            procedure = 'update_professional_profile';
            params = [req.user.email, data.FName, data.LName, data.Email, data.Specialization, 
                data.PhoneNumber, data.MDCN, data.Country, data.City, data.Street, data.LicenseNumber];
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
    if (req.user != 401) {
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
    } else res.end(JSON.stringify(req.user));
})

router.post('/resume', [...STD_MIDWARE, upload.single('pdf')], async (req, res) => {
    if (req.user != 401) {
        const file = req.file;

        const upload = await s3.upload(file);

        let procedure;
        const params = [req.user.email, 'RESUME',upload.Key, file.originalname];

        if (req.user['custom:type'] == 'Professional') {
            procedure = 'add_document_professional';
            db.call(procedure, params)
                .then(res.end(JSON.stringify(upload.Key)))
                .catch(err => res.end("FAILED TO LOG PROFILE PICTURE IN DB"))
        }  else {
            res.end(418)
        }
    } else res.end(JSON.stringify(req.user));
})


router.post('/resume/:email', [upload.single('pdf')], async (req, res) => {
    const username = req.params.email
    const file = req.file;

    const upload = await s3.upload(file);

    let procedure;
    const params = [username, 'RESUME',upload.Key, file.originalname];

    procedure = 'add_document_professional';
    db.call(procedure, params)
        .then(result => res.end(JSON.stringify(upload.Key)))
        .catch(err => {console.log(err); res.end("FAILED TO LOG PROFILE PICTURE IN DB")})

})


router.post('/education', STD_MIDWARE, async (req, res) => {
    if(req.user != 401) {
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
    if (req.user != 401) {
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

module.exports = router;