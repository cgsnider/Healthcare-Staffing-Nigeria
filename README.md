# Healthcare Staffing and Human Resources Management Nigeria

Creating a database and a front end website to connect healthcare workers with job opportunities in Nigeria.

#### To Run

1. Go into the 'client' directory and run 'npm install'
2. Go into the 'server/node' directory and run 'npm install'
3. While in 'server/node' run 'npm run dev'

#### Developers:
- Khalaya Dean
- Charles Snider
- Haoran Zhang
- Nicholas Scholz
- Senai Saunders
- William Leonard

### Required Dependencies

amazon-cognito-identity-js

# Healthcare Staffing Nigeria
A website where healthcare workers can apply for job postings in Nigeria, and it is managed by Covenant Medical Group. Healthcare facilities can make job postings for open positions and healthcare workers can apply for the jobs.

## Release Notes

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
