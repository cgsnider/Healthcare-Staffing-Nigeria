import React from 'react'
import '../styling/Prof_JobListing.css'

export default class JobListing extends React.Component {
    render() {
        return (
            <a href={this.props.link}>
                <div id='JobList'>
                    <img src={this.props.image} alt="Logo" id="jobImage"/>
                    <div id='title'>{this.props.position}</div>
                    <div id='loc'>{this.props.location}</div>
                    <div className='details' id='time'>{this.props.shifts}</div>
                    <div className='details' id='pay'>Pay: {this.props.salary}</div>
                </div>
            </a>
        );
    }
}