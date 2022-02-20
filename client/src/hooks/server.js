
/**
 * Gets Job Postings from server
 * @returns Data that represents a job posting
 */
export async function getJobPosts(category) {
    return await getData('/jobs');
}


export async function getProfileData() {
    return await getData('/profile');
}

export async function postProfileData(data) {
    return await postData('/profile', data)
}

export async function getCategories() {
    return await getData('/categories')
}

export async function postProfessionalProfileData(data) {
    return await postData('/user', data);
}

/**
 * Generic method for making a GET request. 
 * @param {string} url The url for the resources being searched for. (api is included)
 * @returns the data from the get request with JSON processing completed
 */
async function getData(url='', body={}) {
    const data = await fetch(`api${url}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            ID: localStorage.getItem('IDToken'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 

    })
    const items = await data.json();
    return items;
}


async function postData(url = '', data ={}) {
    return new Promise(function (resolve, reject) {
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        const response = fetch(`api${url}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'ID': localStorage.getItem('IDToken'),
                'Content-Type':'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: formBody
        }).then(response => { console.log(response); resolve(response)});
    });
}