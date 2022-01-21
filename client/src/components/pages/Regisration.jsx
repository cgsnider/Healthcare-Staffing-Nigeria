
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import RegisterFac from '../parts/RegisterFac';
import RegisterProf from '../parts/RegisterProf';
import TopBar from '../parts/TopBar';
import ToggleSwitch from '../parts/toggle';

import '../styling/Regisration.css'
import '../styling/ToggleSwitch.css'

function Regisration (props){

    const users = ['Professional','Facility'];
    const [user, setUser] = useState(users[0])

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



    return (

            <div className='regisration p-0 m-0'>
                <div class="font-mono bg-gradient-to-br from-cmg-light to-cmg-dark h-screen">
                    <div class="container mx-auto">
                        <div class="flex justify-center px-6 my-0 h-screen">
                            <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                                <div
                                class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bg-logo"
					            ></div>
                                <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">       
                                    <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                                    <div class="flex justify-center mt-6">
                                        <label>Professional</label>
                                        <div class="mx-4" >
                                            <label for="toogleButton" class="flex items-center cursor-pointer" >

                                            <div class="relative" >
                                            <input id="toogleButton" type="checkbox" class="hidden" onClick={toggleUser}/>

                                            <div
                                                class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                                            ></div>

                                            <div
                                                class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                                            ></div>
                                            </div>
                                            </label>

                                        </div>
                                        <label>Organization</label>
                                    </div>
                                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                        {(user === users[0]) ? <RegisterProf/> : <RegisterFac/>}
                                        <div class="mb-4 mt-7">
                                            <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                                Email
                                            </label>
                                            <input
                                                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div class="mb-4 md:flex md:justify-between">
                                            <div class="mb-4 md:mr-2 md:mb-0">
                                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                                    Password
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="password"
                                                    type="password"
                                                    placeholder="******************"
                                                />
                                                <p class="text-xs italic text-red-500 hidden">Please choose a password.</p>
                                            </div>
                                            <div class="md:ml-2">
                                                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="c_password"
                                                    type="password"
                                                    placeholder="******************"
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-6 text-center">
                                            <Link to="/">
                                                <button
                                                    class="w-full px-4 py-2 font-bold text-white bg-cmg-mid rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                                    
                                                >
                                                    Register Account
                                                </button>
                                            </Link>
                                        </div>
                                        <hr class="mb-6 border-t" />
                                        <div class="text-center">
                                            <Link to="/">
                                                <a
                                                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                >
                                                    Forgot Password?
                                                </a>
                                            </Link>
							            </div>
                                        <div class="text-center">
                                            <Link to="/login">
                                                <a
                                                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                                    
                                                >
                                                    Already have an account? Login!
                                                </a>
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