import React from 'react'
import "./styling/LeftContainer.css"

function LeftContainer(props) {

    const {content} = props

    return (
        <div className="row">
            <div className='left_frame'>
                {(content && content.toJSX) ? content.toJSX() : <div />}
            </div>           
            <div className='divider' />
        </ div>
    )
}

export default LeftContainer
