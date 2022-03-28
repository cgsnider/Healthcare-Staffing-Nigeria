import React from 'react'
import '../styling/AppListing.css'

export default class ApplicationListing extends React.Component {
    render() {
        return (
            <div id='JobList2'>
                <img src={this.props.image} alt="Logo" id="jobImage"/>
                <div className='truncate' id='title'>{this.props.position}</div>

                <div id='loc'>
                    {(this.props.location === "undefined, undefined") ?
                        ("Account Unverified") :
                        (this.props.location)}
                </div>
                <div className='details' id='time'>
                    {(this.props.shifts === undefined) ?
                        ("Unverified") :
                        (this.props.shifts)}
                </div>
                <div className='details' id='pay'>
                    {(this.props.shifts === undefined) ?
                        ("Unverified") :
                        <div>Pay: &#8358; {this.props.salary} </div>
                    }
                </div>
                <div className='details' id='status'>
                    <div>Status: TODO</div>
                </div>
            </div>
        );
    }
}