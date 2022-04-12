const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const Code = require('../code.js');


const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

const poolData = {    
    UserPoolId: "us-east-2_q85GCcTxM",
    ClientId: "50sar6ii4ksu1kshi2tf8o0ntb"
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
        res.sendStatus(Code.unauthenticated);
        res.end();
        return;
    }
    verifyUser(token, idHeader)
        .then(out => {
            console.log('NEXT Auth')
            req.user = out['idRes'];
            req.auth = out['asRes'];
            next();
        }).catch(fail => {
            console.log('ERROR 3')
            res.sendStatus(Code.unauthenticated);
            res.end();
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

exports.authenticateToken = authenticateToken;
