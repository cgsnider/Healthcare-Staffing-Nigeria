import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


import PendingProfile from "../../parts/PendingProfile";
import placeholder from '../../../images/profile-placeholder.jpg';
import PendingProfileFac from "../../parts/PendingProfileFac";

function PendingVerifications(props) {

    const [practitionersView, setPractitionersView] = useState(true);

    const [practitioners, setPractitioners] = useState(
        [{Email: "temp@example.com",
            PhoneNumber: "123-456-1111",
            FName: "John",
            LName: "Williams",
            professionalInfo: "",
            LicenseNumber: "",
            Gender: "Male",
            DoB: "January 01, 2000",
            Specialization: "Cardiologist",
            Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            Verified: 1, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            resume: null,
            image: null,
            MDCN: 123456,
            Street:'1234 Park place',
            City:'Los Angeles',
            Country:'United States',
        }, {
            Email: "temp@example.com",
            PhoneNumber: "123-456-1111",
            FName: "John",
            LName: "Williams",
            professionalInfo: "",
            LicenseNumber: "",
            Gender: "Male",
            DoB: "January 01, 2000",
            Specialization: "Cardiologist",
            Bio: "Short Description",
            Verified: 1, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            resume: '/robots.txt',
            image: null,
            MDCN: 123456,
            Street:'1234 Park place',
            City:'Los Angeles',
            Country:'United States',
        }]);

    const [facilities, setFacilities] = useState(
        [{Email: "NigerianHospital@hosp.org",
            FacName:"Nigerian Hospital",
            Bio: "Short Description",
            PhoneNumber: "123-456-7890",
            Verified: 1, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            image: null,
            Street:"123 Street",
            City:"Ibadan",
            Country:"Nigeria",
            State:"Oyo",
        }, {
            Email: "NigerianHospital@hosp.org",
            FacName:"Nigerian Hospital",
            Bio: "Short Description",
            PhoneNumber: "123-456-7890",
            Verified: 1, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            image: null,
            Street:'123 Street',
            City:'Ibadan',
            Country:'Nigeria',
            State:'Oyo',
        }]);

    const filter = (e) => {
        return e.Verified === 1;
    }

    const handleFacilitiesView = () => {
        setPractitionersView(false);
    }

    const handlePractitionersView = () => {
        setPractitionersView(true);
    }

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