import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@github/details-menu-element';
import "../styling/TopBar.css";
import logo from "../../images/cmg_logo.png";
/*
*   for now i think this is ok but when validating logged in/on the jobs page
*   replace the login/sign up buttons with some kind of drop menu that will take 
*   the user to the other pages
*
*   to add more page references in dropdown menu just add a button with same attributes
*   and navigate onclick to new page
*
*   replace 'menu' with something else possibly image or username?
*/




function TopBar(props) {
    const navigate = useNavigate();
    const {options} = (props.options != null) ? options : {
        'options':[{text:'Home', to: '/'}, {text:'About', to: '/about'}, {text:'Contact Us', to:'/'}]
    };
    const [loggedIn, setLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        if(!loggedIn){
            setLoggedIn(localStorage.getItem('loggedIn'));
        } else {
            //console.log(localStorage.getItem('type'))
            setUserType(localStorage.getItem('type'))
        }
        
    });

    const logout = () => {
        localStorage.clear()
        setLoggedIn(false);
        navigate('/', {replace: true});
    }
    let key = 0;
    
    const MenuOptions = (props) => {
        if (userType === 'Professional') {
            return (
                <>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/user')}>Profile</button>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/jobs')}>Jobs</button>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/applications')}>Applications</button>

                </>
            );
        }
        if (userType === 'Facility') {
            return (
                <>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/facility')}>Profile</button>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/newPosting')}>Create Posting</button>{/** link to page to post new job openings */}
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/myPostings')}>My Postings</button> {/** link to view facilities current active postings */}

                </>
            )
        }
        if (userType === 'Admin') {
            return (
                <>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/pendingVerifications')}>Pending Verifications</button>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/manage/professionals')}>Manage Professionals</button>
                    <button className='menu_item' type='button' role='menuitem' onClick={()=>navigate('/manage/facilities')}>Manage Facilities</button>
                </>
            )
        }
        return (<div>no userType</div>)
    }

    return (
        <nav className="bg-white">
            <div className="">
            <div className="flex justify-between h-16 px-10 shadow items-center">
                <div className="flex items-center space-x-8">
                    <Link to="/" >
                    <img className="text-xl lg:text-2xl font-bold cursor-pointer h-16" src={logo}/>
                    </Link>
                <div className="hidden md:flex justify-around space-x-4">
                    {options.map(e => (
                        <Link to={e.to} key={key++}>
                        <div className="hover:text-cmg-light text-gray-700">{e.text}</div>
                        </Link>
                    ))
                    }
                </div>
                </div>
                {(!loggedIn)? 
                
                <div className="flex space-x-4 items-center">
                    <Link to="/login">
                        <div href="#" className="hover:bg-gray-50 text-gray-800 text-sm outline outline-1 rounded px-4 py-2">LOGIN</div>
                    </Link>
                    <Link to="/register">
                        <div href="#" className="bg-green-900 px-4 py-2 rounded text-white hover:bg-cmg-mid text-sm">SIGNUP</div>
                    </Link>
                </div>
                :
                <div className="flex space-x-4 items-center">
                    
                    <details className='details-overlay details-reset'>
                        <summary>
                            <div className='inline-block mr-1'>Menu</div>
                            <span className='dropdown_caret'></span>
                        </summary>
                        <details-menu role="menu" class='dropdown_menu bg-white py-0.5'>
                            <MenuOptions />
                            <div role='none' className='block h-0 my-1.5 border-b-2 '></div>
                            <button className='menu_item' type='button' role='menuitem' onClick={logout}>Sign Out</button>
                        </details-menu>
                    </details>
                </div>
                }
            </div>
            </div>
        </nav>
                
    );
}



export default TopBar
