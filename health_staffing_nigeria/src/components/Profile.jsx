import React, { useState } from "react";
import './ProfileStyle.css';



//register
function Profile() {
    const [user, setUser] = useState("Organisation");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        facilityName: "",
    });
    

    
    const ProfileDisplay = () =>{
            //insert organisation registration component
         return (
             <div>
                 <div>
                     <div className="Profile-Container" style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"10px 0px"
                     }}>
                        <div className="profile-img">
                             <img src="blankProfilePic.jpeg"></img>
                        </div>


                        <div className="profile-name">
                            <h4>firstName lastName</h4>
                            <div className="profile-info">
                                <h5>Phone Number:</h5>
                            </div>
                            <div className="profile-info">
                                <h5>Email:</h5>
                            </div>
                            <div className="profile-otherinfo">
                                <h5>Professional Information</h5>
                                <p className="professional-box">Field/Specialty: Allergy & Immunology</p>
                            </div>
                            <div className="profile-otherinfo">
                                <h5>Licenses</h5>
                                <p className="professional-box">Sample Licences</p>
                            </div>
                            <div className="profile-otherinfo">
                                <h5>Documents</h5>
                                <p className="professional-box">Sample Resume</p>
                            </div>
                            <div className="profile-ver">
                                <h5>Verification Status: Unverified</h5>
                                <button className="Ver-button">Request Verification</button>

                            </div>
                        </div>
                     </div>
                 </div>
             </div>);
           /* <div class="form">

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
            );*/
    }

    return ( ProfileDisplay());
}

export default Profile;

export class ProfileBuilder {
    constructor(){}
    toJSX() {
        return <Profile />
    }
}