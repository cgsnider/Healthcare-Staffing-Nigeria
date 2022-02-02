
import React, { useState } from 'react';

import '../styling/Login.css';
import '../../App.css'
import '../../index.css'
import TopBar from '../parts/TopBar';

import { Link, useNavigate } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';
import  { LoginUser } from '../../hooks/cognito';

function Login(props) {
    const [input, setInput] = useState({email:'', password:''});
    const navigate = useNavigate();

    const Log = (e) => {
        e.preventDefault();
        LoginUser(input, loginFail, loginSuccess).catch(err=>console.log("promise failed with error "+err));
    }

    const loginFail = () => {
        alert('username or password incorrect');
    }
    const loginSuccess = () => {
        navigate('/jobs', {replace: true})
    }
    return (
        <div className="border font-mono">
            <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-logo">
                <div className="flex justify-end opacity-[.95]">
                    <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
                        <div>
            
                            <form>
                                <div>
                                    <span className="text-sm text-gray-900">Welcome Back!</span>
                                    <h1 className="text-2xl font-bold">Login to your account</h1>
                                </div>
                                <div className="mt-5">
                                    <label className="block text-md mb-2" htmlFor="email">Email</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" placeholder="email" onInput={ (e) => setInput({...input, email: e.target.value})}/>
                                </div>
                                <div className="my-3">
                                    <label className="block text-md mb-2" htmlFor="password">Password</label>
                                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password" onInput={ (e) => setInput({...input, password: e.target.value})}/>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <input className="cursor-pointer rounded-xl mr-2"  type="checkbox" id="rememberme" />
                                        <label className="text-sm" htmlFor="rememberme">Remember Me</label>
                                    </div>
                                    <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                                </div>
                                <div className="">
                                    <Link to="/jobs" onClick={Log}>
                                        <button className="mt-4 mb-3 w-full bg-cmg-mid hover:bg-green-500 text-white py-2 rounded-md transition duration-100" >Login now</button>
                                    </Link>
                                    <Link to="/">
                                        <button className="mt-4 mb-3 w-full bg-gray-900 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">Cancel</button>
                                    </Link>
                                </div>
                            </form>
                            <p className="mt-8"> Dont have an account? 
                                <Link to="/register">
                                    <span className="cursor-pointer text-sm text-blue-600"> Join free today</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Login