import React from "react";
import TopOption from  './TopOption'
import "./TopBar.css";

const TopBar = (options) => {

    return (
        <div className = "rectangle">
                <img src = {'resources/cmg_logo.png'} className="logo"/>
                <ul className = "rows">
                        <TopOption text = "Test 2" action = {() => console.log("Hello There")} />
                        <TopOption text = "Test 3" action = {() => console.log("I Love College")} />
                </ul>
        </div>
    )

}

export default TopBar