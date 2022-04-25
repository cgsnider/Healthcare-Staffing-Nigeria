# Healthcare Staffing and Human Resources Management Nigeria
A website where healthcare workers can apply for job postings in Nigeria, and it is managed by Covenant Medical Group. 

Healthcare facilities can make job postings for open positions and healthcare workers can apply for the jobs.

A back end and a front end website to connect healthcare workers with job opportunities in Nigeria.

### Install Guide

How to install this Health Care Staffing Platform to be run locally.

##### Dependencies

This platform depends on MySQL and Node JS to function. 
If both are already installed you can skip the dependency instructions.

###### MySQL
MySQL can be installed here 

https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing

The link above includes a detailed install guide for MySQL. For installing on windows refer to the guide.

If you have access to homebrew on macOS or Linux MySQL can be installed in 2 steps using homebrew.

On the terminal run the following

$ brew install mysql

$ brew services start mysql

Brew can be installed in macOS or Linux by running the following command

$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

###### Node JS
Node JS can be downloaded here

https://nodejs.org/en/download/

Be sure to download the LTS version and the one for your operating system. The downloads should be clearly labeled.

Follow the install wizard through the process. Node JS should install like any other program for your OS.


Alternatively, if you have access to homebrew, in the terminal run

$ brew install node


##### AWS Services

For all features of the platform to run, it needs to be connected to AWS features. 

For handling login this platform uses AWS Cognito while for Mass media storage this system uses S3

###### AWS Cognito

1. Create a new user pool
2. Give the user pool a name, it can be arbitary
3. Step through the settings, all can be left default unless otherwise stated
4. Select that the user can sign in with email only and the case insensitivity
5. Require the email attribute
6. In the custom attributes create a new mutable string attribute called "type"
7. Allow users to sign themselves up
8. Allow users to recover account only via email
9. Verify email only
10. In email settings, choose to have verification done by a link. The email message can say what ever the developer desires.
11. Create an app client, call it React Client
13. Create an app client, call it Node JS Client
14. Record the corresponding client secrets.
15. Go to domain name
  If deploying with a domain name, select "use your domain"
  If deploying without a domain name, enter a domain name prefix in Amazon Cognito domain section.
16. In review page, check if settings are correct
  Pay special attention that the attribute "custom:type" exists
17. Click Create Pool
18. Record the Pool ID that will appear at the top of this page

After all the steps you should have the following:

- Client ID for React App (Step 11)
- Client ID for Node JS Server (Step 13)
- Pool ID (Step 18)

If you are missing any of these, they can still be found in their appropriate locations

###### AWS S3

1. Create a new bucket
2. Give the bucket a name, it can be arbitary. Record the name
3. Select the region for the bucket, record the region selected
4. Click Create Bucket
5. Navigate to the AWS service IAM
6. Go to Policy Page
7. Create new policy
8. In service section type or select S3
9. In the Write section select:
   1. DeleteObject
   2. PutObject
10. In the Read section select:
   1. GetObject
11. In the Resources Section select Add ARN
12. In the pop up enter the bucket name from step 2
13. Continue to next page
14. On the add tags page, simply continue to the next page
15. In the review page, give your policy a name and create the policy
16. Go to the User page
17. Add a new user, we called it cmgHiringNode
18. Select Access key option and for programatic access and continue
19. Select attatch existing policy
20. Filter for the name of the policy you created in step 7
21. Continue to the next page, continue through the tags page
22. Create the user
23. After creating the user a "Access key ID" and a "Secret access key" will be created
   1.  Record both keys, thes keys are sensitive
   2.  After leaving this page the "Secret access key" will no longer be visible


After all the steps you should have the following:

- Bucket Name (Step 2)
- Bucket Region (Step 3)
- Access Key (Step 23)
- Secret Access Key (Step 23)

###### Local SetSet Up

Navigate to the main directory for this project.

Run the following commands in the terminal

$ chmod +x enviro.sh

$ ./enviro.sh

Running enviro.sh will cause a serios of prompts to appear on the command line.

When it asks for the port number, enter 4000, entering a different port will require edition setupProxy.js (line 8)

Then it will prompt for database details, Enter the requested credientials for accessing the database

  If new to MySQL the following inputs should work: 
  
     Host: 'localhost'
     
     User: 'root'
     
     Password: ''
     
     Database: 'cmg_staffing_nigeria' <- note unless you edit sql scripts use this database
     
Then it will ask you for the information you gathered from the AWS services set up to connect the application to AWS services.

Now run the following commands in the terminal

$ chmod +x run.sh

$ ./run.sh -id 

OR 

$ ./run.sh -ic 

-id inputs sample data to the database, -ic creates a clean (empty) database

##### Production Set Up

Please refer to "Start Up Guide" for details.

## Release Notes

### Version 1.0.0

#### New Features:

* Admin accounts can now be created on register_admin page
* Admin Accounts can now remove medical professionals and medical facilities

#### Bug Fixes:
* Job listings html parse bug fixed
* Images on Jobs page not appearing fixed
* Admin needing to refresh the page to see changes fixed
* Unverfied professionals seeing blank jobs page fixed
* Unverified facilities able to post jobs fixed

#### Known Issues:
* Occasionally when user first reaches site, platform mistakes users as logged in as professional. (Cannot retrieve data from server like a professional)
* On the applicant page for professionals, the placeholder image is used even if the posting facility has an image
* If a user navigates to a page they are not suppose to reach, see gui of page but with no content.
* Administrators can be created without verification
* Access tokens expire without notifying the user
* Professional unable to delete application

---

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
