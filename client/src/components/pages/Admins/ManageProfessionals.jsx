import React, {useEffect, useState} from 'react'
import { getBulkProfessional } from '../../../hooks/server';

import ProfessionalListing from "../../parts/ProfessionalListing";

function ManageProfessionals (props) {

    const [practitioners, setPractitioners] = useState([]);

    const [viewProfessionals, setViewProfessionals] = useState(true);
    const [profID, setProfID] = useState(null); //Whatever variable type that is needed will be fine
    const [update, setUpdate] = useState(0);

    /**
     * Causes any use effect hook to trigger if update its array of variables that the useEffect watches
     */
    const updateTrigger = () => {
        setUpdate((update + 1) % 10);
    }

    const handleBack = () => {
        setViewProfessionals(true)
        setProfID(null)
    }

    useEffect(async () => {
        let isMounted = true;
        console.log()
        if (viewProfessionals == true) {
            setPractitioners(await getBulkProfessional());
        }
        return () => {
            isMounted = false;
        };
    }, [update, viewProfessionals]);

    if (viewProfessionals === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Manage Professionals</h3>
                </div>
                <div className="flex flex-col items-center w-full">
                    {[...practitioners].map(e => {
                        return (
                                <ProfessionalListing account={e}
                                                     setView={setViewProfessionals}
                                                     setID={setProfID}/>
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


} export default ManageProfessionals