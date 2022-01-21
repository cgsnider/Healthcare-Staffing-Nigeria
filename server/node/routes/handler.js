const { application } = require('express');
const express = require('express');
const router = express.Router();

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');


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
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.status(201).send('Created User');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = request.body.password;

    const foundUser = await findUser(username);

})

module.exports = router;