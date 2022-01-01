import React from "react";
import { ShortTextInput } from "./Utility";

import '../../App.css'

function RegisterProf(props) {

    return (

    <div>
        <ShortTextInput label="First Name"/>
        <ShortTextInput label="Last Name"/>
        <ShortTextInput label="Email Address"/>
        <ShortTextInput label="Password" type="password"/>
        <ShortTextInput label="Confirm Password" type="password"/>

       
    </div>

    )

}

export default RegisterProf;