const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "us-east-2_QfRV1jh3E",
    ClientId: "27jfqr5p999tf9tp9n7tu8f2ju"
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/** 
 * Registers a user in the Amazon AWS cognito server
 * @param newUser an object representing a new user that has fname, lname, email, password attributes
 */
function registerUser(newUser){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"fname",Value: newUser.fname}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"lname",Value: newUser.lname}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"verfied",Value: false}))

    userPool.signUp(newUser.email, newUser.password, attributeList, null, function(err, res){
        if (err) {
            console.log(err);
        } else {
            cognitoUser = result.user;
            console.log('new user is' + cognitoUser.getUsername());
        }
    });
}

/**
 * 
 * @param {email, password} user an object containing user data, specifically an email and password field
 */
// function login(user) {

//     var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username : user.email,
//         Password : user.password,
//     });

//     var userData = {
//         Username : user.email,
//         Pool : userPool
//     };

//     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             console.log('access token + ' + result.getAccessToken().getJwtToken());
//             console.log('id token + ' + result.getIdToken().getJwtToken());
//             console.log('refresh token + ' + result.getRefreshToken().getToken());
//         },
//         onFailure: function(err) {
//             console.log(err);
//         },

//     });
// }

exports.registerUser = registerUser;
exports.login = login;