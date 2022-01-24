import React, {useEffect, useState} from 'react'

import JobListing from '../../parts/JobListings'
import TopBar from '../../parts/TopBar';

import '../../styling/Jobs.css'
import '../../../App.css'

import { getJobPosts } from '../../../hooks/server';

function Jobs (props) {

    let key = 0;

    useEffect( ()=> {
        fetchPostings();
    }, [])

    const [postings, setPostings] = useState([]);

    const fetchPostings = async() => {
        let items = await getJobPosts();
        setPostings(items);
    }

    


    return (
        <div>
            <TopBar />
            <OptionsBar />
            <ul className="prof_job_grid">

                {postings.map(e => (
                    <li className='prof_job_node' key={key++}>
                        <JobListing link="http://localhost:3000" 
                        image={e.image}
                        position={e.position}
                        location={e.location}
                        shifts={e.shifts}
                        salary={e.salary}/>
                    </li>
                ))}

        
            </ul>
        </div>
    )

}


function OptionsBar (props) {

    return (
        <div id="opt_bar" className='options_bar'>
            <button value='Location A-Z' className='button_primary outline outline-1'>Location A-Z</button>
            <button type='button' value='Postion A-Z' className='button_primary outline outline-1'>Position A-Z</button>
            <button type='button' value='Hours' className='button_primary outline outline-1'>Hours</button>
            <button type='button' value='Pay' className='button_primary outline outline-1'>Pay</button>
            <label>{" Search: "}</label>
            <input type='text' className="rounded h-7"/>
        </div>
        
    )
}

export default Jobs
