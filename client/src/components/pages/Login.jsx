
import React from 'react';

import '../styling/Login.css';
import '../../App.css'
import '../../index.css'
import TopBar from '../parts/TopBar';

import { Link } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';

function Login(props) {
    
    return (
        <>
        <TopBar/>
        
        <div className='login'> 
            
            <div className='login_title hover:text-blue-500'>Login</div> 
              
            <ShortTextInput label="Username" className="login_entry"/>
            

            <ShortTextInput label="Password" type="password"/>

            <div>
                <Link to="/jobs">
                    <button value ="login" className='button_primary outline outline-1'>Login</button>
                </Link>
                <Link to="/Register">
                    <button type="button" value ="register" className='button_primary outline outline-1'>Register</button>
                </Link>
            </div>
                    
        </div>
        </>

    )

}


export default Login