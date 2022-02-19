const express = require('express');

const auth = require('../auth/auth.js');
const db = require('../database/database.js')

const authenticate = auth.authenticateToken;

const router = express.Router();
router.use(express.urlencoded({extended: false}));





router.get('/jobs', authenticate, (req, res) => {
    if (req.user != 402) {
        let sql = `CALL get_postings('${req.user.email}', ${(req.body.category != undefined) ? "'req.body.category'" : 'null'})`
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.end(JSON.stringify(results))
        })

        // res.end(JSON.stringify(str))
    } else {
        res.end(JSON.stringify('402'));
    }
})

router.post('/register', (req, res) => {
    
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    }

    if (auth.RegisterUser(newUser)) {
        console.log('Created User')
        res.status(201).send('Created User');
    } else {
        console.log('Failed to Create user')
        res.status(200).send('Failed to Create user')
    }
})

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    console.log(`email: ${email}, password:${password}`);
    auth.SignIn({email, password});
    res.status(200).send("recieved");

})

module.exports = router;