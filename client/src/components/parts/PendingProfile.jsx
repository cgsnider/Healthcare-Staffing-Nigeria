import React from 'react'
import placeholder from '../../images/profile-placeholder.jpg';

function PendingProfile() {
    return (
        <div className="mt-4 outline outline-1 rounded-md w-1/2 min-w-fit">
            <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                <div className="flex flex-initial basis-1/3 flex-col justify-between">
                    <div className="truncate">Dr. Example Name</div>
                    <div className="truncate">Specialty</div>
                    <div className="truncate">Resume</div>
                </div>
                <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                    <div className="truncate">Unverified</div>
                    <div className="truncate">ExampleEmail@example.com</div>
                    <div className="invisible">placeholder</div>
                </div>
                <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                    <img className="rounded-full" src={placeholder}/>
                </div>
            </div>
        </div>
    );
}

export default PendingProfile