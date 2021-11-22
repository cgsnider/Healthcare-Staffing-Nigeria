import React from "react";
import TopOption from  './TopOption'
import "./styling/TopBar.css";

const TopBar = (props) => {

    const {options} = props;

    return (
        <div className = "rectangle">
                <img src = {'resources/cmg_logo.png'} className="logo"/>
                <ul className = 'list_options'>
                    {processOptions(options)}
                </ul>
        </div>
    )

}

function processOptions(options) {
    if (!options) { 
        return null;
    }
    console.log(options)
    let processed = []
    let key = 99
    for (let i = 0; i < options.length; i++) {
        if (i != 0) {
            processed.push(<div className='divider_dot' key={key++}> · </ div>);
        }
        processed.push(options[i]);
    }
    return processed;
    
}

export default TopBar