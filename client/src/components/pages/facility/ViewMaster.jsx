import React, {useState} from 'react'
import ViewApplicants from "./ViewApplicants";

function ViewMaster(props) {
    const [viewPosts, setViewPosts] = useState(true);
    const [postID, setPostID] = useState(-1); //Whatever variable type that is needed will be fine

    const handleClick = (e) => {
        setPostID(e)
        setViewPosts(false)
    }

    const handleBack = () => {
        setViewPosts(true)
        setPostID(-1)
    }

    if (viewPosts === true) {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Posted Jobs</h3>
                </div>
                {
                    // Postings View "page" component goes here instead of button.
                    // We will probably have to pass in the constants and their sets,
                    // That was they can be changed when a specific posting is clicked on.
                    // Other option is just to have the list of postings and its corresponding
                    // functionality in this function so that passing is not required.
                }
                <button onClick={() => handleClick(5)}>Future Posting</button>
            </div>
        );
    } else {
        return (
            <div>
                <div className="flex justify-between pt-6 pb-4">
                    <h3 className="text-3xl indent-12">Job Applicants</h3>
                    <div className="flex items-center mr-4">
                        <button onClick={() => handleBack()} className="bg-gray-200 hover:bg-gray-400 outline outline-1 rounded px-3">Back to Postings</button>
                    </div>
                </div>
                <ViewApplicants postingID={postID}/>
            </div>
        )
    }
}

export default ViewMaster