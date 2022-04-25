import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import { downloadResume, postVerifyProfessional, rejectProfessional } from '../../hooks/server';

function PendingProfile(props) {

    const [checked, setChecked] = useState(false);
    const [accept, setAccept] = useState(false);
    const [reject, setReject] = useState(false);
    const [message, setMessage] = useState('');

    const handleCheck = () => {
        setChecked(!checked);
    }

    const handleAccept = () => {
        setAccept(!accept);
    }

    const handleReject = () => {
        setReject(!reject);
    }

    const handleSubmit = async () => {
        if (accept){
            await postVerifyProfessional({ProfEmail: props.email, Message: message});
            props.trigger();
        }
        if (reject){
            rejectProfessional({ProfEmail: props.email, Message: message});
        }
    }

    const reset = () => {
        setChecked(false);
        setAccept(false);
        setReject(false);
        setMessage('');
    }


    const resumeHandler = () => {
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
                                    <div className="basis-1/2"><span className="font-medium">License #:</span> {props.license}</div>
                                    <div className="basis-1/2"><span className="font-medium">Location:</span> {(props.loc !== "null, null, null") ? props.loc : "Not Provided"}</div>
                               </div>
                               <div className="flex flex-initial flex-wrap m-5 text-center">
                                    <div className="basis-1/3">Specialization: {props.specialty || "No Specialty Provided"}</div>
                                    <div className="basis-1/3"><span className="font-medium">MDCN: </span>{props.mdcn || "Not Provided"}</div>
                                    {(props.resume) ? <a onClick={resumeHandler} className="truncate text-blue-600 basis-1/3">Resume</a> :  <div className="basis-1/3">No Resume</div>}
                               </div>
                               <div className="flex-col">
                                    <div className="justify-left text-base ml-10 font-medium">Description:</div>
                                    <div className="flex">
                                        <div className="invisible basis-1/12">placeholder</div>
                                        <div className="basis-2/3 overflow-auto">{(props.bio) ? props.bio : "Not Provided"}</div>
                                    </div>
                               </div>
                               <div className="flex text-center gap-2 m-5 flex-wrap">
                                    <input type='checkbox' id='accept' className='hidden' onChange={()=>{handleCheck();handleAccept();}}/>
                                    <label htmlFor='accept' className={`h-2/3 px-4 pb-1 bg-green-500 rounded text-white ${reject? "hidden": ""} hover:cursor-pointer`} >Approve<span className='text-xl pl-1 font-semibold'>{checked? "-":"+"}</span> </label>
                                    
                                    <input type='checkbox' id='deny' className='hidden' onChange={()=>{handleCheck();handleReject();}}/>
                                    <label htmlFor='deny' className={`h-2/3 px-4 pb-1 bg-red-500 rounded text-white ${accept? "hidden": ""} hover:cursor-pointer`} >Decline<span className='text-xl pl-1 font-semibold'>{checked? "-":"+"}</span> </label>
                                    <div className={`${checked? "": "hidden"} basis-full grow`} >
                                        
                                        <label htmlFor='reason' className='font-semibold text-xs'>Add a Note to the User</label>
                                        <span className='pl-0.5 text-xs'>(Optional)</span>
                                        
                                        <textarea 
                                            className="w-full h-3/4 p-2 rounded border-2 focus:ring-0 focus:border-cmg-mid focus:border-2"
                                            id="reason" 
                                            rows="2" 
                                            cols="50" 
                                            placeholder={accept?"Reason for Approval": "Reason for Declining"}
                                            onChange={(e)=>{setMessage(e.target.value)}}
                                            value={message}
                                        >
                                        </textarea>
                                    </div>
                                    <button className={`h-2/3 px-4 py-1 ml-auto mr-0 mt-auto bg-gray-500 rounded text-white disabled:opacity-50 ${checked? "":"hidden"}`} onClick={()=>{reset();close();} }>Cancel</button>
                                    <button className={`h-2/3 px-4 py-1 ${checked? "":"ml-auto"} mr-0 bg-cmg-mid disabled:bg-gray-500 rounded text-white disabled:opacity-50`} onClick={()=>{handleSubmit();reset();close();} } disabled={!checked}>{checked? `Send ${accept? "Approve":"Decline" } Decision`:"Next: Finalize"}</button>
                               </div>
                           </div>
                        )}
                </Popup>
            </div>
        </div>
    );
}

export default PendingProfile