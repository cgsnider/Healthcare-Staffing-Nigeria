import React, {useState} from 'react'
import placeholder from "../../../images/profile-placeholder.jpg";
import Applicant from "../../parts/Applicant";

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
            Street:'1234 Park Place',
            City:'Los Angeles',
            Country:'United States',
            CoverLetter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
            PostingTitle: "",
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
            Street:'1234 Park Place',
            City:'Los Angeles',
            Country:'United States',
            CoverLetter: "",
            PostingTitle: "",
        }]);

    return (
        <div>
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
                                        cl={e.CoverLetter}
                                        loc={e.Street}
                                        area={`${e.City}, ${e.Country}`}
                                        postTitle={e.PostingTitle}/>
                    )
                })}
            </div>
        </div>
    );
}

export default ViewApplicants