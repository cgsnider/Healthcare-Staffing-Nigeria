import React, {useEffect, useState} from 'react'

import JobListing from '../../parts/JobListings'
import TopBar from '../../parts/TopBar';

import '../../styling/Jobs.css'
import '../../../App.css'

function Jobs (props) {

    let key = 0;

    useEffect( ()=> {
        fetchPostings();
    }, [])

    const [postings, setPostings] = useState([]);

    const fetchPostings = async() => {
        const data = await fetch('/api/jobs');
        const items = await data.json();
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



    window.onscroll = () => {stickBar()};

    let optBar = document.getElementById("opt_bar");

    let sticky = (optBar ==  null) ? 125 : optBar.offsetHeight;

    function stickBar () {
        if (window.pageYOffset >= sticky) {
            optBar.classList.add("sticky")
        } else {
            optBar.classList.remove("sticky");
        }
    }


    return (
        <div id="opt_bar" className='options_bar'>
            <input type='button' value='Location A-Z' className='button_primary'/>
            <input type='button' value='Postion A-Z' className='button_primary'/>
            <input type='button' value='Hours' className='button_primary'/>
            <input type='button' value='Pay' className='button_primary'/>
            <label>{" Search: "}</label>
            <input type='text' />
        </div>
        
    )
}

export default Jobs
