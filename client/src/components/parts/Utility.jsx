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


export {ShortTextInput};