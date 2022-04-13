import React, {useState, useEffect} from 'react'
import placeholder from "../../../images/profile-placeholder.jpg";
import Applicant from "../../parts/Applicant";
import { getApplicants } from "../../../hooks/server.js";

function ViewApplicants(props) {

    const [practitioners, setPractitioners] = useState([]);
        useEffect( async () => {
            let mounted = true;
            if (mounted) {
                setPractitioners(await getApplicants(props.postingID))
            }
            return () => mounted = false
        }, []);

        const fetchApplicants = async() => {
            let res = await getApplicants(props.postingID)
            console.log(res)
        }
    if (practitioners.length === 0) {
        return (
            <div className='flex justify-center'>
                No Applicants
            </div>
        )
    }
    return (
        <div>
            <div className="flex flex-col items-center">
                {[...practitioners].map((e, i) => {
                    return (
                        <Applicant name={`${e.FName} ${e.LName}`}
                                        image={(e.ImageAddr) ? `/api/profile_picture/${e.ImageAddr}` : placeholder}
                                        specialty={e.Specialization}
                                        resume={e.resume}
                                        email={e.Email}
                                        number={e.PhoneNumber}
                                        mdcn={e.MDCN}
                                        dob={e.DoB}
                                        bio={e.Bio}
                                        cl={e.CoverLetter}
                                        loc={e.Street}
                                        area={`${e.City}, ${e.Country}`}
                                        postTitle={e.PostingTitle}
                                        key={i}/>
                    )
                })}
            </div>
        </div>
    );
}

export default ViewApplicants