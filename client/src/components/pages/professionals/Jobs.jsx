import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import JobListing from '../../parts/JobListings'
import TopBar from '../../parts/TopBar';
import { Drop } from '../../parts/Drop';

import '../../styling/Jobs.css'
import '../../../App.css'

import { getCategories, getJobPosts } from '../../../hooks/server';

function Jobs (props) {

    let key = 0;
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect( ()=> {
        let isMounted = true;
        if(!loggedIn){
            setLoggedIn(localStorage.getItem('loggedIn'));
        }
        fetchPostings(isMounted);
        fetchCategories(isMounted);
        return () => {
            isMounted = false;
        };
    }, [])

    const [postings, setPostings] = useState(null);
    const [categories, setCategories] = useState(null);
    const [position, setPosition] = useState(null);
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(false);
    const fetchPostings = async(isMounted) => {
        let items = await getJobPosts()
        .catch(err=>setFetchError(true))
        if (isMounted) {
            setPostings(items[0]);
            console.log(items[0]);
        }
        else console.log('aborted setPostings on unmounted component')
    }

    const fetchCategories = async(isMounted) => {
        let items = await getCategories()
        .catch(err=>{setFetchError(true); console.error(err);})
        if (isMounted) {
            items[0].unshift({Category:'All'})
            console.log('list: ',items[0])
            setCategories(items[0].map(cat => {
                return ({
                    label: cat.Category,
                    value: cat.Category
                })
            }), console.log(categories))
        }
        else console.log('aborted setCategories on unmounted component')
    }
    
    //handles sorting postings based on prop e
    //passed to options for use
    const handleClick = (e) =>{
        console.log(postings)
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
    const filterSearch = (posts) =>{
        return !!((search === '') || posts.Title.includes(search) || posts.City.includes(search));
    }
    const filterPosition = (pos) => {
        //console.log(pos, pos.position==position.label);
        // console.log(pos)
        if (position.label === "All") {
            return true;
        }
        else {
            return pos.Category === position.label;
        }
    }
    

    if((fetchError !== true && postings!==null)) {

        return (
            <div>
                <OptionsBar search={search} setSearch={setSearch} click={handleClick}/>
                <div className="justify-center content-center flex">
                    <Drop position={position} setPosition={setPosition} label='Select a Position' options={categories}/>
                </div>
                {(position !== null) ?

                    <ul className="prof_job_grid content-center flex flex-wrap mx-32">
                    {[...postings].filter(filterPosition).filter(filterSearch)
                      .map(e => {
                       return ( <li className='prof_job_node mx-16 mb-8' key={key++}>
                            <JobListing
                            image={(e.Image) ? e.Image : 'resources/cmg_logo.png'}
                            position={e.Title}
                            location={`${e.City}, ${e.Country}`}
                            shifts={e.Shifts}
                            salary={e.Salary}/>
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
            <div>Error retrieving job postings
                <Link to="/" >
                <h1>Return Home</h1>
                </Link>
            </div>
        );
    }

}


function OptionsBar (props) {

    //Hook used to set highlighted state of filter buttons
    const [isHighlight, setHighlight] = useState(null);
    const highlight = (e) => {setHighlight(e);};

    return (
        <div id="opt_bar" className='flex justify-between options_bar bg-gray-100'>
            <div className='flex w-full items-center'>
                
                {/*Onclick sets isHighlight from 0-3 based on which filter option is selected. If the value of 
                // isHighlight matches the value of the filter button
                // it will get highlighted. This is handled in the ternary operator under each buttons className*/}
                <button type='button' value='Location A-Z' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight===0?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(0); props.click('location');}}>Location A-Z</button>
                <button type='button' value='Postion A-Z' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight===1?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(1); props.click('position');}}>Position A-Z</button>
                <button type='button' value='Hours' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight===2?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(2); props.click('shifts');}}>Hours</button>
                <button type='button' value='Pay' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight===3?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(3); props.click('salary');}}>Pay</button>
            </div>
            <div className='flex items-center space-x-1 pr-1'>
                <label>{" Search: "}</label> 
                <input type='text' className="rounded h-7" onInput={ (e) => props.setSearch(e.target.value)}/>
            </div>
        </div>
        
    )
}

export default Jobs
