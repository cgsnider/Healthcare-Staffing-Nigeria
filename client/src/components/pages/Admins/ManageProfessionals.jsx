import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import ProfessionalListing from "../../parts/ProfessionalListing";
import {getBulkProfessional, downloadResume, postVerifyProfessional, getEducation, getExperience, deleteProfessional} from "../../../hooks/server";
import placeholder from '../../../images/profile-placeholder.jpg';
import '../../styling/AdminAccountManagement.css';

function ManageProfessionals (props) {

    const [practitioners, setPractitioners] = useState(null);
    const [newExperience, setNewExperience] = useState([]);
    const [newEducation, setNewEducation] = useState([]);
    const [edFetchEnd, setEdFetchEnd] = useState(false);
    const [infoFetchEnd, setInfoFetchEnd] = useState(false);

    const [viewProfessionals, setViewProfessionals] = useState(true);
    const [profID, setProfID] = useState(null); //Whatever variable type that is needed will be fine

    const [update, setUpdate] = useState(0);

    const triggerUpdate = () => {
        setUpdate((update + 1) % 16);
    }

    const handleBack = () => {
        setViewProfessionals(true)
        setProfID(null)
    }

    const handleDelete = () => {
        deleteProfessional(profID)
        setViewProfessionals(true)
        setProfID(null)
        triggerUpdate()
    }

    const handleVerify = () => {
        postVerifyProfessional(profID.email)
    }

    const handleUnverify = () => {

    }

    useEffect(async () => {
        let isMounted = true;
        setPractitioners(await getBulkProfessional());
        fetchEducation(isMounted);
        fetchExperience(isMounted);
        return () => {
            isMounted = false;
        };
    }, [update])

    const fetchEducation = async(isMounted) => {
        console.log("EDUCATION 1")
        let data = await getEducation()
        if (isMounted) {
            setEdFetchEnd(true);
            setNewEducation([...data[0]]);
        } 
        else console.log('aborted setPostings on unmounted component')
    }

    const fetchExperience = async(isMounted) => {
        console.log("EXPERIENCE 1")
        let data = await getExperience()
        if (isMounted) {
            setInfoFetchEnd(true);
            setNewExperience([...data[0]]);
        } 
        else console.log('aborted setPostings on unmounted component')
    }

    const VerifiedIcon = (props) => {
        if(profID.Verified==0) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                </div>
            );
        }
        if(profID.Verified==1) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-amber-500 py-1 px-2 rounded text-white text-sm">Pending</span>
                </div>
            );
        }
        if(profID.Verified==2) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                </div>
            );
        }
    }

    if (viewProfessionals === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Professionals</h3>
                </div>
                {(practitioners !== null && practitioners.length > 0) ?
                    <div className="flex flex-col items-center w-full">
                        {[...practitioners].map((e, i) => { 
                            return (
                                <ProfessionalListing account={e}
                                                     setView={setViewProfessionals}
                                                     setID={setProfID}
                                                     key={i}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Professional Accounts</div>
                }

            </div>

        );
    } else {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">{profID.FacName}</h3>
                    <div className="flex items-center mr-5">
                        <div className="grid grid-cols-2">
                            <DeletePopup/>
                            <button onClick={() => handleBack()} className="bg-gray-200 hover:bg-gray-400 outline outline-1 rounded px-3">Back to Accounts</button>
                        </div>
                    </div>
                </div>
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
                                                        src={(profID.ImageAddr!==null) ?  `/api/profile_picture/${profID.ImageAddr}` : placeholder}
                                                        alt="Profile Picture"/>
                                                </label>
                                                
                                            </div>
                                            
                                        </div>
                                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profID.FName} {profID.LName}</h1>
                                        <h3 className="text-gray-600 font-lg text-semibold leading-6">{profID.Specialization}</h3>
                                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                            {profID.Bio}</p>
                                        <ul
                                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                            <VerifyPopup/>
                                            <li className="flex items-center py-3">
                                                <span>CV/Resume</span>
                                                {(profID.ResumeExists)?
                                                <span className="ml-auto" onClick={(e)=>{downloadResume(profID.Email)}}>Resume</span>
                                                :
                                                <>
                                                <label className="bg-green-500 rounded text-white text-md py-1 px-4 ml-auto">No Resume</label>
                                                
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
                                            
                                            
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                                    <div className="px-4 py-2">{profID.FName}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                                    <div className="px-4 py-2">{profID.LName}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">MDCN #</div>
                                                    <div className="px-4 py-2">{profID.MDCN || "None"}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                    <div className="px-4 py-2">{profID.PhoneNumber} {/**not sure how to handle country code formatting */}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Address</div>
                                                    <div className="px-4 py-2">{(profID.Street != null)?`${profID.Street}\n ${profID.City}, ${profID.Country}`: "None"}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Email</div>
                                                    <div className="px-4 py-2">
                                                        <a className="text-blue-800 overflow-clip" href={`mailto:${profID.Email}`}>{profID.Email}</a>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">License #</div>
                                                    <div className="px-4 py-2">{profID.LicenseNumber || "None"}</div>
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
                                                    
                                                    
                                                </div>
                                                <ul className='list-inside space-y-2 mb-4'>
                                                    {(newExperience.length!=0)?newExperience.map((item, i)=> {
                                                        console.log("i: ", i, "item: ", item)
                                                        return(
                                                            <li key={i} className='mb-4'>
                                                                <div className='text-teal-600'>{`${item.Title} at ${item.Company}`}</div>
                                                                <div className='text-gray-500 text-xs'>{`${item.StartDate} to ${item.EndDate}`}</div>
                                                                
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
                                                    
                                                </div>
                                                <ul className='list-inside space-y-2 mb-4'>
                                                    {(newEducation.length!=0)?newEducation.map((item, i)=> {
                                                        return(
                                                            <li key={i} className='mb-4'>
                                                                <div className='text-teal-600'>{`${item.Degree} at ${item.College}`}</div>
                                                                <div className='text-gray-500 text-xs'>{`${item.StartDate} to ${item.EndDate}`}</div>
                                                                
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
    }

    function DeletePopup (props) {
        return (
            <div>
                <Popup trigger={<button className="bg-red-500 hover:bg-red-700 outline outline-1 rounded px-3">Delete Account</button>} modal>
                    {close => (
                        <div className="confirmPop">
                            <div className="header"> Delete Account </div>
                            <div className="w-100% text-center mb-5 mt-2">
                            {' '}
                                Are you sure you want to delete this account?
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

    function VerifyPopup (props) {
        return (
            <div>
                <Popup trigger={
                    <li className="flex items-center py-3" onClick={()=>VerifyPopup()}>
                        <span>Verification Status</span>
                        <span className="ml-auto">
                            <VerifiedIcon />
                        </span>
                    </li>
                } modal>
                    {close => (
                        <div className="confirmPop">
                            <div className="header">Manage Verification</div>
                            <div className="w-100% text-center mb-5 mt-2">
                                {' '}
                                <div className="grid grid-rows-2 gap-5 mt-5">
                                    <div className="grid grid-cols-2 w-100% border-b-1 border-gray-700 text-center m-auto">
                                        <button className="bg-green-500 hover:bg-green-700 outline outline-1 rounded px-3 mr-2" onClick={() => {handleVerify();close()}}>Verify</button>
                                        <button className="bg-red-500 hover:bg-red-700 outline outline-1 rounded px-3 mr-2" onClick={() => {handleUnverify();close()}}>Unverify</button>
                                    </div>
                                    <div className="w-100% border-b-1 border-gray-700 text-center m-auto">
                                        <button className="bg-gray-200 outline outline-1 rounded px-3" onClick={() => {close()}}>Back</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }

} export default ManageProfessionals