import React from 'react'
import '../styling/JobListings.css'

export default class JobListing extends React.Component {
    render() {
        return (
            <button>
                <div id='JobList'>
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
                </div>
            </button>
        );
    }
}