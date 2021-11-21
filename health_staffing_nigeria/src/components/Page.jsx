import React from 'react'
import LeftContainer from './LeftContainer'
import TopBar from './TopBar'
import './Page.css'
import ContentContainer from './ContentContainer'


function Page() {
    return (
        <div>
            <TopBar />
            <LeftContainer />
            {/* <div className='black_box'/> */}
            <ContentContainer />
        </div>
    )
}

export default Page
