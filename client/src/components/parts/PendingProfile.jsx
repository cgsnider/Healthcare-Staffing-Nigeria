import React from 'react'
import Popup from 'reactjs-popup';
import { downloadResume, postVerifyProfessional } from '../../hooks/server';

function PendingProfile(props) {

    console.log('PENDING PROFILE')

    const handleApprove = () => {
        postVerifyProfessional(props.email);
        window.location.reload(false);
    }

    const resumeHandler = () => {
        console.log('resumeHandler')
        if(props.resume){
            downloadResume(props.email);
        }
    }

    return (
        <div className="mt-4 flex justify-center w-full">
            <div className="outline outline-1 rounded-md w-1/2 min-w-fit">
                <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                    <div className="flex flex-initial basis-1/3 flex-col justify-between">
                        <div className="truncate">{props.name}</div>
                        <div className="truncate">{props.specialty || "No Specialty Provided"}</div>
                        {(props.resume) ? <a onClick={resumeHandler} className="truncate text-blue-600 basis-1/3">Resume</a> :  <div className="basis-1/3">No Resume</div>}
                    </div>
                    <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                        <div className="items-center">
                            <div className="ml-auto mr-0">
                                <span className="bg-amber-500 py-1 px-2 rounded text-white text-sm">Pending</span>
                            </div>
                        </div>
                        <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                        <div className="invisible">placeholder</div>
                    </div>
                    <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                        <img className="rounded-full" src={props.image}/>
                    </div>
                </div>
            </div>
            <div className="flex ml-5 items-center">
                <Popup trigger = {<button className="h-2/3 px-4 bg-green-500 rounded text-white">Review</button>} modal className="overflow-auto">
                        {close => (
                           <div>
                               <div className="flex flex-wrap m-5 w-auto">
                                    <div className="flex justify-left h-28 min-w-fit">
                                        <img className="rounded-full" src={props.image}/> 
                                    </div>
                                    <div className="flex-col min-w-fit">
                                        <div className="truncate text-xl">{props.name}</div>
                                        <div className="invisible">placeholder</div>
                                        <div className="flex">
                                            <div className="truncate mr-2 font-medium">Email:</div>
                                            <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                                        </div>
                                        <div className="flex">
                                            <div className="truncate mr-1 font-medium">Phone No.</div>
                                            <div className="truncate">{props.number || "Not Provided"}</div>
                                        </div>
                                    </div>
                               </div>
                               <div className="flex flex-initial m-5 text-center">
                                    <div className="basis-1/2"><span className="font-medium">DoB:</span> {props.dob || "Not Provided"}</div>
                                    <div className="basis-1/2"><span className="font-medium">Location:</span> {(props.loc !== "null, null, null") ? props.loc : "Not Provided"}</div>
                               </div>
                               <div className="flex flex-initial flex-wrap m-5 text-center">
                                    <div className="basis-1/3">{props.specialty || "No Specialty Provided"}</div>
                                    <div className="basis-1/3"><span className="font-medium">MDCN: </span>{props.mdcn || "Not Provided"}</div>
                                    {(props.resume) ? <a onClick={resumeHandler} className="truncate text-blue-600 basis-1/3">Resume</a> :  <div className="basis-1/3">No Resume</div>}
                               </div>
                               <div className="flex-col">
                                    <div className="justify-left text-base ml-10 font-medium">Description:</div>
                                    <div className="flex">
                                        <div className="invisible basis-1/12">placeholder</div>
                                        <div className="basis-2/3 overflow-auto">{props.bio || "Not Provided"}</div>
                                    </div>
                               </div>
                               <div className="flex text-center justify-center gap-2 m-5">
                                    <button className="h-2/3 px-4 bg-green-500 rounded text-white pr-15" onClick={() => handleApprove() && close()}>Approve</button>
                                    <button className="h-2/3 px-4 bg-red-500 rounded text-white pl-15" onClick={() => window.location.reload(false) && close()}>Decline</button>
                                    <button className="h-2/3 px-4 bg-gray-500 rounded text-white" onClick={()=>{close();}}>Close</button>
                               </div>
                           </div>
                        )}
                </Popup>
            </div>
        </div>
    );
}

export default PendingProfile