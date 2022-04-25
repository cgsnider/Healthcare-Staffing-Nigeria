# Healthcare Staffing and Human Resources Management Nigeria

Creating a database and a front end website to connect healthcare workers with job opportunities in Nigeria.

#### To Run

1. Go to Main directory, run "./run.sh -ide" for first time set up and fill in the prompts.
  Failure to fill in all the prompts may cause the platform to have limited functionality. 
2. For subsequent runs execute "./run.sh -id" 

#### Developers:
- Khalaya Dean
- Charles Snider
- Haoran Zhang
- Nicholas Scholz
- Senai Saunders
- William Leonard

### Required Dependencies

Node JS
MySQL

# Healthcare Staffing Nigeria
A website where healthcare workers can apply for job postings in Nigeria, and it is managed by Covenant Medical Group. Healthcare facilities can make job postings for open positions and healthcare workers can apply for the jobs.

## Release Notes

### Version 1.0.0

#### New Features:

* Admin accounts can now be created on register_admin page
* Admin Accounts can now remove medical professionals and medical facilities

#### Bug Fixes:
* Job listings html parse bug fixed
* Images on Jobs page not appearing fixed
* Admin needing to refresh the page to see changes fixed

#### Known Issues:
* Occasionally when user reaches sight, platform mistakes users as logged in as professional. (Cannot retrieve data from server like a professional)
* On the applicant page for professionals, the placeholder image is used even if the posting facility has an image
* If a user navigates to a page they are not suppose to reach, see gui of page but with no content.

---

## Release Notes

### Version 0.4.0

#### New Features:

* Began framework for facility job listing page. 
* Medical facilities can create postings
* Medical facilities can view applicants for a job posting

#### Bug Fixes:
* System failed to log data for new users correctly causing website to fail
* Facility profile checks for null values now
* Postings that Practitioners have already applied to don’t show up in job postings page

#### Known Issues:
* Job listing needs to use html parser

---

### Version 0.3.0

#### New Features:
* Medical facilities can register for an account
* Medical facilities can login
* Admins can review and verify applications for verification
* Medical professionals can apply for jobs
* Images are now uploaded by professionals and stored on the database

#### Bug Fixes:
* Database connects correctly
* College dropdown has been corrected
* Jobs Page now just won’t show data without login but is loaded
---

### Version 0.2.0

#### New Features:
* Backend now pulls from a database
* Profile page now contains profile data and enables update
* Users can reset their passwords
* Search Bar allows for looking for specific postings
* Rework of job postings layout design
* Drop down to filter for specific positions
* Filter buttons highlight when clicked
* Users can click on specific job postings and apply

#### Bug Fixes:
* Synchronize database username and password across different ends

#### Known Issues:
* Database occasionally fails to connect
* College dropdown says ‘no results’ when input is blank and is focused
* Jobs page says that you need to sign in before updating the page with data.
* Clicking on job posting doesn’t work. Results in blank screen
---

### Version 0.1.0:
#### New Features
* Login, Registration, and Job Posting Page UIs created
* Connect website with Amazon AWS cognito server for login
* Implemented JWT tokens for security and authentication on the server
* Created Node.js server
* Website can now fetch job posting data from the Node.js
---
