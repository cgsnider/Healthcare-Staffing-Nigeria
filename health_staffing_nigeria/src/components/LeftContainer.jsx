import React from 'react'
import "./LeftContainer.css"

function LeftContainer(props) {

    const {content} = props

    return (
        <div className="row">
            <div className='left_frame'>
                {content}
            </div>           
            <div className='divider' />
        </ div>
    )
}

export default LeftContainer
