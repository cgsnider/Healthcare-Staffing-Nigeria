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
    return await getData('/jobs', {Category: category});
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

export async function postExperience(data) {
    if (data.length == 0) return;
    return await postData('/experience', arrayObject(data))
}

export async function getEducation() {
    return await getData('/education');
}

export async function getExperience() {
    return await getData('/experience');
}

export async function getCategories() {
    return await getData('/categories')
}

export async function getFacilityPostings() {
    return await getData('/postings');
}

/**
 * 
 * @returns {Title: String, Category: String, FacName: String, TimeCreated: String, ProfEmail: String, FName: String, LName: String}
 */
export async function getHiredPostings() {
    return await getData('/get_hired_postings')
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
    return await postData('/opening', data);
}

/**
 * 
 * @param {{ProfEmail: String, Message: String}} data the data to be posted to the databse
 * @returns 402 if user is unauthorized, 418 if database failure, or sql results if successful
 */
export async function rejectProfessional(data) {
    return await postData('/reject_professional', data);
}

/**
 * 
 * @param {{FacEmail: String, Message: String}} data the data to be posted to the databse
 * @returns 402 if user is unauthorized, 418 if database failure, or sql results if successful
 */
 export async function rejectFacility(data) {
    return await postData('/reject_facility', data);
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
    const response = await postFile('/profile_picture', formData)
    return await response.json()
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
}


/**
 * Gets the resume data for the user
 * @param {string} email the email of the account who's resume should be downloaded. Pass in null will download current user's resume
 * @returns The resume data of the user. 
 */
export async function getResume(email) {
    return await getData('/resume', {Email: email})
}

/**
 * Downloads a professional's resume. Saves the file automatically using the name that was originally uploaded to the server.
 * @param {string} email The email of the professional whose resume will be fetched.
 */
export async function downloadResume(email) {
    const data = await getFile('/resume', {Email: email});
    const headers = [...data.headers]
    const filename = headers[3][1]
    await saveAs(await data.blob(), filename)
}

/**
 * 
 * @param {{FacEmail: String, Mesage: String}}
 * @returns 
 */
export async function postVerifyProfessional(data) {
    return await postData('/verify_professional', data);
}

/**
 * 
 * @param {{FacEmail: String, Mesage: String}}
 * @returns 
 */
export async function postVerifyFacility(data) {
    return await postData('/verify_facility', data);
}

/**
 * 
 * @param {{ProfEmail: String, Mesage: String}}
 * @returns 
 */
 export async function postUnverifyProfessional(data) {
    return await postData('/unverify_professional', data);
 }

/**
 * 
 * @param {{FacEmail: String, Mesage: String}}
 * @returns 
 */
 export async function postUnverifyFacility(data) {
    return await postData('/unverify_facility', data);
 }
 

/**
 * Updates a specific job posting for the current facility.
 * @param {{OldTitle: String, NewTitle: String, Category: String, Salary: int, Descript: String, Slots: int, Shifts: String, Visibility: int}} data 
 *  The data that the posting should be set to
 * @returns The results of the post
 */
export async function updatePosting(data) {
    return await postData('/update_posting', data)
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
 * Deltes professional data (Only works for admins)
 * @param {{Email: String}} data email of the user to be deleted
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteProfessional(data) {
    return await deleteData('/professional', data);
}

/**
 * Deltes facility data (Only works for admins)
 * @param {{Email: String}} data email of the user to be deleted
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteFacility(data) {
    return await deleteData('/facility', data);
}
/**
 * Deletes education
 * @param {{College: String, Degree: College, StartDate: String, EndDate: String}} data 
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteEducation(data) {
    return await deleteData('/education', data);
}

/**
 * Deletes education
 * @param {{College: String, Degree: College, StartDate: String, EndDate: String}} data 
 * @returns 204 if successful, otherwise corresponding error code
 */
 export async function deleteExperience(data) {
    return await deleteData('/experience', data);
}


/**
 * Deletes document data from database (Does not touch bucket).
 * @param {{Category: String (Optional), S3Key: String (Optional)}} data 
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteDocument(data) {
    return await deleteData('/document', data);
}

/**
 * Deletes Resume (only works for professionals)
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteResume() {
    return await deleteData('/resume');
}
/**
 * Deletes contact (Only works for facility)
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteContact() {
    return await deleteData('/contact');
}

/**
 * Deletes a job posting. (Only works for facilities)
 * @param {{Title: String}} data 
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deletePosting(data) {
    return await deleteData('/posting', data);
}

/**
 * Deletes an application from server
 * @param {{ProfEmail: String (Optional), FacEmail: String (Optional), Title: String}} data 
 * Data denoting the user to be deleted. (Facilities must provide ProfEmail, Professioanls must provide FacEmail)
 * @returns 204 if successful, otherwise corresponding error code
 */
export async function deleteApplication(data) {
    return await deleteData('/application', data);
}
/**
 * Deletes the admin
 * @returns the status of code from the request. (204 if successul)
 */
export async function deleteAdmin() {
    return await deleteData('/admin');
}

/**
 * Generic method for making a DELTE request. 
 * @param {string} url The url for the resources being searched for. (api is included)
 * @returns the data from the get request with JSON processing completed
 */
 async function deleteData(url='', body={}) {
    
    const data = await fetch(`api${url}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            ID: localStorage.getItem('IDToken'),
            params: JSON.stringify(body)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    })

    if (data.status == 200) {
        const items = await data.json();
        return items;
    } else return data.status;
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
            params: JSON.stringify(body)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    })
    if (data.status == 200) {
        const items = await data.json();
        return items;
    } else return data.status;
}

/**
 * Generic method for making a GET request. 
 * @param {string} url The url for the resources being searched for. (api is included)
 * @returns the data from the get request with JSON processing completed
 */
 async function getFile(url='', body={}) {
    
    const data = await fetch(`api${url}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            ID: localStorage.getItem('IDToken'),
            params: JSON.stringify(body)
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
    })

    return data;
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
        }).then(response => {resolve(response)});
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
        }).then(response => {resolve(response)});
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
        }).then(response => {resolve(response.status)});
    });
}