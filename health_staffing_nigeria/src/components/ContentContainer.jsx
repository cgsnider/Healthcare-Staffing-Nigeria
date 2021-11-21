import React from 'react'

import "./ContentContainer.css"

function ContentContainer(props) {
    
    const {content} = props; 

    return (
        <div>
            <div className='divider_top'/>
            {content}
        </div>
    )
}

export default ContentContainer
