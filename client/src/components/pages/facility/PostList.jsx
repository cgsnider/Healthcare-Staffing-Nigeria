import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import JobListing from '../../parts/JobListings'
import CircleLoader from 'react-spinners/CircleLoader'
import TopBar from '../../parts/TopBar'
import Popup from 'reactjs-popup'
import {getFacilityPostings, getJobPosts, getCategories} from '../../../hooks/server'
import ReactHtmlParser from 'react-html-parser'
import { Drop } from '../../parts/Drop';
import '../../styling/ConfirmationPopup.css';


function PostList (props) {

    let key = 0;
    const [loggedIn, setLoggedIn] = useState(false);
    const [fetchOnce, setFetchOnce] = useState(false);

    useEffect( ()=> {
        let isMounted = true;
        if(!loggedIn){
            setLoggedIn(localStorage.getItem('loggedIn'));
        }
        if(!fetchOnce){
            setFetchOnce(true);
            fetchCategories(isMounted);
        }

        return () => {
            isMounted = false;
        };
    }, [])

    const [postings, setPostings] = useState([]);
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [posFetchEnd, setPosFetchEnd] = useState(false);
    const [position, setPosition] = useState(null);
    const [openApply, setOpen] = useState(false);
    const [applyPos, setApplyPosition] = useState({});
    const [catFetchEnd, setCatFetchEnd] = useState(false);
    const [categories, setCategories] = useState(null);

    const fetchPosts = async(isMounted) => {
        setPosFetchEnd(false);
        let items = await getJobPosts((position.value == 'All') ? null : position.value)
            .catch(err=>setFetchError(true));
        if (isMounted) {
            setPosFetchEnd(true);
            setPostings(items[0]);
            console.log(items[0]);
        }
        else console.log('aborted setPostings on unmounted component');
    }

    useEffect (() => {
        let isMounted = true;
        fetchPosts(isMounted);
        return () => {
            isMounted = false;
        };
    }, [position])

    const fetchCategories = async(isMounted) => {
        let items = await getCategories()
        .catch(err=>{setFetchError(true); console.error(err);})
        if (isMounted) {
            setCatFetchEnd(true);
            items[0].unshift({Category:'All'})
            console.log('list: ',items[0])
            setCategories(items[0].map(cat => {
                return ({
                    label: cat.Category,
                    value: cat.Category
                })
            }), console.log(categories))
            setPosFetchEnd(true);
        }
        else console.log('aborted setCategories on unmounted component')
    }

    const handleClick = (e) =>{
        console.log(postings);
        const copy = [...postings]
        if (e === 'salary') {
            copy.sort((a, b)=> a[e] < b[e]? 1:-1)
        } else {
            copy.sort((a, b)=> a[e] > b[e]? 1:-1)
        }
        
        setPostings(copy);
    }

    const filterSearch = (posts) =>{
        return !!((search === '') || posts.Title.includes(search) || posts.City.includes(search));
    }
    const filterPosition = (pos) => {
        if (position.label === "All") {
            return true;
        }
        else {
            return pos.Category === position.label;
        }
    }

    const handleDelete = () => {
        
    }

    if(fetchError !== true) {
        if (posFetchEnd && catFetchEnd) {
            return (
                <div>
                     <OptionsBar search={search} setSearch={setSearch} click={handleClick}/>
                     <div className="justify-center content-center flex">
                        <Drop position={position} setPosition={setPosition} label='Select a Position' options={categories}/>
                    </div>
                    {(position !== null) ?

                        <ul className="prof_job_grid content-center flex flex-wrap mx-32">
                        {[...postings].filter(filterPosition).filter(filterSearch)
                        .map(e => {console.log(e)
                        return ( <li className='prof_job_node mx-16 mb-8' key={key++}>
                                <JobListing
                                image={(e.ImageAddr) ? `/api/profile_picture/${e.ImageAddr}` : 'resources/cmg_logo.png'}
                                position={e.Title}
                                location={`${e.City}, ${e.Country}`}
                                shifts={e.Shifts}
                                salary={e.Salary}
                                setOpen={setOpen}
                                setPosting={setApplyPosition}
                                posting={e}
                                type='apply'
                                />
                            </li> )
                        })}

                
                        </ul>
                        :
                        <div className="flex content-center justify-center">No Jobs Posted</div>
                    }
                    <DetailView open={openApply} setOpen={setOpen} posting={applyPos}/>
                </div>
            )
        } else {
            return (
                <div className='flex content-center justify-center py-10'>
                    <CircleLoader loading={!posFetchEnd} color={'#3a8c3c'}/>
                </div>
            )
        }
    } else {
        return (
            <div>
                Error retrieving job postings!
                <Link to="/">
                    <h1>Return Home</h1>
                </Link>
            </div>
        )
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

    function DetailView (props) {
        const post = props.posting;
        console.log('ping');

        return (
            <Popup open={props.open} onClose={()=>props.setOpen(false)} className='application'>
            <div className='flex flex-col justify-center content-center text-center mb-10'>
                <div className='absolute right-5 top-4 py-1 px-3 bg-gray-300 text-lg text-center align-center hover:cursor-pointer hover:bg-gray-200 hover:text-black-800' onClick={()=>props.setOpen(false)}>x</div>
                <h1 className='text-4xl'>{post.Title}</h1>
                <h2 className='text-xl'>{(post.FacName)? `${post.FacName}`:'?????'}</h2>
                <h3 className='text-lg'>{(post.City)? `${post.City}, ${post.Country}`:'?????'}</h3>
            </div>
            <div id='posting-body' className='mx-3'>
                <div id='description' className='mb-4'>
                    <h3 className='font-bold text-lg'>Job Description</h3>
                    <p>{ReactHtmlParser(post.Descript)}</p>
                </div>
                <div className='flex my-2'>
                    <h6 className='font-bold'>Salary:&nbsp; </h6>
                    <span>&#8358; {(post.Salary)? `${post.Salary}`: '?????'}</span>
                </div>
                <div className='flex my-2'>
                    <h6 className='font-bold'>Shifts:&nbsp;</h6>
                    <span>{(post.Shifts)?post.Shifts:'?????'}</span>
                </div>
                <div className='flex my-2'>
                    <h6 className='font-bold'>Address:&nbsp;</h6>
                    <span>{(post.Street)?`${post.Street}, ${post.City}, ${post.State}, ${post.Country}`:'?????'}</span>
                </div>
                <div className='flex my-2'>
                    <h6 className='font-bold'>Contact:&nbsp;</h6>
                    <span>{(post.Email)?post.Email:"?????"}</span>
                </div>
            </div>
            <div>
                <div className='flex justify-center mt-20'>
                    <RemovePop/>
                </div>
            </div>
        </Popup>
        )
    }

    function RemovePop (props) {
        return (
            <div>
                <Popup trigger={<button className="bg-red-500 hover:bg-red-700 outline outline-1 rounded px-3">Delete Post</button>} modal>
                    {close => (
                        <div className="confirmPop">
                            <div className="header"> Delete Post </div>
                            <div className="w-100% text-center mb-5 mt-2">
                            {' '}
                                Are you sure you want to delete this post?
                            </div>
                            <div className="w-100% border-b-1 border-gray-700 text-center m-auto">
                                <button className="bg-gray-200 outline outline-1 rounded px-3 mr-2" onClick={handleDelete}>Delete</button>
                                <button className="bg-gray-200 outline outline-1 rounded px-3 ml-2" onClick={() => {close()}}>Cancel</button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }







}

export default PostList