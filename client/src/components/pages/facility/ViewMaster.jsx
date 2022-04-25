import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ViewApplicants from "./ViewApplicants";
import { getFacilityPostings } from '../../../hooks/server.js'
import CircleLoader from 'react-spinners/CircleLoader';
function ViewMaster(props) {
    const [viewPosts, setViewPosts] = useState(true);
    const [postID, setPostID] = useState(-1); //Whatever variable type that is needed will be fine
    const [fetching, setFetching] = useState(true);
    const [postings, setPostings] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        let mounted = true;
        if (mounted) {
            fetchFacilityPostings()
        }
    }, []);

    const fetchFacilityPostings = async() => {
        let res = await getFacilityPostings()
        .catch(err=>console.error(err))
        setFetching(false);
        setPostings(res);
    }

    const handleClick = (e) => {
        setPostID(e)
        setViewPosts(false)
    }

    const handleBack = () => {
        setViewPosts(true)
        setPostID(-1)
    }
    const PostingsList = (props) => {
        const handleEdit = (e, elem) => {
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
            let title = e.target.getAttribute('data-title');
            navigate('/editPosting?post='+title);
        }
        if (fetching) {
            return (
                <div className='ml-10'>
                    <CircleLoader loading={fetching} color={'#3a8c3c'}/>
                </div>
            
            )
        }
        return (
            postings.map( (e, i) => {
                return (
                    <div key={i}>
                        <div className='grid grid-cols-10 border-y-2 p-4 hover:bg-gray-100 hover:cursor-pointer' onClick={() => props.setPostID(e.Title)}>
                            <div className='col-span-7 text-xl text-cmg-mid'>{e.Title}</div>
                            <div className='col-span-1'>{e.Category}</div>
                            <div className='col-span-1'>{e.Salary}</div>
                            <div className='col-span-1 text-blue-600 justify-self-center px-3 text-lg hover:underline' onClick={(event) => handleEdit(event)} data-title={e.Title}>edit</div>
                        </div>
                    </div>
                )
            })
        )
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
                <div className='mx-2'>
                    <PostingsList setPostID={handleClick}/>
                </div>
                
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