
import React from 'react'

import Prof_JobListing from '../../parts/Prof_JobListing'

import '../../styling/Prof_JobHub.css'

function Prof_JobHub (props) {


    const fetchPostings = () => {

        

    }




    return (
        <div>
            <ul className="prof_job_grid">

                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
                <li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
            </ul>
        </div>
    )

}

class JobData {

    constructor(link, image, position, location, shifts, salary) {
        this.link = link
        this.image = image;
        this.position = position;
        this.location = location;
        this.shifts = shifts;
        this.salary = salary;
    }

}

export default Prof_JobHub

/*
<li className='prof_job_node'>
                    <Prof_JobListing link="http://localhost:3000" 
                    image='resources/cmg_logo.png' 
                    position="ER Physician" 
                    location="Generic, Nigeria" 
                    shifts="12 Hour Shifts" 
                    salary="$70,000"/>
                </li>
*/