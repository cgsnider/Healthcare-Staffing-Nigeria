import React from "react";
import { ShortTextInput } from "./Utility";

import '../../App.css'

function RegisterProf(props) {
    const form = props.data;
    const setForm = props.setData;

    return (
        <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    onInput={(e)=>setForm({...form, fname: e.target.value})}
                />
            </div>
            <div className="md:ml-2">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    onInput={(e)=>setForm({...form, lname: e.target.value})}
                />
            </div>
        </div>

        
        

    )

}

export default RegisterProf;