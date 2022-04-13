import React from 'react';
import TopBar from '../parts/TopBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styling/Profile.css';
import '../../App.css'
import '../../index.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import {Drop2 , Drop} from '../parts/Drop';
import placeholder from '../../images/profile-placeholder.jpg';
import { applyForVerification, getEducation, getProfileData, getProfileImage, postEducation, postProfileData, postProfilePicture, getResume, postResume, downloadResume } from '../../hooks/server';
import CircleLoader from 'react-spinners/CircleLoader';
export default function Profile(props) {
    const [profileInfo, setProfileInfo] = useState(null);


    const [newExperience, setNewExperience] = useState([]);
    /** {university: 'Vanderbilt University', startDate: '2022-02-01', endDate: '2022-02-26', degree: 'Bachelors Degree', count: 0}
     * copy paste above to test education
    */
    const [newEducation, setNewEducation] = useState([]);
    
    const [infoFetchEnd, setInfoFetchEnd] = useState(false);
    const [edFetchEnd, setEdFetchEnd] = useState(false);
    useEffect( ()=> {
        let isMounted = true;
        fetchProfileData(isMounted);
        fetchEducation(isMounted);
        return() => {
            isMounted = false
        }
    }, []);

    const fetchResume = (email) => {
        console.log(email);
        getResume(email)
        .then(res => {
            console.log(res);
            setProfileInfo({...profileInfo, Resume: res}, console.log('t',profileInfo));
        })
        .catch(err=>console.error(err))
    }

    const fetchProfileData = async(isMounted) => {
        let data = await getProfileData()
        if (isMounted) {
            setInfoFetchEnd(true);
            setProfileInfo(data[0][0], console.log(profileInfo));
            fetchResume(data[0][0].Email);
        }
        else console.log('aborted setPostings on unmounted component')
    }

    const fetchEducation = async(isMounted) => {
        console.log("EDUCATION 1")
        let data = await getEducation()
        if (isMounted) {
            setEdFetchEnd(true);
            setNewEducation([...data[0]]);
        } 
        else console.log('aborted setPostings on unmounted component')
    }

    const ApplyVerification =(e) => {
        applyForVerification();
    }

    const handleRemoveEducation = (e) => {
        let index = e.target.getAttribute('data-index')
        setNewEducation(newEducation.filter(item=> {return item.count != index}))
    }

    const handleRemoveExperience = (e) => {
        let index = e.target.getAttribute('data-index')
        setNewExperience(newExperience.filter(item=> {return item.count != index}))
    }
    const submitVerification = (e) => {
        applyForVerification()
            .then(res => setProfileInfo({...profileInfo, Verified : 1}))
            .catch(err => console.loga(err));
    }

    const Verificationdrop = (props) => {
        if(profileInfo.Verified===0){
            return(
                <div className='w-full h-8 text-center content-center bg-amber-500'> 
                    <span>You are not verified. You will have limited access until you become verified. To submit for verification click <span className='text-blue-600 underline hover:cursor-pointer' onClick={submitVerification}>here</span></span>
                </div>
            );
        }
        else if(profileInfo.Verified===1){
            return(
                <div className='w-full h-8 text-center content-center bg-amber-500'> 
                    <span>Verification pending. Access will be limited until you are verified</span>
                </div>
            );
        }
        return (null);
    }

    const VerifiedIcon = (props) => {
        if(profileInfo.Verified==0) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                </div>
            );
        }
        if(profileInfo.Verified==1) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-amber-500 py-1 px-2 rounded text-white text-sm">Pending</span>
                </div>
            );
        }
        if(profileInfo.Verified==2) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                </div>
            );
        }
    }

    const handleImageUpload = (e) => {
        postProfilePicture(e.target.files[0]);
        fetchProfileData(true);
    }

    const handleResumeUplaod = (e) => {
        postResume(e.target.files[0]);
        fetchProfileData(true);
    }

    if (edFetchEnd && infoFetchEnd && profileInfo) {
        return (
            <div>
                <Verificationdrop />
                <div className="bg-gray-100 border-2 h-full min-h-screen">
                    <div className="w-full text-white bg-main-color">
                        <div className="container mx-auto p-5">
                            <div className="md:flex no-wrap md:-mx-2 ">
                                <div className="w-full md:w-3/12 md:mx-2">
                                    <div className="bg-white p-3 border-t-4 border-green-400">
                                        <div className="image overflow-hidden">
                                            <div>
                                                <label htmlFor='pfp-upload' >
                                                    <img className="h-auto w-full mx-auto hover:cursor-pointer hover:border-2"
                                                        src={(profileInfo.ImageAddr) ?  `/api/profile_picture/${profileInfo.ImageAddr}` : placeholder}
                                                        alt="Profile Picture"/>
                                                </label>
                                                {/** use attribute to specify accepted file types: accept={comma-separated list of unique file type specifiers.}*/}
                                                <input type="file" id='pfp-upload' className='hidden' onChange={handleImageUpload} />
                                                
                                            </div>
                                            
                                        </div>
                                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profileInfo.FName} {profileInfo.LName}</h1>
                                        <h3 className="text-gray-600 font-lg text-semibold leading-6">{profileInfo.Specialization}</h3>
                                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                            {profileInfo.Bio}</p>
                                        <ul
                                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                            <li className="flex items-center py-3">
                                                <span>Verification Status</span>
                                                <span className="ml-auto">
                                                    <VerifiedIcon />
                                                </span>
                                            </li>
                                            <li className="flex items-center py-3">
                                                <span>CV/Resume</span>
                                                {(profileInfo.Resume)?
                                                <span className="ml-auto" onClick={(e)=>{downloadResume(profileInfo.Email)}}>Resume</span>
                                                :
                                                <>
                                                <label className="hover:cursor-pointer bg-green-500 rounded text-white text-md py-1 px-4 ml-auto" htmlFor='resume-upload'>Upload</label>
                                                <input type="file" id='resume-upload' className='hidden' onChange={handleResumeUplaod} />
                                                </>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="my-4"></div>
                                    
                                </div>
                                <div className="w-full md:w-9/12 mx-2 h-64">
                                    <div className="bg-white p-3 shadow-sm rounded-sm">
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">About</span>
                                            <AboutPopup info={profileInfo} setInfo={setProfileInfo}/>
                                            
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                                    <div className="px-4 py-2">{profileInfo.FName}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                                    <div className="px-4 py-2">{profileInfo.LName}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">MDCN #</div>
                                                    <div className="px-4 py-2">{profileInfo.MDCN || "None"}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                    <div className="px-4 py-2">+234 {profileInfo.PhoneNumber} {/**not sure how to handle country code formatting */}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Address</div>
                                                    <div className="px-4 py-2">{(profileInfo.Street != null)?`${profileInfo.Street}\n ${profileInfo.City}, ${profileInfo.Country}`: "None"}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Email</div>
                                                    <div className="px-4 py-2">
                                                        <a className="text-blue-800 overflow-clip" href={`mailto:${profileInfo.Email}`}>{profileInfo.Email}</a>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">License #</div>
                                                    <div className="px-4 py-2">{profileInfo.LicenseNumber || "None"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-4"></div>

                                    <div className="bg-white p-3 shadow-sm rounded-sm">

                                        <div className="grid grid-cols-2">
                                            <div>
                                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                    <span clas="text-green-500">
                                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </span>
                                                    <span className="tracking-wide">Experience</span>
                                                    <ExperiencePopup newExperience={newExperience} setNewExperience={setNewExperience}/>
                                                    
                                                </div>
                                                <ul className='list-inside space-y-2 mb-4'>
                                                    {(newExperience.length!=0)?newExperience.map((item, i)=> {
                                                        return(
                                                            <li key={i} className='mb-4'>
                                                                <div className='text-teal-600'>{`${item.title} at ${item.comapny}`}</div>
                                                                <div className='text-gray-500 text-xs'>{`${item.startDate} to ${item.endDate}`}</div>
                                                                <div className='text-xs underline text-blue-600 hover:cursor-pointer' data-index={item.count} onClick={handleRemoveExperience}>Remove</div>
                                                            </li>
                                                        );
                                                    })
                                                :
                                                <div className='text-gray-900'>None</div>
                                                }
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                    <span clas="text-green-500">
                                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                            <path fill="#fff"
                                                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                        </svg>
                                                    </span>
                                                    <span className="tracking-wide">Education</span>
                                                    <EducationPopup newEducation={newEducation} setNewEducation={setNewEducation}/>
                                                </div>
                                                <ul className='list-inside space-y-2 mb-4'>
                                                    {(newEducation.length!=0)?newEducation.map((item, i)=> {
                                                        return(
                                                            <li key={i} className='mb-4'>
                                                                <div className='text-teal-600'>{`${item.Degree} at ${item.College}`}</div>
                                                                <div className='text-gray-500 text-xs'>{`${item.StartDate} to ${item.EndDate}`}</div>
                                                                <div className='text-xs underline text-blue-600 hover:cursor-pointer' data-index={item.Count} onClick={handleRemoveEducation}>Remove</div>
                                                            </li>
                                                        );
                                                    })
                                                :
                                                <div className='text-gray-900'>None</div>
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    } else {
        return (
            <div className='flex content-center justify-center py-10'>
                <CircleLoader loading={!infoFetchEnd || !edFetchEnd} color={'#3a8c3c'}/>
            </div>
        );
    }
}
/**
 * 
 * possible problem in using count as an identifier 
 * for each entry consider using somekind of id 
 * generator
 */
function EducationPopup (props) {
        const [degree, setDegree] = useState(null);
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [institute, setInstitute] = useState('')
        const [count, setCount] = useState(1);
        const [addEducation, setAddEducation] = useState([]);
        const [open, setOpen] = useState(false);
        const newEducation = props.newEducation;
        const setNewEducation = props.setNewEducation; 
        const options = {year: 'numeric', month: 'long'}

        useEffect(() => {
            console.log('NEW EDUCATION HFAKJDHSI: ', newEducation);
            console.log('ADD EDUCATION HFAKJDHSI: ', addEducation);
            if (addEducation.length == 0) {
                // Remove education
            } else {
                // Add Education
                postEducation(addEducation);
                // postEducationData()
            }
            // postEducationData()
        }, [newEducation]);

        const handleClick = (e) => {
            if(degree===null||startDate===null||endDate===null||institute===''|| endDate<startDate){
                console.log('error with inputs');
                return;
            }
            setAddEducation([...addEducation , {College: institute, StartDate: startDate.toLocaleDateString('en-US', options), EndDate: endDate.toLocaleDateString('en-US', options), Degree: degree.label, Count: count}], () =>  console.log('addEducation: ', addEducation));
            console.log('addEducation 2: ', addEducation)
            setCount(count+1)
        }

        const handleRemove = (e) => {
            let index = e.target.getAttribute('data-index');
            //console.log(index);
            setAddEducation(addEducation.filter((item)=>{
                //console.log(item.count, index)
                //console.log(item.count!=index);
                return item.count != index;
            }))
            //console.log(newEducation)
        }
        const postEducationData = () => {
            setNewEducation([...newEducation, ...addEducation], () => console.log("New Education 2-2: ", newEducation));
            console.log("New Education 2: ", newEducation)
            //postData(addEducation);
        }
        const closeReset = (e) => {
            setOpen(false);
            setAddEducation([])
            setDegree(null)
            setStartDate(null)
            setEndDate(null)
            setInstitute('')
        }
        const save = (e) => {
            postEducationData()
            console.log("Save Education: ", newEducation)
            setOpen(false)
        }
        const handleStartDate = (date) => {
            setStartDate(date)
        }
        const handleEndDate = (date) => {
            setEndDate(date)
        }
        return (
            <>
            <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={e=>setOpen(true)} >Add</button>
                <Popup open={open} position='right center' modal onClose={closeReset}>
                    <div className='flex flex-col justify-around p-4'>
                        <Drop2 setNewEducation={setInstitute} newEducation={institute} placeholder='School'/>
                        <div className='my-2'></div>
                        <Drop  options={[{label: 'Associates Degree', value: 'A'}, {label:'Bachelors Degree', value: 'B'},{label:'Masters Degree', value: 'M'},{label:'Doctoral Degree', value: 'D'}]} placeholder='Highest Degree Earned' setPosition={setDegree}/>
                        <div className='mb-2 mt-4 grid grid-cols-3 justify-items-end items-center'>
                            <label className='mr-4'>Start Date: </label>
                            <div className='w-full col-span-2'>
                                <DatePicker 
                                    selected={startDate}
                                    onChange={handleStartDate}
                                    dateFormat='MMMM yyyy'
                                    showMonthYearPicker
                                />
                            </div>
                        </div>
                        <div className='mt-2 mb-2 grid grid-cols-3 justify-items-end items-center'>
                            <label className='mr-4'>End Date: </label>
                            <div className='w-full col-span-2'>
                                <DatePicker 
                                    selected={endDate}
                                    onChange={handleEndDate}
                                    dateFormat='MMMM yyyy'
                                    showMonthYearPicker
                                />
                            </div>
                        </div>
                        <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={handleClick}>Add</button>
                    </div>
                    <ul className='list-inside space-y-2 mb-4'>
                        {addEducation.map((item, i)=> {
                            return(
                                <li key={i} className='border-b-2'>
                                    <div className='text-teal-600'>{`${item.Degree} at ${item.College}`}</div>
                                    <div className='text-gray-500 text-xs'>{`${item.StartDate} to ${item.EndDate}`}</div>
                                    <div className='text-xs underline text-blue-600 hover:cursor-pointer' data-index={item.Count} onClick={handleRemove}>Remove</div>
                                </li>
                            );
                        })}
                    </ul>
                <div className='flex flex-col'>
                    <button className="bg-green-500 rounded text-white py-1 text-md px-2" onClick={save}>Save</button>
                </div>
                
            </Popup>
        </>
        )
}
/**
 * 
 * similar problem as experiencepopup with count for id
 */
function ExperiencePopup(props) {
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [addExperience, setAddExperience] = useState([])
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const newExperience = props.newExperience;
    const setNewExperience = props.setNewExperience;
    const options = {year: 'numeric', month: 'long'}

    const postExperienceData = () => {
        setNewExperience([...newExperience, ...addExperience]);
        //postData(addExperience)
    }
    const closeReset = (e) => {
        setCompany('');
        setStartDate(null);
        setEndDate(null);
        setAddExperience([])
        setOpen(false);
    }
    const save = (e) => {
        postExperienceData()
        setOpen(false);
    }
    const handleClick = (e) => {
        if(company==='' || startDate===null||endDate===null|| endDate<startDate) {
            return;
        }
        setAddExperience([...addExperience, {company: company, title: title, startDate: startDate.toLocaleDateString('en-US', options), endDate: endDate.toLocaleDateString('en-US', options), count: count}]);
        setCount(count+1)

    }

    const handleRemove = (e) => {
        let index = e.target.getAttribute('data-index');
        setAddExperience(addExperience.filter((item)=> {
            return item.count != index;
        }))
    }

    const handleStartDate = (date) => {
        setStartDate(date)
    }
    const handleEndDate = (date) => {
        setEndDate(date)
    }

    return(
        <div>
           <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={e=>setOpen(true)}>Add</button> 
           <Popup open={open} position='right center' modal onClose={closeReset}>
               <div className='p-4'>
                <div className='grid grid-cols-3 items-center justify-items-end my-2'>
                    <label className='mr-4'>Company Name: </label>
                    <input className="w-full col-span-2" type='text' placeholder='Company'onInput={e=>setCompany(e.target.value)} />
                </div>
                <div className='grid grid-cols-3 items-center justify-items-end mt-2'>
                    <label className='mr-4'>Title at Company: </label>
                    <input className="w-full col-span-2" type='text' placeholder='Title' onInput={e=>setTitle(e.target.value)} />
                </div>
                <div className='mb-2 mt-3 grid grid-cols-3 items-center justify-items-end'>
                    <label className='mr-4'>Start Date: </label>
                    <div className='w-full col-span-2'>
                        <DatePicker 
                            selected={startDate}
                            onChange={handleStartDate}
                            dateFormat='MMMM yyyy'
                            showMonthYearPicker
                        />
                    </div>
                    
                </div>
                <div className='mt-2 mb-2 grid grid-cols-3 items-center justify-items-end'>
                    <label className='mr-4'>End Date: </label>
                    <div className='w-full col-span-2'>
                        <DatePicker 
                            selected={endDate}
                            onChange={handleEndDate}
                            dateFormat='MMMM yyyy'
                            showMonthYearPicker
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={handleClick}>Add</button>
                </div>
                </div>

                <ul className='list-inside space-y-2 my-4'>
                    {addExperience.map((item, i)=> {
                        return(
                            <li key={i} className='border-b-2'>
                                <div className='text-teal-600'>{`${item.title} at ${item.company}`}</div>
                                <div className='text-gray-500 text-xs'>{`${item.startDate} to ${item.endDate}`}</div>
                                <div className='text-xs underline text-blue-600 hover:cursor-pointer' data-index={item.count} onClick={handleRemove}>Remove</div>
                            </li>
                        );
                    })}
                </ul>


                <div className='w-full flex flex-col'>
                    <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={save}>Save</button>
                </div>
            </Popup>
        </div>
    );
}

function AboutPopup(props) {
    const [open, setOpen] = useState({open: false, fresh: true})
    const [tempInfo, setTempInfo] = useState({...props.info})
    const [gender, setGender] = useState({label: tempInfo.gender})
    const setInfo = props.setInfo
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const contentStyle = { width: '90%' };
    
    useEffect( () => {
        console.log(props.info)
        if (open.fresh) {
            setOpen({...open, fresh:false})
            setTempInfo(props.info);
        }
    }, [open, props.info]);
    
    const close = (e) => {
        setOpen({...open, open:false})
    }
    
    const save = (e) => {
        console.log(tempInfo)
        postProfileData(tempInfo)
        setInfo({...tempInfo, gender: gender.label});
        setOpen({...open, open:false});
    }

    return(
        <div>
            <button className="bg-green-500 rounded text-white text-sm py-1 px-3 ml-auto" onClick={e=>setOpen({fresh:true, open:true})}>Edit</button>
            <Popup open={open.open} modal position='right center' onClose={close} className="about">
                <div className="text-gray-700 m-5 w-auto">
                    <h1 className='text-2xl bold mb-5 border-b-2'>Profile</h1>
                    <div className="grid md:grid-cols-2 text-sm gap-y-2">
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">First Name</div>
                            <input type='text' className="rounded" value={tempInfo.FName} onInput={e=>setTempInfo({...tempInfo, FName: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Last Name</div>
                            <input type='text' className="rounded" value={tempInfo.LName} onInput={e=>setTempInfo({...tempInfo, LName: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">License #</div>
                            <input type='text' className="rounded" value={tempInfo.LicenseNumber} onInput={e=>setTempInfo({...tempInfo, LicenseNumber: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                            <input type='text' className="rounded" value={tempInfo.PhoneNumber} onInput={e=>setTempInfo({...tempInfo, PhoneNumber: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Email</div>
                            <input type='text' className="rounded" value={tempInfo.Email} onInput={e=>setTempInfo({...tempInfo, Email: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">MDCN #</div>
                            <input type='text' className="rounded" value={tempInfo.MDCN} onInput={e=>setTempInfo({...tempInfo, MDCN: e.target.value})}/>
                        </div>
                        <div className='col-span-2'>
                            <h1 className='text-2xl bold mb-5 border-b-2'>Address</h1>
                            <div className="grid grid-cols-5  items-center">
                                <div className="px-4 py-2 font-semibold">Street</div>
                                <input type='text' className="rounded col-span-2 col-start-2" value={tempInfo.Street} onInput={e=>setTempInfo({...tempInfo, Street: e.target.value})}/>
                            </div>
                            <div className="grid grid-cols-5  items-center my-2">
                                <div className="px-4 py-2 font-semibold">City</div>
                                <input type='text' className="rounded col-span-2 col-start-2" value={tempInfo.City} onInput={e=>setTempInfo({...tempInfo, City: e.target.value})}/>
                            </div>
                            <div className="grid grid-cols-5  items-center">
                                <div className="px-4 py-2 font-semibold">Country</div>
                                <input type='text' className="rounded col-span-2 col-start-2" value={tempInfo.Country} onInput={e=>setTempInfo({...tempInfo, Country: e.target.value})}/>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <h1 className='text-2xl bold mb-5 border-b-2'>Career</h1>
                        </div>
                        <div className="grid grid-cols-2  items-center col-start-1">
                            <div className="px-4 py-2 font-semibold">Specialization</div>
                            <input type='text' className="rounded" value={tempInfo.Specialization} onInput={e=>setTempInfo({...tempInfo, Specialization: e.target.value})}/>
                        </div>
                        <div className='my-4 w-full col-span-2'>
                            <textarea className='w-full rounded' type='textarea' placeholder='Short Bio' onInput={e=>setTempInfo({...tempInfo, Bio: e.target.value})} value={tempInfo.Bio}></textarea>
                        </div>
                    </div>
                    
                </div>
                
                <div className='flex flex-col'>
                    <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={save}>Save</button> 
                </div>
            </Popup>
        </div>
    );
}
