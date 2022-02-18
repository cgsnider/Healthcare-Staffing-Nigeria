import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import JobListing from '../parts/JobListings'
import TopBar from '../parts/TopBar';

import '../styling/Jobs.css'
import '../../App.css'

import { getJobPosts, submitApplication } from '../../hooks/server';


function Apply (props) {

    const data = {};
    const submit = () => {submitApplication(data)};

    return (
        <div>
            <div>
                <text> Application Page for Cardiologist</text>

                <JobListing position="Cardiologist"
                            location="Lagos, Nigeria"
                            shifts="12 Hour Shifts"
                            salary="$90,000"/>
            </div>
            {/* Temporarily both two buttons below are forced to link back to job posting page */}
            <div>
                <Link to="/jobs" >
                    <button> Return </button>
                </Link>
            </div>
            <div>
                <Link to="/jobs" >
                    <button> Apply </button>
                </Link> 
            </div>
        </div>
    );
}

export default Apply;