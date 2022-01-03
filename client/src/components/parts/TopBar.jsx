import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import "../styling/TopBar.css"

function TopBar(props) {

    const {options} = (props.options != null) ? options : {
        'options':[{text:'home', to: '/'}, {text:'about', to: '/'}]
    };

    let key = 0;

    return (
        <div className='topBar'>
            <img src = {'resources/cmg_logo.png'} className="logo" alt=""/>
            <ul className='topbar_options'>
                {options.map(e => (
                    <li key={key++}>
                        <TxtButton text={e.text} to={e.to} sideEffect={e.sideEffect}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function TxtButton(props) {

    const {text, to, sideEffect} = props;

    const [color, setColor] = useState('txt_button_option_base unselected');

    const mouseHover = () => {
        setColor('txt_button_option_base txt_button_selected');
    }

    const mouseOff = () => {
        setColor('txt_button_option_base txt_button_unselected');
    }

    const mouseClick = () => {
        setColor('txt_button_option_base txt_button_clicked');
        sideEffect()
    }
    
    return (
        <Link to={to}>
            <input type="button" onClick = {mouseClick} onMouseOver={mouseHover} onMouseOut={mouseOff} className = {color} value={text}/>
        </Link>
    );
}

export default TopBar
