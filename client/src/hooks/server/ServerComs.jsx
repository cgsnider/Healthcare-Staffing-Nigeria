

async function login (username, password){

    postData('/api/login', {'username' : username, 'password' : password})
        .then(response => {
            const accessToken = response.data.accessToken
            localStorage.setItem('jwt', accessToken) //update this to use httponly cookies
        })
        .catch(error => {
            console.log('login failed')
        });
    
}

async function postData(url = '', data ={}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
    });

    return response.json();

}

