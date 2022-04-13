const express = require('express');
const auth = require('../auth/auth.js');
const db = require('../database/database.js');
const util = require('./util.js');
const multer = require('multer')
const Code = require('../code.js')


const upload = multer({ dest: 'uploads/' })

const s3 = require('../database/s3.js');
const { JsonWebTokenError } = require('jsonwebtoken');

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
 *         const procedure = ...; -> Specifies the MySQL procedure to be use
 *         const params = [...]; -> Specifies any paramaters to be passed in as a list in appropriate order for the MySQL procedure (see .sql files in server/database)
 *         db.call(procedure, params) -> Calls db.call to asynchronously
 *              .then(results => res.end(JSON.stringify(results))) -> sends back the results of the query if successful
 *              .catch(err => res.end(JSON.stringify('Error fetching jobs'))); -> sends back an error message to client if query failed
 *  });
 * 
 *  Exact route structure varies. Common variation includes selecting different proceedures or parameters 
 *  depending on the type of client making the request.
 * 
 *  STD_MIDWARE contains middleware for authenitcating the user and checking/handling edge case for new users.
 *  If a user is unathenticated the authentication middleware will send back unauthorized as a response
 * 
 *  S3 connects to the amazonAWS bucket for storing mass media
 *  multer handles sending mass media from client to node server
 * 
 */


router.get('/jobs', STD_MIDWARE, (req, res) => {
    req.headers.params = JSON.parse(req.headers.params);
    console.log("req.headers.params: ", req.headers.params)
    const procedure = 'get_postings';
    const params = [req.user.email, req.headers.params.Category];
    
    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.end(JSON.stringify('Error fetching jobs')));
});

router.get('/applications', STD_MIDWARE, (req, res) => {
    let procedure;
    if (req.user['custom:type'] == 'Professional') {
        procedure = 'get_professional_applications';
    } else if (req.user['custom:type'] == 'Facility') {
        procedure = 'get_facility_applications';
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    const params = [req.user.email]

    db.call(procedure, params)
        .then(results => {
            console.log(results)
            res.end(JSON.stringify(results))
        }).catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/profile', STD_MIDWARE, (req, res) => {
    const params = [req.user.email];
    let procedure = '';
    if (req.user['custom:type'] == 'Professional') {
        procedure = 'get_professional_profile';
    } else if (req.user['custom:type'] == 'Facility') {
        procedure = 'get_facility_profile';
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/categories', STD_MIDWARE, (req, res) => {
    const procedure = 'get_posting_categories';
    db.call(procedure)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/education', STD_MIDWARE, (req, res) => {
    const procedure = 'get_education';
    const params = [req.user.email];
    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/experience', STD_MIDWARE, (req, res) => {
    const procedure = 'get_experience';
    const params = [req.user.email];
    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/resume', STD_MIDWARE, (req, res) => {
    req.headers.params = JSON.parse(req.headers.params);
    console.log("req.headers.params: ", req.headers.params);

    let email = null;

    if (req.user['custom:type'] == 'Professional') {
        email = req.user.email;
    } else if (req.user['custom:type'] == 'Facility' || req.user['custom:type'] == 'Admin') {
        email = req.headers.params.Email
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    const params = [email, 'RESUME', null]
    const procedure = 'get_document_professional'

    db.call(procedure, params, null)
        .then(result => {
            console.log('RESULT: ', result)
            const meta = result[0][0]
            s3.download(meta.S3Key)
                .then(file => {
                    res.set('FileName', meta.FileName)
                    res.set('TimeUploaded', meta.TimeCreated)
                    res.end(file.Body)
                })
                .catch(err => console.log(err))
        }).catch(err => {
            console.log("ERROR: ", err);
            res.status(err).end(JSON.stringify("Error Fetching Data from Database"))});
});

router.get('/profile_picture/:key', (req, res) => {
    const filename = req.params.key
    console.log(req.params.key)
    const readstream = s3.download_stream(filename);
    readstream.pipe(res);
})

router.get('/applicants', STD_MIDWARE, (req, res) => {
    req.headers.params = JSON.parse(req.headers.params)
    const procedure = 'get_applicants';
    const params = [req.user.email, req.headers.params.PostingTitle];
    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results[0])))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/review_prof_verification', STD_MIDWARE, async (req, res) => {
    console.log('review_prof_verification'.toUpperCase())
    if (req.user['custom:type'] == 'Admin') {
        const procedure = 'admin_verification_pending_professional';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => { console.log("results: ", results)
                res.end(JSON.stringify(results[0]))
            }).catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {
        console.log("SENT: ", res.headersSent)
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.get('/postings', STD_MIDWARE, (req, res) => {
    const procedure = 'get_fac_job_postings';
    const params = [req.user.email];
    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results[0])))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
});

