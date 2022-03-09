import React from 'react';
import TopBar from '../parts/TopBar';


import '../styling/Login.css';
import '../../App.css'
import '../../index.css'

import { Link, useNavigate } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';
import  { LoginUser, ResetPassword } from '../../hooks/cognito';
import { useState } from 'react';
import { postProfessionalProfileData } from '../../hooks/server';

export default function Profile(props) {
    const [updatedProfile, setUpdatedProfile] = useState(localStorage.getItem("userInfo") ? 
    JSON.parse(localStorage.getItem("userInfo"))
    : {email: "", phoneNumber: "", name: "", professionalInfo: "", licesnse: ""})
    const post = () => {
        postProfessionalProfileData(updatedProfile)
    }

    const saveToCache = () => {
        localStorage.setItem("userInfo", JSON.stringify(updatedProfile))
    }
    return (
        <div>
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
                <label className="block text-md mb-2" htmlFor="licesnse">License</label>
                <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"  name="licesnse" value={updatedProfile.licesnse} placeholder="Licesnse" onInput={(e) => setUpdatedProfile({...updatedProfile, licesnse: e.target.value})}/>
            </div>

            <button className="mt-4 mb-3 w-full bg-cmg-mid hover:bg-green-500 text-white py-2 rounded-md transition duration-100"  onClick={saveToCache }>Save</button>

        </div>
    );
}