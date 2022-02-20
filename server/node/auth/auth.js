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




/**
 * @deprecated For registering user through postman for testing
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
/**
 * @deprecated For Signing in to user through postman for testing
 * @param {*} user 
 */
function signIn(user) {

    // verifyUser('eyJraWQiOiI0SkJBdjZ6ZlJLSloyZktsa0FiaEc2VGdWZjMwVWh5UGZkZmRUZ3NcL0NJTT0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiOGUwYjAzN2EtZDkwYi00ZjUwLWE2Y2YtYjA3MGJhMzgzYTlmIiwic3ViIjoiODljZjNhYTYtNDUzYS00YjAyLTgyMDMtZmY1NjVlNTdhMGE1IiwiZXZlbnRfaWQiOiIwY2ZiYjg2Ny0xNzMyLTQ5MjQtYjU0MS1lNmJmNDhjYzU1ZDUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjQyOTkxODM1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9RZlJWMWpoM0UiLCJleHAiOjE…ZjY4ZDEtNmI5MS00NGM5LWI1YjQtMGM3ZDNlYmRkYTQwIiwiY2xpZW50X2lkIjoiMjdqZnFyNXA5OTl0Zjl0cDluN3R1OGYyanUiLCJ1c2VybmFtZSI6Ijg5Y2YzYWE2LTQ1M2EtNGIwMi04MjAzLWZmNTY1ZTU3YTBhNSJ9.ez-U91YgvcVQXTNFCi-73aVhcV-MH-8bhbdYc9oYziV-zWpKRfyTMWlfIQ1YwdWWaJOQhJba_4ovlT5VD92Ia-3qaAmH7vTPxmpNVMSyKdJH2qVYWvdkL3hMZsxtqBQmuuHqr-LS4NuB8sP4PhnO1hofdIsSKf5z92oaHsCjBysaKT1GyABZWzlOKf_A3h73CwkeZWEuwPL1qwV9hXtX8Dlt7hAuOguZiXIFbyzWb9LBv0HjX2VSbtNeiMEk7H9UtzkbwNwm-nPEbEELxOxfTg4T69oTOUgVDBo6yoaEvEnM5GDsbbUvdKAqTWGJGXW4U0IlOrTOD-ZjpKCApxqukg')
    //             .then(res => console.log(res))
    //             .catch(rej => console.log(rej));

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
            // console.log('access token + ' + result.getAccessToken().getJwtToken());
            // console.log('id token + ' + result.getIdToken().getJwtToken());
            // console.log('refresh token + ' + result.getRefreshToken().getToken());
            verifyUser(result.getAccessToken().getJwtToken())
                .then(res => console.log(res))
                .catch(rej => console.log(rej));
            
        }, 
        onFailure: function(err) {
            console.log(err);
        },
        
    });

}

exports.RegisterUser = RegisterUser;
exports.SignIn = signIn;
exports.authenticateToken = authenticateToken;
