import React from 'react'
import Popup from 'reactjs-popup';
import placeholder from "../../images/profile-placeholder.jpg";

function FacilityListing (props) {

    const VerifiedInfo = () => {
        if(props.account.Verified===0) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                </div>
            );
        }
        if(props.account.Verified===1) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-amber-500 py-1 px-2 rounded text-white text-sm">Pending</span>
                </div>
            );
        }
        if(props.account.Verified===2) {
            return(
                <div className="ml-auto mr-0">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                </div>
            );
        }
    }

    const handleClick = () => {
        props.setView(false)
        props.setID(props.account)
    }

    return (
        <div className="mt-4 flex justify-center w-full">
            <div className="outline outline-1 rounded-md w-1/2 min-w-fit">
                <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                    <div className="flex flex-initial basis-1/3 flex-col justify-between">
                        <div className="truncate">{props.account.FacName}</div>
                        <div className="truncate">{props.account.Street || "Not Provided"}</div>
                        <div className="truncate">{(`${props.account.City}, ${props.account.STATE}, ${props.account.Country}` !== "undefined, undefined, undefined") ? `${props.account.City}, ${props.account.STATE}, ${props.account.Country}` : "Not Provided"}</div>
                    </div>
                    <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                        <div className="items-center">
                            <VerifiedInfo/>
                        </div>
                        <a href={`mailto:${props.account.Email}`} className="truncate">{props.account.Email}</a>
                        <div className="invisible">placeholder</div>
                    </div>
                    <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                        <img className="rounded-full" src={(props.account.image) ? props.image : placeholder}/>
                    </div>
                </div>
            </div>
            <div className="flex items-center ml-5">
                <button onClick={() => handleClick()} className="h-3/4 px-4 bg-gray-500 rounded text-white">Manage</button>
            </div>
        </div>
    );
}

export default FacilityListing