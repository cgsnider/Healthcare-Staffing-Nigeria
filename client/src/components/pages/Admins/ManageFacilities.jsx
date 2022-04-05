import React, {useEffect, useState} from 'react'

import ProfessionalListing from "../../parts/ProfessionalListing";
import FacilityListing from "../../parts/FacilityListing";

function ManageFacilities (props) {

    const [facilities, setFacilities] = useState(
        [{Email: "NigerianHospital@hosp.org",
            FacName:"Nigerian Hospital",
            Bio: "Short Description",
            PhoneNumber: "123-456-7890",
            Verified: 0, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
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
        }, {
            Email: "NigerianHospital@hosp.org",
            FacName:"Nigerian Hospital",
            Bio: "Short Description",
            PhoneNumber: "123-456-7890",
            Verified: 2, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            image: null,
            Street:'123 Street',
            City:'Ibadan',
            Country:'Nigeria',
            State:'Oyo',
        }]);

    const [viewFacilities, setViewFacilities] = useState(true);
    const [facID, setFacID] = useState(null); //Whatever variable type that is needed will be fine

    const handleBack = () => {
        setViewFacilities(true)
        setFacID(null)
    }

    if (viewFacilities === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Facilities</h3>
                </div>
                <div className="flex flex-col items-center w-full">
                    {[...facilities].map(e => {
                        return (
                            <FacilityListing account={e}
                                                 setView={setViewFacilities}
                                                 setID={setFacID}/>
                        )
                    })}
                </div>
            </div>

        );
    } else {
        return (
            <div className="flex justify-between pt-6 pb-4">
                <h3 className="text-3xl indent-12">Future Account Page</h3>
                <div className="flex items-center mr-4">
                    <button onClick={() => handleBack()} className="bg-gray-200 hover:bg-gray-400 outline outline-1 rounded px-3">Back to Accounts</button>
                </div>
            </div>
        );
    }


} export default ManageFacilities