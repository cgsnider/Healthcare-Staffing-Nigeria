import Popup from "reactjs-popup";
import React from "react";
import {postHireApplicant} from "../../hooks/server";

function Applicant(props) {

    const handleHire = () => {
        postHireApplicant({ApplicantEmail: props.email, PostingTitle: props.postTitle})
    }

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
                        <div className="ml-auto mr-0">
                            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
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
                <Popup trigger = {<button className="h-2/3 px-4 bg-green-500 rounded text-white">Review</button>} modal>
                    {close => (
                        <div>
                            <div className="flex flex-wrap m-5 w-auto">
                                <div className="flex justify-start h-32 min-w-fit">
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
                                        <div className="truncate">{props.number}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="truncate mr-2 font-medium">DoB:</div>
                                        <div className="truncate">{props.dob}</div>
                                    </div>
                                </div>
                                <div className="flex-col ml-16">
                                    <div className="text-xl invisible">placeholder</div>
                                    <div className="invisible">placeholder</div>
                                    <div className="font-medium">Address:</div>
                                    <div>{props.loc}</div>
                                    <div>{props.area}</div>
                                </div>
                            </div>
                            <div className="flex flex-initial flex-wrap m-5 text-center">
                                <div className="basis-1/3"><span className="font-medium">Specialty: </span>{props.specialty}</div>
                                <div className="basis-1/3"><span className="font-medium">MDCN: </span>{props.mdcn}</div>
                                <a href={props.resume} className="truncate text-blue-600 basis-1/3" download>Resume</a>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex-col basis-1/2">
                                    <div className="justify-left text-base mx-5 font-medium">Description:</div>
                                    <div className="flex mx-5">
                                        <div className="overflow-auto">{props.bio}</div>
                                    </div>
                                </div>
                                <div className="flex-col basis-1/2">
                                    <div className="justify-left text-base mx-5 font-medium">Cover Letter:</div>
                                    <div className="flex mx-5">
                                        <div className="overflow-auto">
                                            {(props.cl !== "") ?
                                                (props.cl)
                                                :
                                                ("None Provided")
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-center justify-center gap-2 m-5">
                                <button onClick={() => handleHire()} className="h-2/3 w-1/12 bg-green-500 rounded text-white px-15">Hire</button>
                                <button className="h-2/3 w-1/12 bg-red-500 rounded text-white px-15">Deny</button>
                                <button className="h-2/3 w-1/12 bg-gray-500 rounded text-white px-15" onClick={()=>{close();}}>Close</button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
}

export default Applicant

