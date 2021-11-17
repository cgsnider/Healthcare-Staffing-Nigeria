import React from 'react'
import Grid from '@mui/material/Grid';

export default class JobListGrid extends React.Component {
    render() {
        let jobs = [];
        const jobsFinal = [];
        for(let i = 0; i < this.props.numJobs; i++) {
            jobs.push(<Grid item> {this.props.jobItems[i]} </Grid>);
            if (jobs.length === 3 || i === this.props.numJobs - 1) {
                jobsFinal.push(<Grid container wrap='nowrap' item spacing={40}>{jobs}</Grid>);
                jobs = [];
            }
        }
        return (
                <Grid container spacing={43}>
                    {jobsFinal}
                </Grid>
               );
    }
}
