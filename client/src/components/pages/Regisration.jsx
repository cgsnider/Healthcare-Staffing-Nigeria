
import React, {useState} from 'react';
import RegisterFac from '../parts/RegisterFac';

import RegisterProf from '../parts/RegisterProf'


import '../styling/Regisration.css'

function Regisration (props){

    const users = ['Facility', 'Professional'];
    const [user, setUser] = useState(users[0])

    const change_user = (event) => {
        setUser(event.target.value)
    }

    return (

        <div className='regisration'>

            <ul className='reg_radio'>
                {users.map(elem => (
                    <li className='reg_radio_button' key={elem}>
                        <input type="radio" 
                        name="user" 
                        value={elem} 
                        checked={user === elem}
                        onChange={change_user} 
                        /> {" "}
                        {elem}
                    </li>
                ))}
            </ul>
                
            {(user === users[0]) ? <RegisterFac/> : <RegisterProf/>} 

            <input type="button" value="Submit" />
            <input type="button"  value="Cancel" />

        </div>

    )

}

export default Regisration;