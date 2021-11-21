import React, { useState } from 'react'
import './TopOption.css'

export default function TopOption(props) {

    const {text, action} = props;
    
    return (
        <button onClick = {action} className = {'selected'}> {text} </button>
    );
}
