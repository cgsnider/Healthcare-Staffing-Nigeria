import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import "../styling/TopBar.css"
import logo from "../../images/cmg_logo.png"
/*
*   for now i think this is ok but when validating logged in/on the jobs page
*   replace the login/sign up buttons with some kind of drop menu that will take 
*   the user to the other pages
*/




function TopBar(props) {

    const {options} = (props.options != null) ? options : {
        'options':[{text:'Home', to: '/'}, {text:'About', to: '/'}, {text:'Contact Us', to:'/'}]
    };
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(localStorage.getItem('loggedIn'));
    });

    const logout = () => {
        localStorage.clear()
        setLoggedIn(false);
    }
    let key = 0;

    return (
        <nav>
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
                    {(loggedIn)?
                    <Link to='/jobs'>
                    <div className="hover:text-cmg-light text-gray-700">{'Jobs'}</div>
                    </Link>
                        :
                    <div></div>
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
                    
                    <Link to="/" onClick={logout}>
                        <div href="#" className="bg-green-900 px-4 py-2 rounded text-white hover:bg-cmg-mid text-sm">LOGOUT</div>
                    </Link>
                </div>
                }
            </div>
            </div>
        </nav>
                
    );
}



export default TopBar
