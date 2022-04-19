import React, {useState, useEffect} from 'react'
import placeholder from "../../../images/profile-placeholder.jpg";
import Applicant from "../../parts/Applicant";
import {getApplicants, getHiredPostings} from "../../../hooks/server.js";
import HiredApplicant from "../../parts/HiredApplicant";

function ManageApplicants(props) {

    const [practitioners, setPractitioners] = useState([]);

    useEffect( async () => {
        let mounted = true;
        if (mounted) {
            setPractitioners(await getHiredPostings())
        }
        return () => mounted = false
    }, []);

    if (practitioners.length === 0) {
        return (
            <div className='flex justify-center'>
                No Hired Applicants
            </div>
        )
    }
    return (
        <div>
            <div className="flex justify-between pt-6 pb-4">
                <h3 className="text-3xl indent-12">Hired Applicants</h3>
            </div>
            <div className="flex flex-col items-center">
                {[...practitioners].map((e, i) => { console.log("APPLICANT 2: ", e)
                    return (
                        <HiredApplicant name={`${e.FName} ${e.LName}`}
                                   image={(e.ImageAddr) ? `/api/profile_picture/${e.ImageAddr}` : placeholder}
                                   specialty={e.Specialization}
                                   email={e.ProfEmail}
                                   postTitle={e.Title}
                                   facName={e.FacName}/>
                    )
                })}
            </div>
        </div>
    );
}

export default ManageApplicants