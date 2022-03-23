import React, {useState} from 'react'
import placeholder from "../../../images/profile-placeholder.jpg";
import Applicant from "../../parts/Applicant";
import {Link} from "react-router-dom";

function ViewApplicants(props) {

    const [practitioners, setPractitioners] = useState(
        [{Email: "temp@example.com",
            PhoneNumber: "123-456-1111",
            FName: "John",
            LName: "Williams",
            professionalInfo: "",
            LicenseNumber: "",
            Gender: "Male",
            DoB: "January 01, 2000",
            Specialization: "Cardiologist",
            Bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            Verified: 2, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            resume: null,
            image: null,
            MDCN: 123456,
            Street:'1234 Park place',
            City:'Los Angeles',
            Country:'United States',
        }, {
            Email: "temp@example.com",
            PhoneNumber: "123-456-1111",
            FName: "John",
            LName: "Williams",
            professionalInfo: "",
            LicenseNumber: "",
            Gender: "Male",
            DoB: "January 01, 2000",
            Specialization: "Cardiologist",
            Bio: "Short Description",
            Verified: 2, //-1=neverLoggedIn  0=unverified, 1=pending, 2=verified
            resume: '/robots.txt',
            image: null,
            MDCN: 123456,
            Street:'1234 Park place',
            City:'Los Angeles',
            Country:'United States',
        }]);

    return (
        <div>
            <div className="flex justify-between pt-6 pb-4">
                <h3 className="text-3xl indent-12">Applicants</h3>
                <div className="flex items-center mr-4">
                    <Link to="/jobs">
                        <div href="#" className="bg-gray-200 hover:bg-gray-400 outline outline-1 rounded px-3">Back to Postings</div>
                    </Link>
                </div>
            </div>
                <div className="flex flex-col items-center">
                    {[...practitioners].map(e => {
                        return (
                            <Applicant name={`${e.FName} ${e.LName}`}
                                            image={(e.image) ? e.image : placeholder}
                                            specialty={e.Specialization}
                                            resume={e.resume}
                                            email={e.Email}
                                            number={e.PhoneNumber}
                                            mdcn={e.MDCN}
                                            dob={e.DoB}
                                            bio={e.Bio}
                                            loc={`${e.Street}, ${e.City}, ${e.Country}`}/>
                        )
                    })}
                </div>
        </div>

    );
}

export default ViewApplicants