router.get('/review_fac_verification', STD_MIDWARE, (req, res) => {
    if (req.user['custom:type'] == 'Admin') {
        const procedure = 'admin_verification_pending_facility';
        const params = [req.user.email];
        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results[0])))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.post('/verify_professional', STD_MIDWARE, (req, res) => {
    if (req.user['custom:type'] == 'Admin') {
        const procedure = 'admin_verify_professional'
        const params = [req.user.email, req.body.ProfEmail]

        db.call(procedure, params)
            .then(results => {res.end(JSON.stringify(results))})
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.post('/verify_facility', STD_MIDWARE, (req, res) => {
        if (req.user['custom:type'] == 'Admin') {
            const procedure = 'admin_verify_facility'
            const params = [req.user.email, req.body.FacEmail]

            console.log('PARAMS: ', params)

            db.call(procedure, params)
                .then(results => {res.end(JSON.stringify(results))})
                .catch(err => {res.status(err).end(JSON.stringify("Error Fetching Data from Database"))});
        } else {
            res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
            return;
        }
});

router.get('/bulk_professionals', STD_MIDWARE, (req, res) => {
    console.log('BULK 1')
    if (req.user['custom:type'] == 'Admin') {
        console.log('BULK PROFESSIONALS')
        const procedure = 'admin_bulk_professionals'
        const params = [req.user.email]

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results[0])))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.get('/bulk_facilities', STD_MIDWARE, (req, res) => {
    if (req.user['custom:type'] == 'Admin') {
        const procedure = 'admin_bulk_facilities'
        const params = [req.user.email]

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results[0])))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});


router.post('/opening', STD_MIDWARE, (req, res) => {
    if (req.user['custom:type'] == 'Facility') {
        const procedure = 'create_job_posting';
        const params = [req.user.email, req.body.Title, req.body.Salary, 
            req.body.Descript, req.body.Slots, req.body.Category, req.body.Shifts, req.body.Visibility];

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));

    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.post('/hire_applicant', STD_MIDWARE, (req, res) => {
    if (req.user['custom:type'] == 'Facility') {
        const procedure = 'hire_applicant'
        const params = [req.user.email, req.body.ApplicantEmail, req.body.PostingTitle]

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    } else {

    }
});


router.post('/apply_verification', STD_MIDWARE, (req, res) => {
    const params = [req.user.email];
    let procedure = '';
    if (req.user['custom:type'] == 'Professional') {
        procedure = 'professionals_apply_for_verification'
    } else if (req.user['custom:type'] == 'Facility') {
        procedure = 'facility_apply_for_verification';
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
})


router.post('/profile', STD_MIDWARE, (req, res) => {
    data = req.body;
    let params;
    let procedure;
    
    if (req.user['custom:type'] == 'Professional') {
        procedure = 'update_professional_profile';
        params = [req.user.email, data.FName, data.LName, data.Email, data.Specialization, 
            data.PhoneNumber, data.MDCN, data.Country, data.City, data.Street, data.LicenseNumber];
    } else if (req.user['custom:type'] == 'Facility') {
        procedure = 'update_facility_profile';
        params = [req.user.email, data.City, data.Country, data.Email, data.FacName, data.State, 
            data.Descript, data.Street, data.CName, data.PhoneNumber];
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
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
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }

    db.call(procedure, params)
        .then(res.end(JSON.stringify(upload.Key)))
        .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
})

router.post('/resume', [...STD_MIDWARE, upload.single('pdf')], async (req, res) => {
    const file = req.file;

    const upload = await s3.upload(file);

    let procedure;
    const params = [req.user.email, 'RESUME', upload.Key, file.originalname];

    if (req.user['custom:type'] == 'Professional') {
        procedure = 'add_document_professional';
        db.call(procedure, params)
            .then(res.end(JSON.stringify(upload.Key)))
            .catch(err => res.status(err).end(JSON.stringify("Error Fetching Data from Database")));
    }  else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
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
        .catch(err => {
            res.sendStatus(err);
            res.end(JSON.stringify("Error Posting Data into Database"));
        });

})




router.post('/education', STD_MIDWARE, async (req, res) => {
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
});

router.post('/experience', STD_MIDWARE, async (req, res) => {
    let data = util.objectArray(req.body);
    let out = []
    if(data.CompanyName != 'undefined') {
        const procedure = 'add_experience';

        data.forEach(async e => {
            const params = [req.user.email, e.Company, e.Title, e.StartDate, e.EndDate];
            const result = await db.call(procedure, params);
            out.push(result);
        });

        res.end(JSON.stringify(util.arrayObject(out)));
        }
});

router.post('/update_posting', STD_MIDWARE, async (req, res) => {
    if (req.user['custom:type'] == 'Facility') {
        const data = req.body
        console.log("Salary: ", data.Category)
        console.log("Salary: ", typeof(data.Category))
        const params = [req.user.email, data.OldTitle, data.NewTitle, data.Salary, data.Descript, data.Slots, data.Category, data.Shifts, data.Visibility];
        procedure = 'update_posting';

        db.call(procedure, params)
            .then(results => res.end(JSON.stringify(results)))
            .catch(err => res.status(err).end(JSON.stringify("Error Posting Data into Database")));
    } else {
        res.status(Code.forbidden).end(JSON.stringify("Incorrect User Type"));
        return;
    }
});

router.post('/jobs', STD_MIDWARE, (req, res) => {
    data = req.body;
    t = new Date();
    date = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate();
    time = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    datetime = date + ' ' + time;
    cover = Object.keys(data.cover).map(function (key) { return data.cover[key] }).join("");

    const params = [data.email, req.user.email, data.title, cover, datetime];
    const procedure = 'create_application';

    db.call(procedure, params)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => {
            res.sendStatus(err);
            res.end(JSON.stringify("Error Posting Data into Database"));
        });
})

module.exports = router;