
import React from 'react';

import '../styling/Login.css';
import '../../App.css'
import '../../index.css'
import TopBar from '../parts/TopBar';

import { Link } from 'react-router-dom';
import { ShortTextInput } from '../parts/Utility';

function Login(props) {
    
    return (
        <div class="border font-mono">
            <div class="min-h-screen bg-no-repeat bg-cover bg-center bg-logo">
                <div class="flex justify-end opacity-[.95]">
                    <div class="bg-white min-h-screen w-1/2 flex justify-center items-center">
                        <div>
            
                            <form>
                                <div>
                                    <span class="text-sm text-gray-900">Welcome back</span>
                                    <h1 class="text-2xl font-bold">Login to your account</h1>
                                </div>
                                <div class="mt-5">
                                    <label class="block text-md mb-2" for="email">Email</label>
                                    <input class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="password" placeholder="email" />
                                </div>
                                <div class="my-3">
                                    <label class="block text-md mb-2" for="password">Password</label>
                                    <input class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password" />
                                </div>
                                <div class="flex justify-between">
                                    <div>
                                        <input class="cursor-pointer rounded-xl mr-2"  type="checkbox" id="rememberme" />
                                        <label class="text-sm" for="rememberme">Remember Me</label>
                                    </div>
                                    <span class="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                                </div>
                                <div class="">
                                    <Link to="/jobs">
                                        <button class="mt-4 mb-3 w-full bg-cmg-mid hover:bg-green-500 text-white py-2 rounded-md transition duration-100">Login now</button>
                                    </Link>
                                    <Link to="/">
                                        <button class="mt-4 mb-3 w-full bg-gray-900 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">Cancel</button>
                                    </Link>
                                </div>
                            </form>
                            <p class="mt-8"> Dont have an account? 
                                <Link to="/register">
                                    <span class="cursor-pointer text-sm text-blue-600"> Join free today</span>
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