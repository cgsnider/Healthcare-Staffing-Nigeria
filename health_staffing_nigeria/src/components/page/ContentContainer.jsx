import React from 'react'

import "./styling/ContentContainer.css"

function ContentContainer(props) {
    
    const {content} = props; 

    console.log(`content: ${content}`);

    return (
        <div>
            <div className='divider_top'/>
            <div className='content_box'>
            {(content && content.toJSX) ? content.toJSX(): <div />}
            </div>
        </div>
    )
}

export default ContentContainer
