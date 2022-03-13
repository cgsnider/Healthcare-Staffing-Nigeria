
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  { LoginUser, RegisterUser } from '../../hooks/cognito';
import Popup from 'reactjs-popup';
import RegisterFac from '../parts/RegisterFac';
import RegisterProf from '../parts/RegisterProf';
import TopBar from '../parts/TopBar';
import ToggleSwitch from '../parts/toggle';

import '../styling/Regisration.css'
import '../styling/ToggleSwitch.css'

function Regisration (props){

    const register_admin = props.admin;

    const users = ['Professional','Facility'];
    const [ttOpen, setOpen] = useState(false);
    const [user, setUser] = useState(users[0])
    const [formData, setData] = useState({
        fname:'',
        lname:'',
        org:'',
        email:'',
        password:'',
        confpassword:'',
    })
    const navigate = useNavigate();

    const change_user = (event) => {
        setUser(event.target.value)
    }

    const toggleUser = (event) =>{
        if (user === users[0]){
            setUser(users[1]);
        } else {
            setUser(users[0]);
        }
        
    }
    const register = (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.password === formData.confpassword){
            console.log('password match')
            const reg_data = {
                name: (user == users[0]) ? `${formData.fname}$${formData.lname}` : formData.org,
                type: (register_admin) ? "Admin" : user,
                email: formData.email,
                password: formData.password
            }
            RegisterUser(reg_data, regFail, regSuccess).catch(err=>console.log(err))
            //get password policy known {uppercase, symbol, number}
        } else {
            console.log('passwords didnt match')
        }
        
    }

    const regFail = () => {
        console.log('registration Fail')
    }
    const regSuccess = () => {
        console.log('registration successful');
        let userl = {email: formData.email, password: formData.password}
        console.log(userl);
        LoginUser(userl, loginNo, loginYes).catch(err=>console.log(err))
        
    }
    const loginNo = () => {
        console.log('registered but not login');
        navigate('/login', {replace: true})
    }
    const loginYes = () => {
        console.log('registered and login');
        navigate('/jobs', {replace: true})
    }

    const Tooltip = (props) => (
        <div>
            <Popup open={props.open} position='right center' tooltip>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </Popup>
        </div>
    )
    return (

            <div className='regisration p-0 m-0'>
                <div className="font-mono bg-gradient-to-br from-cmg-light to-cmg-dark h-screen">
                    <div className="container mx-auto">
                        <div className="flex justify-center px-6 my-0 h-screen">
                            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                                <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bg-logo"
					            ></div>
                                <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">       
                                    <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                                    <div className="flex justify-center mt-6">
                                        <label>Professional</label>
                                        <div className="mx-4" >
                                            <label htmlFor="toogleButton" className="flex items-center cursor-pointer" >

                                            <div className="relative" >
                                            <input id="toogleButton" type="checkbox" className="hidden" onClick={toggleUser}/>

                                            <div
                                                className="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                                            ></div>

                                            <div
                                                className="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                                            ></div>
                                            </div>
                                            </label>

                                        </div>
                                        <label>Organization</label>
                                    </div>
                                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                        {(user === users[0]) ? <RegisterProf data={formData} setData={setData}/> : <RegisterFac data={formData} setData={setData}/>}
                                        <div className="mb-4 mt-7">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                                onInput={(e)=>setData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="mb-4 md:flex md:justify-between">
                                            <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                                    Password
                                                </label>
                                                <Popup trigger={<input
                                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                                id="password"
                                                                type="password"
                                                                placeholder="******************"
                                                                onInput={(e)=>setData({...formData, password: e.target.value})}
                                                                onFocus={(e)=>setOpen(true)}
                                                                onBlur={(e)=>setOpen(false)}
                                                                />}
                                                    position='right center' 
                                                    on={'focus'}
                                                    role='tooltip'
                                                    closeOnDocumentClick>
                                                    <ul className='list-disc list-inside leading-4 font-mono'>
                                                        <li>8+ characters</li>
                                                        <li>uppercase letter</li>
                                                        <li>lowercase letter</li>
                                                        <li>number</li>
                                                        <li>special character</li>
                                                    </ul>
                                                </Popup>
                                                
                                                
                                                <p className="text-xs italic text-red-500 hidden">Please choose a password.</p>
                                            </div>
                                            <div className="md:ml-2">
                                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="c_password"
                                                    type="password"
                                                    placeholder="******************"
                                                    onInput={(e)=>setData({...formData, confpassword: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6 text-center">
                                            <Link to="/" onClick={register}>
                                                <button
                                                    className="w-full px-4 py-2 font-bold text-white bg-cmg-mid rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                                    
                                                >
                                                    Register Account
                                                </button>
                                            </Link>
                                        </div>
                                        <hr className="mb-6 border-t" />
                                        <div className="text-center">
                                            <Link to="/">
                                                <div
                                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                >
                                                    Forgot Password?
                                                </div>
                                            </Link>
							            </div>
                                        <div className="text-center">
                                            <Link to="/login" >
                                                <div
                                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                    
                                                >
                                                    Already have an account? Login!
                                                </div>
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>         
                </div>







                    
                


            </div>

    );


}

export default Regisration;