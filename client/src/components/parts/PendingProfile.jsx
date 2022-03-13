import React from 'react'
import Popup from 'reactjs-popup';

function PendingProfile(props) {
    return (
        <div className="mt-4 flex justify-center w-full">
            <div className="outline outline-1 rounded-md w-1/2 min-w-fit">
                <div className="flex content-center justify-between text-sm w-full px-2 py-1">
                    <div className="flex flex-initial basis-1/3 flex-col justify-between">
                        <div className="truncate">{props.name}</div>
                        <div className="truncate">{props.specialty}</div>
                        <a href={props.resume} className="truncate text-blue-600" download>Resume</a>
                    </div>
                    <div className="flex flex-initial basis-1/3 flex-col justify-between text-center">
                        <div className="truncate">Unverified</div>
                        <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                        <div className="invisible">placeholder</div>
                    </div>
                    <div className="flex basis-1/3 flex-initial justify-end h-28 min-w-fit">
                        <img className="rounded-full" src={props.image}/>
                    </div>
                </div>
            </div>
            <div className="flex ml-5 items-center">



                <Popup trigger = {<button className="h-2/3 px-4 bg-green-500 rounded text-white">Review</button>} modal>
                        {close => (
                           <div>
                               <div className="flex m-5 w-auto">
                                    <div className="flex justify-left h-28 min-w-fit">
                                        <img className="rounded-full" src={props.image}/> 
                                    </div>
                                    <div className="flex-col min-w-fit">
                                        <div className="truncate text-xl">{props.name}</div>
                                        <div className="invisible">placeholder</div>
                                        <div className="flex">
                                            <div className="truncate mr-2">Email:</div>
                                            <a href={`mailto:${props.email}`} className="truncate">{props.email}</a>
                                        </div>
                                        <div className="flex">
                                            <div className="truncate mr-1">Phone No.</div>
                                            <div className="truncate">{props.number}</div>
                                        </div>
                                    </div>
                               </div>
                               <div className="flex flex-initial m-5 text-center">
                                    <div className="basis-1/2">DoB: {props.dob}</div>
                                    <div className="basis-1/2">Location: {props.loc}</div>
                               </div>
                               <div className="flex flex-initial m-5 text-center">
                                    <div className="basis-1/3">{props.specialty}</div>
                                    <div className="basis-1/3">MDCN:{props.mdcn}</div>
                                    <a href={props.resume} className="truncate text-blue-600 basis-1/3" download>Resume</a>
                               </div>
                               <div className="flex-col">
                                    <div className="justify-left text-lg ml-10">Description:</div>
                                    <div className="flex">
                                        <div className="invisible basis-1/12">placeholder</div>
                                        <div className="basis-2/3">{props.bio}</div>
                                    </div>
                               </div>
                               <div className="flex text-center justify-center gap-2 m-5">
                                    <button className="h-2/3 px-4 bg-green-500 rounded text-white pr-15">Approve</button>
                                    <button className="h-2/3 px-4 bg-red-500 rounded text-white pl-15">Decline</button>
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