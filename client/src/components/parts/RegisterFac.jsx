import React from "react";
import { ShortTextInput } from "./Utility";

import '../../App.css'

function RegisterFac(props) {

    return (

    <div>
        <div>Facility</div>
        <ShortTextInput label="Facility Name"/>
        <ShortTextInput label="Email Address"/>
        <ShortTextInput label="Password" type="password"/>
        <ShortTextInput label="Confirm Password" type="password"/>
    </div>

    )

}

export default RegisterFac;