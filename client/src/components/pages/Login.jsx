
import React from 'react';

import '../styling/Login.css';
import '../../App.css'
import { Link } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';

function Login(props) {
    
    return (

        <div className='login'> 
            
            <div>Login</div> 
              
            <ShortTextInput label="Username" />
            

            <ShortTextInput label="Password" type="password"/>

            <div>
                <Link to="/">
                    <input type="button" value ="login"/>
                </Link>
                <Link to="/Register">
                    <input type="button" value ="register"/>
                </Link>
            </div>
                    
        </div>

    )

}


export default Login