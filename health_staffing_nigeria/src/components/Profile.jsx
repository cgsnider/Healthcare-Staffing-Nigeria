import React, { useState } from "react";
import './RegStyle.css';



//register
function Profile() {
    //const [user, setUser] = useState("Organisation");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        facilityName: "",
    });
    

    //
    const ProfileDisplay = () =>{
            //insert organisation registration component
         return (
            <div class="form">

                <div class="form-group">
                    <label>Name: </label>
                    <input type="text" placeholder="First Name" value = {formData.firstName} onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value});
                    }} />

                    <input type="text" placeholder="Last Name" value = {formData.lastName} onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value});
                    }} />
                </div>


                <div class="form-group">
                    <label>Email: </label>
                    <input type="text" value = {formData.email} onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value});
                    }} />
                </div>

                <div class="form-group">
                    <label>Password: </label>
                    <input type="password" value={formData.password} onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value});
                    }} />
                </div>

                <div class="form-group">
                    <label>Confirm Password: </label>
                    <input type="password" value={formData.confPassword} onChange={(e) => {
                        setFormData({ ...formData, confPassword: e.target.value});
                    }} />
                </div>
            </div>
            );
    }
/*
    return (
        <div>
            <div className="form-container">
                <div className="registerType">
                    <input type="radio" id="OrgRegister" value="Organization" 
                    onChange={() => {
                        setUser("Organisation"); 
                        setFormData({ ...formData, password: "", confPassword: ""});
                    }} 
                    checked={user==="Organisation"}/>

                    <label for="OrgRegister">Organisation</label>

                    <input type="radio" id="PracRegister" value="Practitioner" 
                    onChange={() => {
                        setUser("Practitioner");
                        setFormData({ ...formData, password: "", confPassword: ""});
                    }} 
                    checked={user==="Practitioner"}/>
                    <label for="PrecRegister">Practitioner</label>
                </div>

                <div className="registerBody">
                    {RegisterDisplay()}
                </div>

                <div className="buttons">
                    <button>Return</button>
                    <button onClick={()=> {
                        if(checkEmpty() && passwordMatch()) {
                            onSubmit()
                            alert("account created");
                            console.log(formData);
                        }
                    }}>Submit</button>
                </div>
            </div>
        </div>
    );
}
*/ return (ProfileDisplay());

}

export default Profile;

export class ProfileBuilder {
    constructor(){}
    toJSX() {
        return <Profile />
    }
}