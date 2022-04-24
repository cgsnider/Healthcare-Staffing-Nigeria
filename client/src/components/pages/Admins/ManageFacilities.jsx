import React, {useEffect, useState} from 'react'
import Popup from 'reactjs-popup';
import FacilityListing from "../../parts/FacilityListing";
import {getBulkFacilities, postVerifyFacility, deleteFacility, postUnverifyFacility} from "../../../hooks/server";
import placeholder from '../../../images/profile-placeholder.jpg';
import '../../styling/ConfirmationPopup.css';

function ManageFacilities (props) {

    const [facilities, setFacilities] = useState(null);

    const [viewFacilities, setViewFacilities] = useState(true);
    const [facID, setFacID] = useState(null); //Whatever variable type that is needed will be fine

    const [update, setUpdate] = useState(0);

    const triggerUpdate = () => {
        setUpdate((update + 1) % 16);
    }

    const handleBack = () => {
        setViewFacilities(true)
        setFacID(null)
    }

    const handleDelete = () => {
        deleteFacility(facID)
        setViewFacilities(true)
        setFacID(null)
        triggerUpdate()
    }

    const handleVerify = () => {
        postVerifyFacility(facID.email);
    }

    const handleUnverify = () => {
        postUnverifyFacility(facID.email);
    }

    useEffect(async () => {
        let isMounted = true;
        console.log("BULK: ", await getBulkFacilities());
        setFacilities(await getBulkFacilities());
        return () => {
            isMounted = false;
        };
    }, [update])

    useEffect(() => {
        console.log(facilities)
    }, [facilities])

    const VerifiedIcon = (props) => {
        if(facID.Verified==0) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                </div>
            );
        }
        if(facID.Verified==1) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-amber-500 py-1 px-2 rounded text-white text-sm">Pending</span>
                </div>
            );
        }
        if(facID.Verified==2) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                </div>
            );
        }
    }

    if (viewFacilities === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Facilities</h3>
                </div>
                {(facilities !== null && facilities.length > 0) ?
                    <div className="flex flex-col items-center w-full">
                        {[...facilities].map((e, i) => {
                            return (
                                <FacilityListing account={e}
                                                 setView={setViewFacilities}
                                                 setID={setFacID}
                                                 key={i}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Facility Accounts</div>
                }
            </div>

        );
    } else {
        return (
            <div className="bg-gray-100 border-2 h-full min-h-screen">
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">{facID.FacName}</h3>
                    <div className="flex items-center mr-5">
                        <div className="grid grid-cols-2">
                            <DeletePopup/>
                            <button onClick={() => handleBack()} className="bg-gray-200 hover:bg-gray-400 outline outline-1 rounded px-3">Back to Accounts</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-100 border-2 h-full min-h-screen">
                        <div className="w-full text-white bg-main-color">
                            <div className="container mx-auto p-5">
                                <div className="md:flex no-wrap md:-mx-2 ">
                                    <div className="w-full md:w-3/12 md:mx-2">
                                        <div className="bg-white p-3 border-t-4 border-green-400">
                                            <div className="image overflow-hidden">
                                                <div>
                                                    <label htmlFor='pfp-upload' >
                                                        {console.log("facID.ImageAddr: ", facID.ImageAddr)}
                                                        <img className="h-auto w-full mx-auto"
                                                            src={(facID.ImageAddr) ?  `/api/profile_picture/${facID.ImageAddr}` : placeholder}
                                                            alt="Profile Picture"/>
                                                    </label>
                                                    
                                                </div>
                                                
                                            </div>
                                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{facID.FacName}</h1>
                                            <h3 className="text-gray-600 font-lg text-semibold leading-6">{}</h3>
                                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                                {facID.Bio}</p>
                                            <VerifyPopup/>
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
                                                
                                            </div>
                                            <div className="text-gray-700">
                                                <div className="grid md:grid-cols-2 text-sm">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Facility Name</div>
                                                        <div className="px-4 py-2">{facID.FacName}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Contact Person</div>
                                                        <div className="px-4 py-2">{facID.CName}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Address</div>
                                                        <div className="px-4 py-2">{(facID.Street==null)? "None" : `${facID.Street}\n ${facID.City}, ${facID.Country}`}</div>
                                                        {console.log("Prof: ", facID)}
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                        <div className="px-4 py-2">{facID.PhoneNumber} {/**not sure how to handle country code formatting */}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold"></div>
                                                        <div className="px-4 py-2">{}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Email</div>
                                                        <div className="px-4 py-2 overflow-auto">
                                                            <a className="text-blue-800 overflow-clip" href={`mailto:${facID.Email}`}>{facID.Email}</a>
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
                                        <div className="bg-white p-3 shadow-sm rounded-sm">
                                            <div className="grid grid-rows-2 text-black">
                                                <div className="px-4 py-2 font-semibold ">Description</div>
                                                <div className="px-8 py-2">{facID.Descript}</div>
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
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm" onClick={()=>VerifyPopup()}>
                        <li className="flex items-center py-3">
                            <span>Verification Status</span>
                            <span className="ml-auto">
                                <VerifiedIcon />
                            </span>
                        </li>
                    </ul>
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
    
} export default ManageFacilities