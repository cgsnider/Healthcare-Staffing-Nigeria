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
    
    //handles sorting postings based on prop e
    //passed to options for use
    const handleClick = (e) =>{
        const copy = [...postings]
        //console.log(postings[0][e])
        if (e === 'salary') {
            copy.sort((a, b)=> a[e] < b[e]? 1:-1)
        } else {
            copy.sort((a, b)=> a[e] > b[e]? 1:-1)
        }
        
        setPostings(copy)
        //console.log("sorted on " + e)
    }
    


    return (
        <div>
            <TopBar />
            <OptionsBar click={handleClick} />
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
        <div id="opt_bar" className='flex justify-between options_bar bg-gray-100'>
            <div className='flex w-full items-center'>
                <button value='Location A-Z' className='button_primary outline outline-1 hover:bg-gray-300' onClick={() => props.click('location')}>Location A-Z</button>
                <button type='button' value='Postion A-Z' className='button_primary outline outline-1 hover:bg-gray-300' onClick={() => props.click('position')}>Position A-Z</button>
                <button type='button' value='Hours' className='button_primary outline outline-1 hover:bg-gray-300' onClick={() => props.click('shifts')}>Hours</button>
                <button type='button' value='Pay' className='button_primary outline outline-1 hover:bg-gray-300' onClick={() => props.click('salary')}>Pay</button>
            </div>
            <div className='flex items-center space-x-1 pr-1'>
                <label>{" Search: "}</label>
                <input type='text' className="rounded h-7"/>
            </div>
        </div>
        
    )
}

export default Jobs
