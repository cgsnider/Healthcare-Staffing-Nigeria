import React from 'react'
import Grid from '@mui/material/Grid';
import JobListing, {JobListingBuilder} from './Listing';

export default class JobListGrid extends React.Component {

   
    render() {
        console.log("Look Ma I made it!")
        let jobs = [];
        const jobsFinal = [];
        let numJobs = (this.props.jobItems) ? this.props.jobItems.length : 0;
        for(let i = 0; i < numJobs; i++) {
            jobs.push(<Grid item> {this.props.jobItems[i]} </Grid>);
            if (jobs.length === 3 || i === this.props.numJobs - 1) {
                jobsFinal.push(<Grid container wrap='nowrap' item spacing={10}>{jobs}</Grid>);
                jobs = [];
            }
        }
        return (
                <Grid container spacing={7}>
                    {jobsFinal}
                </Grid>
               );
    }
}

export class JobGridBuilder {

    constructor(postings) {
        this.postings = postings;
    }

    getPostings() {
        return this.postings
    }

    toJSX() {
        if (!this.postings) {
            console.log("NO POSTINGS");
            return <JobListGrid />
        }
        console.log(`toJSX postings: ${this.postings}`)
        let listings = [];
        for (let i = 0; i < this.postings.length; i++) {
            listings.push(this.postings[i].toJSX());
        }

        return <JobListGrid jobItems={listings}/>
    }

    toString() {
        return `Postings: ${this.postings}`;
    }
}