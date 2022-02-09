import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import JobListing from '../../parts/JobListings'
import TopBar from '../../parts/TopBar';
import Drop from '../../parts/Drop';

import '../../styling/Jobs.css'
import '../../../App.css'

import { getJobPosts } from '../../../hooks/server';

function Jobs (props) {

    let key = 0;

    useEffect( ()=> {
        let isMounted = true;
        fetchPostings(isMounted);
        return () => {
            isMounted = false;
        };
    }, [])

    const [postings, setPostings] = useState(null);
    const [position, setPosition] = useState(null);

    const fetchPostings = async(isMounted) => {
        let items = await getJobPosts();
        if (isMounted) setPostings(items)
        else console.log('aborted setPostings on unmounted component')
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
    const filterPosition = (pos) => {
        //console.log(pos, pos.position==position.label);
        if (position.label === "All") {
            return true;
        }
        else {
            return pos.position === position.label;
        }
    }
    

    if(postings !== null) {

        return (
            <div>
                <OptionsBar click={handleClick} />
                <div className="justify-center content-center flex">
                    <Drop position={position} setPosition={setPosition} label='Select a Position'/>
                </div>
                {(position !== null) ?

                    <ul className="prof_job_grid content-center flex flex-wrap mx-32">
                    {[...postings].filter(filterPosition)
                      .map(e => {
                       return ( <li className='prof_job_node mx-16 mb-8' key={key++}>
                            <JobListing link="http://localhost:3000" 
                            image={e.image}
                            position={e.position}
                            location={e.location}
                            shifts={e.shifts}
                            salary={e.salary}/>
                        </li> )
                    })}

            
                    </ul>
                    :
                    <div className="flex content-center justify-center">Choose a Position to See Job Listings</div>
                }
                
            </div>
        );
    } else {
        return(
            <div>Must be Logged in to See Postings
                <Link to="/" >
                <h1>Return</h1>
                </Link>
            </div>
        );
    }

}


function OptionsBar (props) {

    return (
        <div id="opt_bar" className='flex justify-between options_bar bg-gray-100'>
            <div className='flex w-full items-center'>
                <button value='Location A-Z' className='button_primary outline outline-1 hover:bg-gray-300 min-w-fit px-1 py-0' onClick={() => props.click('location')}>Location A-Z</button>
                <button type='button' value='Postion A-Z' className='button_primary outline outline-1 hover:bg-gray-300 min-w-fit px-1 py-0' onClick={() => props.click('position')}>Position A-Z</button>
                <button type='button' value='Hours' className='button_primary outline outline-1 hover:bg-gray-300 min-w-fit px-1 py-0' onClick={() => props.click('shifts')}>Hours</button>
                <button type='button' value='Pay' className='button_primary outline outline-1 hover:bg-gray-300 min-w-fit px-1 py-0' onClick={() => props.click('salary')}>Pay</button>
            </div>
            <div className='flex items-center space-x-1 pr-1'>
                <label>{" Search: "}</label>
                <input type='text' className="rounded h-7"/>
            </div>
        </div>
        
    )
}

export default Jobs
