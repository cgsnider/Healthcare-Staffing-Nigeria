import React, {useEffect} from 'react'
import '../styling/JobListings.css'

export default function JobListing (props) {
    let handleApply = () => {
        props.setOpen(true);
        props.setPosting(props.posting)
        console.log(props.posting)
    }
    const handleClick = (e) => {
    }

    return (
        <button onClick={(props.type=='apply')?handleApply:handleClick}>
            <div id='JobList'>
                <img src={props.image} alt="Logo" id="jobImage"/>
                <div className='truncate' id='title'>{props.position}</div>

                <div id='loc'>
                    {(props.location === "undefined, undefined") ?
                        ("Account Unverified") :
                        (props.location)}
                </div>
                <div className='details' id='time'>
                    {(props.shifts === undefined) ?
                        ("Unverified") :
                        (props.shifts)}
                </div>
                <div className='details' id='pay'>
                    {(props.shifts === undefined) ?
                        ("Unverified") :
                        <div>Pay: &#8358; {props.salary} </div>
                    }
                </div>
            </div>
        </button>
    );
}