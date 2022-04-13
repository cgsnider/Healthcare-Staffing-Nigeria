import React, {useEffect, useState} from 'react'

import ProfessionalListing from "../../parts/ProfessionalListing";
import {getBulkProfessional} from "../../../hooks/server";

function ManageProfessionals (props) {

    const [practitioners, setPractitioners] = useState(null);

    const [viewProfessionals, setViewProfessionals] = useState(true);
    const [profID, setProfID] = useState(null); //Whatever variable type that is needed will be fine

    const handleBack = () => {
        setViewProfessionals(true)
        setProfID(null)
    }

    useEffect(async () => {
        let isMounted = true;
        console.log('USE EFFECT 1');
        setPractitioners(await getBulkProfessional());
        console.log('USE EFFECT 2');
        return () => {
            isMounted = false;
        };
    }, [])

    useEffect(() => {
        console.log("practitioners: ", practitioners)
    }, [practitioners])

    if (viewProfessionals === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Professionals</h3>
                </div>
                {(practitioners !== null && practitioners.length > 0) ?
                    <div className="flex flex-col items-center w-full">
                        {[...practitioners].map(e => { 
                            return (
                                <ProfessionalListing account={e}
                                                     setView={setViewProfessionals}
                                                     setID={setProfID}/>
                            )
                        })}
                    </div>
                    :
                    <div className="mt-4 py-1 flex text-2xl justify-center items-center">No Professional Accounts</div>
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


} export default ManageProfessionals