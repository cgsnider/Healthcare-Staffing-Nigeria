const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {    
    UserPoolId: "us-east-2_QfRV1jh3E",
    ClientId: "27jfqr5p999tf9tp9n7tu8f2ju"
}; 

const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
/**
 * 
 * @param {{email, password, fname, lname}} newUser 
 */
function RegisterUser(newUser){
    var attributeList = [];

    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"fname",Value: newUser.fname}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"lname",Value: newUser.lname}));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"verified",Value: false}));

    userPool.signUp(newUser.email, newUser.password, attributeList, null, function(err, result){
        if (err) {
            return false;
        }
        cognitoUser = result.user;
        return true;
    });
}

function signIn(user) {
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: user.email,
        Password: user.password
    });

    let userData = {
        Username: user.email,
        Pool: userPool
    }

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log(err);
        },

    });

}

exports.RegisterUser = RegisterUser;
