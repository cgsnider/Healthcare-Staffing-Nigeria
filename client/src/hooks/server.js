/**
 * 
 * @param {{email, password}} newUser the new user trying to be registered
 * @returns Returns a code representing the success of the regisration: 
 *  201 - Account Registered
 *  200 - Account Failed to Register
 *  408 - Request Timed Out
 */
export async function registerUser (newUser) {
    console.log("REGISTER")
    try {
        let resp = await postData('/api/register', newUser);
        console.log("Response: ", resp.status)
        return resp.status;
    }
    catch {
        return 408;
    }

}


async function postData(url = '', data ={}) {
    return new Promise(function (resolve, reject) {
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

        const response = fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: formBody
        }).then(response => resolve(response));
    });
}