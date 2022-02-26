import React from "react";
import { ShortTextInput } from "./Utility";

import '../../App.css'

function RegisterFac(props) {
    const form = props.data;
    const setForm = props.setData;

    return (

        <div className="mb-4 md:mr-2 md:mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="OrgName">
                Organization Name
            </label>
            <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="OrgName"
                type="text"
                placeholder="Org Name"
                onInput={(e)=>setForm({...form, org: e.target.value})}
            />
        </div>
        
    )

}

export default RegisterFac;