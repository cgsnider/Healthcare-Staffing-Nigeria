const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');


const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {    
    UserPoolId: "us-east-2_xydbLjNWa",
    ClientId: "2b5cuqv77lf5oqr4hn32l5cle2"
}; 

const DISABLE_AUTH = false; //Set this to true to disable authentication. DEV USE ONLY

const pool_region = 'us-east-2';

const iss = `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}`;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
var pems;

function authenticateToken(req, res, next) {

    if (DISABLE_AUTH) {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    const idHeader = req.headers['id'];

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    verifyUser(token, idHeader)
        .then(out => {

            req.user = out['idRes'];
            req.auth = out['asRes']
            next()})
        .catch(fail => {
            req.user = 401

        });
    return;
}

async function verifyUser(accessToken, idToken) {
    return new Promise((resolve, reject) => {
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
                    ValidateAccessToken(pems, accessToken)
                        .then(asRes => 
                            ValidateIDToken(pems, idToken)
                                .then(idRes => resolve({idRes, asRes}))
                                .catch(rej => reject(rej)))
                        .catch(rej => reject(rej));
                } else {
                    reject();
                }
            });
        } else {
            ValidateAccessToken(pems, accessToken)
            .then(asRes => 
                ValidateIDToken(pems, idToken)
                    .then(idRes => resolve({idRes, asRes}))
                    .catch(rej => reject(rej)))
            .catch(rej => reject(rej));
        }
    });
}

    async function ValidateIDToken(pems, token) {
        return ValidateToken(pems, token, 'id');
    }

    async function ValidateAccessToken(pems, token) {
        return ValidateToken(pems, token, 'access');
    }

    async function ValidateToken(pems, token, type) {
        return new Promise(function(resolve, reject) {

            let decodedJWT = jwt.decode(token, {complete: true});
            
            if (!decodedJWT) {
                reject("Not a valid JWT token");
                return;
            }
            //Fail if token is not from your User Pool
            if (decodedJWT.payload.iss != iss) {
                reject("invalid issuer");
                return;
            }
            //Reject the jwt if it's not an 'Access Token'
            if (decodedJWT.payload.token_use != type) {
                reject(`Not an ${type} token`);
                return;
            }

            var kid = decodedJWT.header.kid;
            var pem = pems[kid];
            if (!pem) {
                reject('Invalid access token');
                return;
            }

            //Verify the signature of the JWT token to ensure it's really coming from your User Pool
            jwt.verify(token, pem, {issuer: iss}, function(err, user) {
                if(err) {
                    reject("Unauthorized");
                } else {
                    resolve(user)
                }
            })
        });
    }




// /**
//  * @deprecated For registering user through postman for testing
//  * @param {{email, password, fname, lname}} newUser 
//  */
//  function RegisterUser(newUser){
//     var attributeList = [];

//     userPool.signUp(newUser.email, newUser.password, attributeList, null, function(err, result){
//         if (err) {
//             return false;
//         }
//         cognitoUser = result.user;
//         return true;
//     });
// }
// /**
//  * @deprecated For Signing in to user through postman for testing
//  * @param {*} user 
//  */
// function signIn(user) {

//     let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
//         Username: user.email,
//         Password: user.password
//     });

//     let userData = {
//         Username: user.email,
//         Pool: userPool
//     }

//     let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     cognitoUser.authenticateUser(authenticationDetails, {
//         onSuccess: function (result) {
//             verifyUser(result.getAccessToken().getJwtToken())
//                 .then(res => console.log(res))
//                 .catch(rej => console.log(rej));
            
//         }, 
//         onFailure: function(err) {
//             console.log(err);
//         },
        
//     });

// }

// exports.RegisterUser = RegisterUser;
// exports.SignIn = signIn;
exports.authenticateToken = authenticateToken;
