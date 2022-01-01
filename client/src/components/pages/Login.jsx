
import React from 'react';

import '../styling/Login.css';
import '../../App.css'

function Login(props) {
    
    return (

        <div className='login'> 
            
            <div>Login</div> 
              
            
            <div className='input_labels_txt'>
                Username
            </div>
            <input type="text" />
            

            <div className='input_labels_txt'>
                Password
            </div>
            <input type="text" />

            <div>
            <input type="button" value ="login"/>

            <input type="button" value ="register"/>
            </div>
                    
        </div>

    )

}


export default Login