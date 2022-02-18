import React from 'react';
import TopBar from '../parts/TopBar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../styling/Profile.css';
import '../../App.css'
import '../../index.css'


import { useState, useEffect } from 'react';
import {Drop2 , Drop} from '../parts/Drop';
import placeholder from '../../images/profile-placeholder.jpg';
export default function Profile(props) {
    const [profileInfo, setProfileInfo] = useState(
        {email: "temp@example.com", 
        phoneNumber: "123-456-1111", 
        name: "John Williams", 
        professionalInfo: "", 
        license: "", 
        gender: "Male", 
        address: "12334 Park Place, CA US", 
        DoB: "January 01, 2000", 
        specialization: "Cardiologist",
        desc: "short description",
        verified: true,
        resume: null,
    })

    useEffect( ()=> {
        let isMounted = true;
        fetchUserProfileData();
        return() => {
            isMounted = false
        }
    }, []);
    const fetchUserProfileData = () => {

    }

    const addExperience = (e) => {

    }
    const addEducation = (e) => {

    }
    const ApplyVerification =(e) => {

    }
    return (
    <div className="bg-gray-100">
        <div className="w-full text-white bg-main-color">
            <div className="container mx-auto p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <div>
                                    <img className="h-auto w-full mx-auto rounded-full border-2 hover:cursor-pointer hover:border-black"
                                        src={placeholder}
                                        alt="Profile Picture"/>
                                </div>
                                
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profileInfo.name}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">{profileInfo.specialization}</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                {profileInfo.desc}</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Varification Status</span>
                                    <span className="ml-auto">
                                        {(profileInfo.verified)?
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                                        :
                                        <div className="ml-auto mr-0">
                                            <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                                        </div>
                                        }
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>CV/Resume</span>
                                    {(profileInfo.resume!==null)?
                                    <span className="ml-auto">Resume</span>
                                    :
                                    <button className="bg-green-500 rounded text-white text-md py-1 px-4 ml-auto">Upload</button>
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
                                <button className="bg-green-500 rounded text-white text-sm py-1 px-3 ml-auto">Edit</button>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                        <div className="px-4 py-2">{profileInfo.name.split(' ')[0]}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                        <div className="px-4 py-2">{profileInfo.name.split(' ')[1]}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                        <div className="px-4 py-2">{profileInfo.gender}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2">{profileInfo.phoneNumber /**not sure how to handle country code formatting */}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Current Address</div>
                                        <div className="px-4 py-2">{(profileInfo.address || "None")}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href={`mailto:${profileInfo.email}`}>{profileInfo.email}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                        <div className="px-4 py-2">{profileInfo.DoB}</div>
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
                                        <button className="bg-green-500 rounded text-white py-1 text-sm px-2" onClick={addExperience}>Add</button>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-gray-900">None</div>
                                        </li>
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
                                        <Popup trigger={<button className="bg-green-500 rounded text-white py-1 text-sm px-2">Add</button>} position='right center' modal>
                                            <Drop2 />
                                        </Popup>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-gray-900">None</div>
                                        </li>
                                    </ul>
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
/**
 * <div>
            
            <Drop2 />
             <div className="mt-5">
                <label className="block text-md mb-2" htmlFor="name">Name</label>
                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" value={updatedProfile.name} name="name" placeholder="name" onInput={ (e) => setUpdatedProfile({...updatedProfile, name: e.target.value}) }/>
            </div>
            <div className="mt-5">
                <label className="block text-md mb-2" htmlFor="email">Email</label>
                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" value={updatedProfile.email} type="email" name="email" placeholder="email" onInput={ (e) => setUpdatedProfile({...updatedProfile, email: e.target.value}) }/>
            </div>
            <div className="my-3">
                <label className="block text-md mb-2" htmlFor="phoneNumber">Phone Number</label>
                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" value={updatedProfile.phoneNumber} name="phoneNumber" placeholder="Phone Number" onInput={(e) => setUpdatedProfile({...updatedProfile, phoneNumber: e.target.value})}/>
            </div>
            <div className="my-3">
                <label className="block text-md mb-2" htmlFor="professionalInfo">Professional Info</label>
                <textarea className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" value={updatedProfile.professionalInfo} name="professionalInfo" placeholder="Professional Info" onInput={(e) => setUpdatedProfile({...updatedProfile, professionalInfo: e.target.value})}/>
            </div>
           
            <div className="my-3">
                <label className="block text-md mb-2" htmlFor="licesnse">Licesnse</label>
                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"  name="licesnse" value={updatedProfile.licesnse} placeholder="Licesnse" onInput={(e) => setUpdatedProfile({...updatedProfile, licesnse: e.target.value})}/>
            </div>

            <button className="mt-4 mb-3 w-full bg-cmg-mid hover:bg-green-500 text-white py-2 rounded-md transition duration-100"  onClick={saveToCache }>Save</button>

        </div>
 */