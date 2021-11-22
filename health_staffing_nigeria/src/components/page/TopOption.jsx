import React, { useState } from 'react'
import './styling/TopOption.css'

export default function TopOption(props) {

    const {text, action} = props;

    const [color, setColor] = useState('option_base unselected');

    const mouseHover = () => {
        setColor('option_base selected');
    }

    const mouseOff = () => {
        setColor('option_base unselected');
    }

    const mouseClick = () => {
        setColor('option_base clicked');
        action()
    }
    
    return (
        <button onClick = {mouseClick} onMouseOver={mouseHover} onMouseOut={mouseOff} className = {color}> {text} </button>
    );
}
