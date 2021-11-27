import React, { useState } from "react";
import './RegStyle.css';
import UserPool from "../model/UserPool"



function Register() {
    const [user, setUser] = useState("Organisation");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        facilityName: "",
    });

    const onSubmit = (event) => {
        UserPool.signUp(formData.email, formData.password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
        });
    };

    const RegisterDisplay = () =>{
        if (user === "Practitioner") {
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
        } else {
            //insert practitioner registration component
            return (
                <div class="form">
                    <div class="form-group">
                        <label>Facility Name: </label>
                        <input type="text" value = {formData.facilityName} onChange={(e) => {
                            setFormData({ ...formData, facilityName: e.target.value});
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
    }

    const checkEmpty = () => {
        if (formData.email=="" || formData.password=="" || formData.confPassword=="") {
            return false;
        }
        if (user == "Organisation") {
            if(formData.facilityName == "") {
                return false;
            } 
        } else {
            if (formData.firstName=="" || formData.lastName=="") {
                return false;
            }
        }
        return true;
    }

    const passwordMatch = () => {
        if (formData.password != formData.confPassword) {
            return false;
        }
        return true;
    }

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

export default Register;

export class RegsiterBuilder {
    constructor(){}
    toJSX() {
        return <Register />
    }
}