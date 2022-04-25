import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { poolData } from "./cognito_pool";
import { parseJwt } from "./util";

// const poolData = {
//     UserPoolId: "us-east-2_q85GCcTxM", //Enter User Pool ID here
//     ClientId: "2t9l195uocaslipd2ejbslcd7a" // Enter Client ID Here
// }

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
        console.log(user)
        const name = {
            Name: 'name',
            Value: user.name
        }

        const type = {
            Name: "custom:type",
            Value: user.type
        }

        userPool.signUp(user.email, user.password, [name, type], null, (err, data) => {
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
        console.log("LoginUser", user.password)
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
                const idToken = result.getIdToken().getJwtToken();
                localStorage.setItem("accessToken", result.getAccessToken().getJwtToken());
                localStorage.setItem("refreshToken", result.getRefreshToken().getToken());
                localStorage.setItem("IDToken", result.getIdToken().getJwtToken());
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("type", parseJwt(idToken)['custom:type'])
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
  export async function ResetPassword (user, failure, success) {
    return new Promise(function (resolve, reject) {
        const cognito_user = new CognitoUser({
            Username: user.email,
            Pool: userPool,
        });

        //https://stackoverflow.com/questions/38110615/how-to-allow-my-user-to-reset-their-password-on-cognito-user-pools
        cognito_user.forgotPassword({
            onSuccess: (result) => console.log("Reset PW Sucess"),
            //https://github.com/amazon-archives/amazon-cognito-identity-js/blob/master/src/CognitoUser.js#L1227
            onFailure: (result) => console.log("Reset PW Failure"),
            inputVerificationCode() { 
            var verificationCode = prompt('Please input verification code ', '');
            var newPassword = prompt('Enter new password ', '');
             cognito_user.confirmPassword(verificationCode, newPassword, this);
            }
        });
    });
  }

