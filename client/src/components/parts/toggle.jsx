import React from 'react'
import '../styling/ToggleSwitch.css'
function ToggleSwitch(props){

    return (
            <div class="flex justify-center">
                <label for="toogleButton" class="flex items-center cursor-pointer">

                <div class="relative">
                <input id="toogleButton" type="checkbox" class="hidden" />

                <div
                    class="toggle-path bg-gray-200 w-9 h-5 rounded-full shadow-inner"
                ></div>

                <div
                    class="toggle-circle absolute w-3.5 h-3.5 bg-white rounded-full shadow inset-y-0 left-0"
                ></div>
                </div>
            </label>

            </div>
    );
}

export default ToggleSwitch;