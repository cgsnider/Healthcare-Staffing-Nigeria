import React, {useState} from 'react';
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

    let key = 0;

    return (
        <nav>
            <div class="">
            <div class="flex justify-between h-16 px-10 shadow items-center">
                <div class="flex items-center space-x-8">
                    <Link to="/" >
                    <img class="text-xl lg:text-2xl font-bold cursor-pointer h-16" src={logo}/>
                    </Link>
                <div class="hidden md:flex justify-around space-x-4">
                    {options.map(e => (
                        <Link to={e.to}>
                        <a class="hover:text-cmg-light text-gray-700">{e.text}</a>
                        </Link>
                    ))}
                </div>
                </div>
                <div class="flex space-x-4 items-center">
                    <Link to="/login">
                        <a href="#" class="hover:bg-gray-50 text-gray-800 text-sm outline outline-1 rounded px-4 py-2">LOGIN</a>
                    </Link>
                    <Link to="/register">
                        <a href="#" class="bg-green-900 px-4 py-2 rounded text-white hover:bg-cmg-mid text-sm">SIGNUP</a>
                    </Link>
                </div>
            </div>
            </div>
        </nav>
                
    );
}



export default TopBar
