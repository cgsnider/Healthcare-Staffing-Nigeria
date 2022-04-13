import React, {useEffect, useState} from 'react'

import FacilityListing from "../../parts/FacilityListing";
import {getBulkFacilities} from "../../../hooks/server";

function ManageFacilities (props) {

    const [facilities, setFacilities] = useState(null);

    const [viewFacilities, setViewFacilities] = useState(true);
    const [facID, setFacID] = useState(null); //Whatever variable type that is needed will be fine

    const handleBack = () => {
        setViewFacilities(true)
        setFacID(null)
    }

    useEffect(async () => {
        let isMounted = true;
        setFacilities(await getBulkFacilities());
        return () => {
            isMounted = false;
        };
    }, [])

    if (viewFacilities === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Facilities</h3>
                </div>
                {(facilities !== null && facilities.length > 0) ?
                    <div className="flex flex-col items-center w-full">
                        {[...facilities].map(e => {
                            return (
                                <FacilityListing account={e}
                                                 setView={setViewFacilities}
                                                 setID={setFacID}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Facility Accounts</div>
                }
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