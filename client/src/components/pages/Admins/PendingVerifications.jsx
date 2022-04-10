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

    const filter = (e) => {
        return e.Verified === 1;
    }

    const handleFacilitiesView = () => {
        setPractitionersView(false);
    }

    const handlePractitionersView = () => {
        setPractitionersView(true);
    }

    useEffect(async () => {
        let isMounted = true;
        if (practitionersView == true) {
            setPractitioners(await getVerifiedPendingProf());
        } else {
            setFacilities(await getVerifiedPendingFac())
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <div className="flex justify-between pt-6 pb-4">
                <h3 className="text-3xl indent-12">Pending Verifications</h3>
                <div className="flex items-center mr-4">
                    <button onClick={handlePractitionersView} className={`${practitionersView ? 'bg-gray-400':'bg-gray-200'} hover:bg-gray-400 outline outline-1 rounded-l px-3`}>Practitioners</button>
                    <button onClick={handleFacilitiesView} className={`${practitionersView ? 'bg-gray-200':'bg-gray-400'} hover:bg-gray-400 outline outline-1 rounded-r px-6`}>Facilities</button>
                </div>
            </div>
            {practitionersView ?
                <div className="flex flex-col items-center">
                    {[...practitioners].filter(filter).map(e => {
                        return (
                            <PendingProfile name={`${e.FName} ${e.LName}`}
                                            image={(e.image) ? e.image : placeholder}
                                            specialty={e.Specialization}
                                            resume={e.resume}
                                            email={e.Email}
                                            number={e.PhoneNumber}
                                            mdcn={e.MDCN}
                                            dob={e.DoB}
                                            bio={e.Bio}
                                            loc={`${e.Street}, ${e.City}, ${e.Country}`}/>
                        )
                    })}
                </div>
            :
                <div className="flex flex-col items-center">
                    {[...facilities].filter(filter).map(e => {
                        return (
                            <PendingProfileFac name={e.FacName}
                                            image={(e.image) ? e.image : placeholder}
                                            street={e.Street}
                                            loc={`${e.City}, ${e.State}, ${e.Country}`}
                                            email={e.Email}
                                            number={e.PhoneNumber}
                                            bio={e.Bio}/>
                        )
                    })}
                </div>
            }

        </div>

    );
}

export default PendingVerifications