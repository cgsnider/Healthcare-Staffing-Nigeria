import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import '../../styling/Jobs.css'
import '../../../App.css'

import { getJobPosts, getApplications } from '../../../hooks/server';
import ApplicationListing from "../../parts/ApplicationListings";
import CircleLoader from 'react-spinners/CircleLoader';

function ViewApplications (props) {

    let key = 0;
    const [loggedIn, setLoggedIn] = useState(false);
    const [postFetchEnd, setPostFetchEnd] = useState(false);
    useEffect( ()=> {
        let isMounted2 = true;
        if(!loggedIn){
            setLoggedIn(localStorage.getItem('loggedIn'));
        }
        fetchPostings(isMounted2);
        return () => {
            isMounted2 = false;
        };
    }, [])

    const [applications, setApplications] = useState(null);
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(false);

    const fetchPostings = async(isMounted) => {
        let items = await getApplications()
            .catch(err=>setFetchError(true))
        if (isMounted) {
            setPostFetchEnd(true);
            setApplications(items[0]);
            console.log(items[0]);
        }
        else console.log('aborted setPostings on unmounted component')
    }

    //handles sorting postings based on prop e
    //passed to options for use
    const handleClick = (e) =>{
        console.log(applications)
        const copy = [...applications]
        if (e === 'salary') {
            copy.sort((a, b)=> a[e] < b[e]? 1:-1)
        } else {
            copy.sort((a, b)=> a[e] > b[e]? 1:-1)
        }

        setApplications(copy)
    }
    const filterSearch = (posts) =>{
        return !!((search === '') || posts.Title.includes(search) || posts.City.includes(search));
    }

    const LoadApps = (props) => {
        if (postFetchEnd) {
            if(applications !== null && applications.length>0) {
                return(
                    <ul className="prof_job_grid content-center flex flex-wrap mx-32">
                        {[...applications].filter(filterSearch)
                            .map(e => {
                                return ( <li className='prof_job_node mx-16 mb-8' key={key++}>
                                    <ApplicationListing
                                        image={(e.Image) ? e.Image : 'resources/cmg_logo.png'}
                                        position={e.Title}
                                        location={`${e.City}, ${e.Country}`}
                                        shifts={e.Shifts}
                                        salary={e.Salary}/>
                                </li> )
                            })}
                    </ul>
                );
            } else {
                return (
                    <div className="flex flex-col items-center mt-32">
                        <h4 className="text-2xl">No Submitted Applications</h4>
                        <Link to="/jobs">
                            <div href="#" className="outline outline-1 rounded-md py-2 px-3 mt-4 text-white hover:bg-green-900 bg-cmg-mid">View Listings</div>
                        </Link>
                    </div>
                );
            }
        } else {
            return(
                <div className='flex content-center justify-center py-10'>
                    <CircleLoader loading={!postFetchEnd} color={'#3a8c3c'}/>
                </div>
            )
        }
    }


    if((fetchError !== true)) {

        return (
            <div>
                <OptionsBar search={search} setSearch={setSearch} click={handleClick}/>
                <h3 className="my-4 flex justify-center text-3xl">Submitted Applications</h3>
                <LoadApps />
            </div>
        );
    } else {
        return(
            <div>Error retrieving Applications
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
                <button type='button' value='Location A-Z' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight==0?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(0); props.click('location');}}>Location A-Z</button>
                <button type='button' value='Postion A-Z' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight==1?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(1); props.click('position');}}>Position A-Z</button>
                <button type='button' value='Hours' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight==2?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(2); props.click('shifts');}}>Hours</button>
                <button type='button' value='Pay' className={`outline outline-1 min-w-fit px-1 py-0 ${isHighlight==3?'button_primary_highlighted':'button_primary'}`} onClick={() => {highlight(3); props.click('salary');}}>Pay</button>
            </div>
            <div className='flex items-center space-x-1 pr-1'>
                <label>{" Search: "}</label>
                <input type='text' className="rounded h-7" onInput={ (e) => props.setSearch(e.target.value)}/>
            </div>
        </div>

    )
}

export default ViewApplications
