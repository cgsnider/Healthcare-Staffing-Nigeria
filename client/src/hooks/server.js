
/**
 * Gets Job Postings from server
 * @returns Data that represents a job posting
 */
export async function getJobPosts() {
    return await getData('/jobs');
}

/**
 * Generic method for making a GET request. 
 * @param {string} url The url for the resources being searched for. (api is included)
 * @returns the data from the get request with JSON processing completed
 */
async function getData(url='') {
    const data = await fetch(`api${url}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

        const response = fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type':'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: formBody
        }).then(response => resolve(response));
    });
}