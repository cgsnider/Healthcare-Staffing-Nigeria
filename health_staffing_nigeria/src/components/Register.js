import React, { useState } from "react";

function Register() {
    const [user, setUser] = useState("Organisation");

    const RegisterDisplay = () =>{
        if (user === "Organisation") {
            //insert organisation registration component
        } else {
            //insert practitioner registration component
        }
    }

    return (
        <div>
            <div className="header">{/*insert heading here*/}</div>
            <div className="form-container">
                <p>{user}</p>
                <div className="registerType">
                    <input type="radio" id="OrgRegister" value="Organization" onChange={() => setUser("Organisation")} checked={user==="Organisation"}/>
                    <label for="OrgRegister">Organisation</label>

                    <input type="radio" id="PracRegister" value="Practitioner" onChange={() => setUser("Practitioner")} checked={user==="Practitioner"}/>
                    <label for="PrecRegister">Practitioner</label>
                </div>

                <div className="registerBody">
                    {RegisterDisplay()}
                </div>

                <div className="buttons">
                    <button>Return</button>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Register;