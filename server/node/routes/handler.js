const express = require('express');
const router = express.Router();

const cognito = require('../auth/cognito.js');

router.use(express.urlencoded({extended: false}));

router.get('/jobs', (req, res) => {
    const str = [{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    }];

    res.end(JSON.stringify(str));
})

router.post('/register', (req, res) => {
    
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    }

    if (cognito.RegisterUser(newUser)) {
        console.log('Created User')
        res.status(201).send('Created User');
    } else {
        console.log('Failed to Create user')
        res.status(200).send('Failed to Create user')
    }
})

module.exports = router;