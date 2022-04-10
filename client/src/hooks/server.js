import {arrayObject} from './util.js';
import { saveAs } from "file-saver";

// functions for testing delay 
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//call sleep with function to delay and args for func.
async function sleep(fn, ...args) {
    await timeout(3000);
    return await fn(...args);
}


/**
 * Gets Job Postings from server
 * @returns Data that represents a job posting
 */
export async function getJobPosts(category) {
    return await getData('/jobs');
}

export async function getApplications(category) {
    return await getData('/applications');
}

export async function getProfileData() {
    return await getData('/profile');
}

export async function postApplications(data) {
    return await postData('/jobs', data);
}

export async function postProfileData(data) {
    return await postData('/profile', data)
}

export async function postEducation(data) {
    if (data.length == 0) return;
    return await postData('/education', arrayObject(data))
}

export async function getEducation() {
    return await getData('/education');
}

export async function getCategories() {
    return await getData('/categories')
}

export async function getFacilityPostings() {
    return await getData('/postings')
}

export async function applyForVerification() {
    return await postData('/apply_verification')
}

/**
 * Sends job posting data to node server.
 * @param {{Title: string not null, Salary: int , Descript: string, Slots: int not null, Category: string not null, Shifts: string}} data 
 *  information for job posting
 * @returns 402 if user is unauthorized, 418 if database failure, or sql results if successful
 */
export async function postJobPosting(data) {
    console.log('posting');
    return await postData('/opening', data);
}

/**
 * Sends request to hire applicant to node server.
 * @param {{ApplicantEmail, PostingTitle}} data 
 *  information to identify which of the user's applicants to be hired
 * @returns 402 if user is unauthorized, 418 if database failure, or sql results if successful
 */
export async function postHireApplicant(data) {
    return await postData('/hire_applicant', data);
}

export async function postProfilePicture(img) {
    let formData = new FormData();
    formData.append("image", img);
    return await postFile('/profile_picture', formData)
}

/**
 * Uploads a file for the resume to the S3 Bucket
 * @param {file} file the file for upload 
 * @returns 402 if user is unauthorized, 418 if database failure, or sql results if successful
 */
export async function postResume(file) {
    let formData = new FormData();
    formData.append("pdf", file);
    return await postFile('/resume', formData)
}

export async function getProfileImage() {
    const img = await getImage('/profile_picture');
    console.log(img)
}


/**
 * Gets the resume data for the user
 * @param {string} email the email of the account who's resume should be downloaded. Pass in null will download current user's resume
 * @returns The resume data of the user. 
 */
export async function getResume(email) {
    return await getData('/resume', {Email: email})
}

export async function downloadResume(email) {
    const data = await getData('/resume', {Email: email});
}

/**
 * 
 * @param {*} profEmail the email of the professional the admin wishes to verify
 * @returns 
 */
export async function postVerifyProfessional(profEmail) {
    return await postData('/verify_professional', {ProfEmail: profEmail});
}

/**
 * 
 * @param {*} facEmail the email of the facility the admin wishes to verify
 * @returns 
 */
export async function postVerifyFacility(facEmail) {
    return await postData('/verify_facility', {FacEmail: facEmail});
}

/**
 * 
 * @returns The professionals pending verification
 */
export async function getVerifiedPendingProf() {
    return await getData('/review_prof_verification');
}

/**
 * 
 * @returns The facilities pending verification
 */
export async function getVerifiedPendingFac() {
    return await getData('/review_fac_verification');
}

/**
 * Fetches all the applicants for a given job posting.
 * @param {string} postingTitle the title of the job posting for the user to get all the applicants from.
 * @returns The data for the applicants for a given job posting
 */
export async function getApplicants(postingTitle) {
    return await getData('/applicants', {PostingTitle: postingTitle});
}

/**
 * 
 * @returns All nonsesnsitive text data for all professionals. Requries Admin access
 */
export async function getBulkProfessional() {
    return await getData('/bulk_professionals');
}

/**
 * 
 * @returns All nonsensitive text data for all facilities. Requires Admin access
 */
export async function getBulkFacilities() {
    return await getData('/bulk_facilities');
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
            params: body
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    })
    const items = await data.json();
    return items;
}


async function postFile(url='', data={}) {
    return new Promise(function (resolve, reject) {
        const response = fetch(`api${url}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ID': localStorage.getItem('IDToken'),
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: data
        }).then(response => { console.log(response); resolve(response)});
    });
}

async function getImage(url='', data={}) {
    return new Promise(function (resolve, reject) {
        const response = fetch(`api${url}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ID': localStorage.getItem('IDToken'),
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
        }).then(response => { console.log(response); resolve(response)});
    });
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
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'ID': localStorage.getItem('IDToken'),
                'Content-Type':'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: formBody
        }).then(response => { console.log(response); resolve(response)});
    });
}