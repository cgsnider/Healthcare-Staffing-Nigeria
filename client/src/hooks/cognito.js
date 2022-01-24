import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-2_QfRV1jh3E",
    ClientId: "27jfqr5p999tf9tp9n7tu8f2ju"
}

let userPool = new CognitoUserPool(poolData);

/**
 * 
 * @param {string: email, string: password} user an object representing the user data for regisration
 * @param {function} failure a function to be run if regisration fails
 * @param {function} success a function to be run if regisration succeeds
 * @returns a promise that the user will be registered
 *  Outputs 200 if promise is resolved
 *  Outputs the err if promise is rejected (details the reason for the rejection, see aws docs for more details.)
 * This method is a wrapper for the signUp method, look at the AWS api for further details. The exact reasons that a regisration failed
 * such as a the username was already taken can be found in the AWS api for the signup method.
 */
export async function RegisterUser (user, failure, success) {
    return new Promise(function (resolve, reject) {
        userPool.signUp(user.email, user.password, [], null, (err, data) => {
            if (err) {
                if (failure) {
                    failure();
                }
                reject(err);
            } else {
                if (success) {
                    success();
                }
                resolve(200);
            }
        });
    });
}

/**
 * Signs in a user
 * @param {string: email, string: password} user the user's login data
 * @param {function} failure a method to be executed if sign in fails
 * @param {function} success a method to be executed if sign in succeeds
 * @returns a promise that the user will be signed in. 
 *  Outputs 200 if promise is resolved
 *  Outputs 401 if promise is rejected
 */
export async function LoginUser (user, failure, success) {
    return new Promise(function (resolve, reject) {
        const cognito_user = new CognitoUser({
            Username: user.email,
            Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: user.email,
            Password: user.password
        })
        cognito_user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                localStorage.setItem("accessToken", result.getAccessToken().getJwtToken());
                localStorage.setItem("refreshToken", result.getRefreshToken().getToken());
                
                if(success) {
                    success();
                }
                resolve(200);
            },
            onFailure: (result) => {
                if(failure) {
                    failure();
                }
                reject(401);
            }
        });
    });
  }
