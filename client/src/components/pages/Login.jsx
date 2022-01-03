
import React from 'react';

import '../styling/Login.css';
import '../../App.css'
import TopBar from '../parts/TopBar';

import { Link } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';

function Login(props) {
    
    return (
        <>
        <TopBar/>
        
        <div className='login'> 
            
            <div className='login_title'>Login</div> 
              
            <ShortTextInput label="Username" className="login_entry"/>
            

            <ShortTextInput label="Password" type="password"/>

            <div>
                <Link to="/jobs">
                    <input type="button" value ="login" className='button_primary'/>
                </Link>
                <Link to="/Register">
                    <input type="button" value ="register" className='button_primary'/>
                </Link>
            </div>
                    
        </div>
        </>

    )

}


export default Login