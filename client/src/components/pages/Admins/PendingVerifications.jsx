import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import PendingProfile from "../../parts/PendingProfile";

function PendingVerifications(props) {

    return (
        <div>
            <div className="flex justify-between pt-6 pb-4">
                <h3 className="text-3xl indent-12">Pending Verifications</h3>
                <div className="flex items-center mr-4">
                    <button className="bg-gray-200 outline outline-1 rounded-l px-3">Practitioners</button>
                    <button className="bg-gray-200 outline outline-1 rounded-r px-6">Facilities</button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <PendingProfile/>
            </div>


        </div>

    );
}

export default PendingVerifications