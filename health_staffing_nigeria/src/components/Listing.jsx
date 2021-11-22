import React from 'react'
import './ListingStyles.css'

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

export class JobListingBuilder {

    constructor(link, image, position, location, shifts, salary) {
        this.link = link
        this.image = image;
        this.position = position;
        this.location = location;
        this.shifts = shifts;
        this.salary = salary;
    }
    
    toJSX() {
        return <JobListing link={this.link} image={this.image} position={this.position} location={this.location} shifts={this.shifts} salary={this.salary}/>;
    }

    toString() {
        return `image: ${this.image}, position: ${this.positions}, location: ${this.location}, shifts: ${this.shifts}, salary: ${this.salary}`
    }

}