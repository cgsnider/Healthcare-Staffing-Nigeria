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

const iss = `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}`;

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
            
            verifyUser(result.getAccessToken().getJwtToken());
            
        }, 
        onFailure: function(err) {
            console.log(err);
        },
        
    });

}

var pems;

function verifyUser(token) {

    

    if (!pems) {

        request({
            url: `${iss}/.well-known/jwks.json`,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                pems = {};
                var keys = body['keys'];
                for (var i = 0; i < keys.length; i++) {
                    var key_id = keys[i].kid;
                    var modulus = keys[i].n;
                    var exponent = keys[i].e;
                    var key_type = keys[i].kty;
                    var jwk = {kty : key_type, n: modulus, e: exponent};
                    var pem = jwkToPem(jwk);
                    pems[key_id] = pem;
                }
                ValidateToken(pems, token);
            } else {
                console.log("FAILED -  ERROR")
                console.log(`${iss}/.well-known/jwks.json`)
            }
        });
    } else {
        ValidateToken(pems, token);
    }

    function ValidateToken(pems, token) {

        let decodedJWT = jwt.decode(token, {complete: true});

        let result = {
            success: false,
            message: ""
        }
        
        if (!decodedJWT) {
            result.message = "Not a valid JWT token";
            return result;
        }

        //Fail if token is not from your User Pool
        if (decodedJWT.payload.iss != iss) {
            result.message = "invalid issuer";
            return {failed};
        }

         //Reject the jwt if it's not an 'Access Token'
        if (decodedJWT.payload.token_use != 'access') {
            result.message = "Not an access token";
            return;
        }

        //Get the kid from the token and retrieve corresponding PEM
        var kid = decodedJWT.header.kid;
        var pem = pems[kid];
        if (!pem) {
            result.message = 'Invalid access token';
            return;
        }

        //Verify the signature of the JWT token to ensure it's really coming from your User Pool
        jwt.verify(token, pem, {issuer: iss}, function(err, payload) {
            if(err) {
                console.log("FAILED")
            } else {
                console.log("SUCCESS")
            }
        })
       
    }

}

exports.RegisterUser = RegisterUser;
exports.SignIn = signIn;
