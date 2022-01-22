const { application } = require('express');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: false}));

const cognito = require('../Cognito');

router.get('/jobs', (req, res) => {
    const str = [{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    }];
    res.end(JSON.stringify(str));
});

router.post('/register', (req, res) => {
    console.log(req.body);
    
    res.status(201).send('Created User');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = request.body.password;

    if (cognito.login(username, password)) {
        const accessToken = genAccessToken()

    } else {
        res.status(400).send('incorrect username or password');
    }

})

module.exports = router;