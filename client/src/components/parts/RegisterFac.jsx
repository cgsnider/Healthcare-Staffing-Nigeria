import React from "react";
import { ShortTextInput } from "./Utility";

import '../../App.css'

function RegisterFac(props) {

    return (

        <div class="mb-4 md:mr-2 md:mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="OrgName">
                Organisation Name
            </label>
            <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="OrgName"
                type="text"
                placeholder="Org Name"
            />
        </div>
        
    )

}

export default RegisterFac;