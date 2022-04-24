import React from 'react';
import TopBar from '../../parts/TopBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../styling/Profile.css';
import '../../../App.css'
import '../../../index.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import {Drop2 , Drop} from '../../parts/Drop';
import placeholder from '../../../images/profile-placeholder.jpg';
import {applyForVerification, getProfileData, getProfileImage, postProfileData, postProfilePicture } from '../../../hooks/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import MessagePopup from '../../parts/MessagePopup';
import CircleLoader from 'react-spinners/CircleLoader';
export default function Fac_Profile(props) {

    const [profileInfo, setProfileInfo] = useState(
        {Email: null, 
        PhoneNumber: null, 
        FacName: null,
        Verified: 0, //  0=unverified, 1=pending, 2=verified
        ImageAddr: null,
        Street:null,
        City:null,
        Country:null,
        Descript:null,
        CName: null
    });

    const [picture, setPicture] = useState(placeholder);
    const [update, setUpdate] = useState(0);
    const [viewMessage, setViewMessage] = useState(false);
    const [infoFetchEnd, setInfoFetchEnd] = useState(false);

    const triggerUpdate = () => {
        setUpdate((update + 1) % 16);
    }
    
    useEffect( ()=> {
        let isMounted = true;
        fetchProfileData(isMounted);
        return() => {
            isMounted = false
        }
    }, []);

    useEffect( () => {
        setPicture((profileInfo.ImageAddr) ?  `/api/profile_picture/${profileInfo.ImageAddr}` : placeholder)
        console.log(profileInfo)
    }, [update])

    const fetchProfileData = async(isMounted) => {
        let data = await getProfileData();
        console.log("FETCH DATA: ",data);
        console.log(isMounted);
        if (isMounted) {
            console.log('Trigger')
            setProfileInfo(data[0][0])
            setInfoFetchEnd(true)
            triggerUpdate()
        }
        else console.log('aborted setPostings on unmounted component')
    }


    const ApplyVerification =(e) => {
        applyForVerification();
        console.log()
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
                    <span>You are not verified. You will have limited access until you become verified. To submit for verification click <span className='text-blue-600 underline hover:cursor-pointer' onClick={submitVerification}>here</span>.</span>
                </div>
            );
        }
        else if(profileInfo.Verified===1){
            return(
                <div className='w-full h-8 text-center content-center bg-amber-500'> 
                    <span>Verification pending. Access will be limited until you are verified.</span>
                </div>
            );
        }
        else if(profileInfo.Verified===3){
            return(
                <div className='w-full h-8 text-center content-center bg-amber-500 sticky top-16'> 
                    <span>You have been denied verification. View the response by clicking the question mark by your status and then you may resubmit for verification <span className='text-blue-600 underline hover:cursor-pointer' onClick={submitVerification}>here</span>.</span>
                </div>
            );
        }
        return null;
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
                <div className="ml-auto mr-0 hover:cursor-pointer" onClick={()=>setViewMessage(true)}>
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-md">Verified</span>  
                    <div className='relative w-0 h-0'><FontAwesomeIcon icon={faCircleQuestion} size='sm' className='absolute -top-8 -right-[79px] bg-white rounded-full'/></div>
                    <MessagePopup open={viewMessage} setOpen={setViewMessage} type='accept' message={profileInfo.AdminMessage} spin className='fa-spin'/>
                </div>
            );
        }
        if(profileInfo.Verified===3) {
            return(
                <div className="ml-auto mr-0 hover:cursor-pointer" onClick={()=>setViewMessage(true)}>
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-md">Denied</span>
                    <div className='relative w-0 h-0'><FontAwesomeIcon icon={faCircleQuestion} size='sm' className='absolute -top-8 -right-[75px] bg-white rounded-full'/></div>
                    <MessagePopup open={viewMessage} setOpen={setViewMessage} type='Deny' message={profileInfo.AdminMessage} spin className='fa-spin'/>
                </div>
            );
        }
    }

    const handleImageUpload = (e) => {
        postProfilePicture(e.target.files[0]);
        fetchProfileData(true);
        console.log(profileInfo.ImageAddr);
    }

