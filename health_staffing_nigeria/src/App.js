import React, {useState} from 'react'

import Login from './components/Login';
import Listing, { JobListingBuilder } from './components/Listing';
import JobListGrid, {JobGridBuilder} from './components/JobListGrid';
import Register from "./components/Register.js";
import TopBar from './components/page/TopBar';
import LeftContainer from './components/page/LeftContainer';
import ContentContainer from './components/page/ContentContainer';
import TopOption from './components/page/TopOption';




function App(props) {

  const login_topOptions = [
    <TopOption text={'Home'} action={() => genJobPage()} key={0}/>,
    <TopOption text={'About'} action={() => console.log("To About")} key={1}/>,
  ];
  
  const prof_topOptions = [
    <TopOption text={'Home'} action={() => console.log("To Home")} key={0}/>,
    <TopOption text={'About'} action={() => console.log("To About")} key={1}/>,
    <TopOption text={'Applications'} action={() => console.log("To Applications")} key={3}/>,
    <TopOption text={'Profile'} action={() => console.log("To Profiles")} key={4}/>,
  ];
  
  

  const [options, setOptions] = useState(login_topOptions);
  const [leftContent, setLeftContent] = useState(null);
  const [mainContent, setMainContent] = useState(<Login />)


  const genJobPage = () => {
    console.log("GenJobPage");
    const postings = fetchJobs();
    setOptions(prof_topOptions);
    setLeftContent(null);
    setMainContent(new JobGridBuilder(postings));
    console.log(`Main Content: ${mainContent}`);
  }

  const genLoginPage = () => { 
    setOptions(login_topOptions);
    setLeftContent(null);
    setMainContent(null);
  }


  return (
      <div>
          <TopBar options={options}/>
          <LeftContainer content={leftContent}/>
          <ContentContainer content={mainContent}/>
      
      </div>
  )
}




function fetchJobs() {

  const postings = [];
  const mockJob = new JobListingBuilder("http://localhost:3000",'resources/cmg_logo.png', "ER Physician", "Generic, Nigeria", "12 Hour Shifts", "$70,000");

  for (let i = 0; i < 7; i++) {
    postings.push(mockJob);
  }
  
  // console.log(`output ${output}`);
  return postings;
}

export default App;
