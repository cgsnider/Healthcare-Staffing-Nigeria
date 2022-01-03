import React , {useState} from "react"
import '../styling/Utility.css'

//Possible props: label, onChange, type
function ShortTextInput(props) {

    const {label, onChange, type} = props

    return (
        <>
            <label className='small_txt_labels'>
                {label}
            </label>
            <div>
                <input type={(type !== 'password') ? "text" : type} onChange={onChange}/>
            </div>
        </>
    )

}

function TxtButton(props) {

    const {text, action} = props;

    const [color, setColor] = useState('option_base unselected');

    const mouseHover = () => {
        setColor('txt_button_option_base txt_button_selected');
    }

    const mouseOff = () => {
        setColor('txt_button_option_base txt_button_unselected');
    }

    const mouseClick = () => {
        setColor('txt_button_option_base txt_button_clicked');
        action()
    }
    
    return (
        <button onClick = {mouseClick} onMouseOver={mouseHover} onMouseOut={mouseOff} className = {color}> {text} </button>
    );
}

export {ShortTextInput, TxtButton};