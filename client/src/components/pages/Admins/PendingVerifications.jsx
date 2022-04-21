import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


import PendingProfile from "../../parts/PendingProfile";
import placeholder from '../../../images/profile-placeholder.jpg';
import PendingProfileFac from "../../parts/PendingProfileFac";
import { getVerifiedPendingFac, getVerifiedPendingProf } from '../../../hooks/server';

function PendingVerifications(props) {

    const [practitionersView, setPractitionersView] = useState(true);

    const [practitioners, setPractitioners] = useState([]);

    const [facilities, setFacilities] = useState([]);

    const [update, setUpdate] = useState(0);

    const triggerUpdate = () => {
        setUpdate((update + 1) % 16);
    }


    const handleFacilitiesView = () => {
        setPractitionersView(false);
    }

    const handlePractitionersView = () => {
        setPractitionersView(true);
    }

    useEffect(async () => {
        let isMounted = true;
        if (practitionersView) {
            setPractitioners(await getVerifiedPendingProf());
        } else {        
            setFacilities(await getVerifiedPendingFac());
        }
        return () => {
            isMounted = false;
        };
    }, [practitionersView, update]);

    if(practitionersView === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Pending Verifications</h3>
                    <div className="flex items-center mr-4">
                        <button onClick={handlePractitionersView} className={`${practitionersView ? 'bg-gray-400':'bg-gray-200'} hover:bg-gray-400 outline outline-1 rounded-l px-3`}>Practitioners</button>
                        <button onClick={handleFacilitiesView} className={`${practitionersView ? 'bg-gray-200':'bg-gray-400'} hover:bg-gray-400 outline outline-1 rounded-r px-6`}>Facilities</button>
                    </div>
                </div>
                {(practitioners !== null && practitioners.length > 0) ?
                    <div className="flex flex-col items-center h-full">
                        {[...practitioners].map((e, i) => {
                            return (
                                <PendingProfile name={`${e.FName} ${e.LName}`}
                                                image={(e.ImageAddr) ? `/api/profile_picture/${e.ImageAddr}` : placeholder}
                                                specialty={e.Specialization}
                                                resume={e.ResumeExists}
                                                email={e.Email}
                                                number={e.PhoneNumber}
                                                mdcn={e.MDCN}
                                                dob={e.DoB}
                                                bio={e.Bio}
                                                loc={`${e.Street}, ${e.City}, ${e.Country}`}
                                                key={i}
                                                trigger={triggerUpdate}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Professionals Pending Verification</div>
                }
            </div>
        );
    } else {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Pending Verifications</h3>
                    <div className="flex items-center mr-4">
                        <button onClick={handlePractitionersView} className={`${practitionersView ? 'bg-gray-400':'bg-gray-200'} hover:bg-gray-400 outline outline-1 rounded-l px-3`}>Practitioners</button>
                        <button onClick={handleFacilitiesView} className={`${practitionersView ? 'bg-gray-200':'bg-gray-400'} hover:bg-gray-400 outline outline-1 rounded-r px-6`}>Facilities</button>
                    </div>
                </div>
                {(facilities !== null && facilities.length > 0) ?
                    <div className="flex flex-col items-center h-full">
                        {[...facilities].map((e, i) => {
                            return (
                                <PendingProfileFac name={e.FacName}
                                                   image={(e.image) ?  `/api/profile_picture/${e.ImageAddr}` : placeholder}
                                                   street={e.Street}
                                                   loc={`${e.City}, ${e.STATE}, ${e.Country}`}
                                                   email={e.Email}
                                                   number={e.PhoneNumber}
                                                   bio={e.Bio}
                                                   key={i}
                                                   trigger={triggerUpdate}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Facilities Pending Verification</div>
                }

            </div>
        );
    }

}

export default PendingVerifications