if(profileInfo && infoFetchEnd){
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
                                            src={(profileInfo.ImageAddr!==null) ?  `/api/profile_picture/${profileInfo.ImageAddr}` : placeholder}
                                            alt="Profile Picture"/>
                                    </label>
                                    {/** use attribute to specify accepted file types: accept={comma-separated list of unique file type specifiers.}*/}
                                    <input type="file" id='pfp-upload' className='hidden' onChange={handleImageUpload} />
                                    
                                </div>
                                
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profileInfo.FacName}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">{}</h3>
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
                            </ul>
                        </div>
                        <div className="my-4"></div>
                        
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64 ">
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
                                        <div className="px-4 py-2 font-semibold">Facility Name</div>
                                        <div className="px-4 py-2">{profileInfo.FacName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact Person</div>
                                        <div className="px-4 py-2">{profileInfo.CName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Address</div>
                                        <div className="px-4 py-2">{(profileInfo.Street==null)? "None" : `${profileInfo.Street}\n ${profileInfo.City}, ${profileInfo.Country}`}</div>
                                        {console.log("Prof: ", profileInfo)}
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2">{profileInfo.PhoneNumber} {/**not sure how to handle country code formatting */}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold"></div>
                                        <div className="px-4 py-2">{}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email</div>
                                        <div className="px-4 py-2 overflow-auto">
                                            <a className="text-blue-800 overflow-clip" href={`mailto:${profileInfo.Email}`}>{profileInfo.Email}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold"></div>
                                        <div className="px-4 py-2">{}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-4"></div>

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
                <CircleLoader loading={!infoFetchEnd} color={'#3a8c3c'}/>
            </div>
        );
    }
}

function AboutPopup(props) {
    const [open, setOpen] = useState({open: false, fresh: true})
    const [tempInfo, setTempInfo] = useState({...props.info})
    const [gender, setGender] = useState({label: tempInfo.gender})
    const setInfo = props.setInfo
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const contentStyle = { width: '90%' };
    
    useEffect( () => {
        if (open.fresh) {
            setOpen({...open, fresh:false})
            setTempInfo(props.info);
        }
    }, [open, props.info]);
    
    const close = (e) => {
        setOpen({...open, open:false})
    }
    const save = (e) => {
        console.log("SAVE")
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
                            <div className="px-4 py-2 font-semibold">Facility Name</div>
                            <input type='text' className="rounded" value={tempInfo.FacName} onInput={e=>setTempInfo({...tempInfo, FacName: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Contact Name</div>
                            <input type='text' className="rounded" value={tempInfo.CName} onInput={e=>setTempInfo({...tempInfo, CName: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                            <input type='text' className="rounded" value={tempInfo.PhoneNumber} onInput={e=>setTempInfo({...tempInfo, PhoneNumber: e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">Email</div>
                            <input type='text' disbaled='true' className="rounded" value={tempInfo.Email} onInput={e=>setTempInfo({...tempInfo, Email: e.target.value})}/>
                        </div>
                        {/* <div className="grid grid-cols-2  items-center">
                            <div className="px-4 py-2 font-semibold">MDCN #</div>
                            <input type='text' className="rounded" value={tempInfo.MDCN} onInput={e=>setTempInfo({...tempInfo, MDCN: e.target.value})}/>
                        </div> */}
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
                            <h1 className='text-2xl bold mb-5 border-b-2'>Description</h1>
                        </div>
                        <div className="grid grid-cols-2  items-center col-start-1">
                        </div>
                        <div className='my-4 w-full col-span-2'>
                            <textarea className='w-full rounded' type='textarea' placeholder='Description...' onInput={e=>setTempInfo({...tempInfo, Descript: e.target.value})} value={tempInfo.Descript}></textarea>
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
