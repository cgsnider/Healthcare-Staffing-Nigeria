import React, {useState} from 'react'

import Login from './components/Login';
import Listing, { JobListingBuilder } from './components/Listing';
import JobListGrid, {JobGridBuilder} from './components/JobListGrid';
import Register, { RegsiterBuilder } from "./components/Register";
import TopBar from './components/page/TopBar';
import LeftContainer from './components/page/LeftContainer';
import ContentContainer from './components/page/ContentContainer';
import TopOption from './components/page/TopOption';


/*

- How to use -

If you want to load your component into the main content section:

You need to add a builder class in your code (see JobListGrid file for an example).
This builder class needs to store all of the data that you want to pass as props to your component
IMPORTANT: your builder class needs to contain a toJSX() method. This methods should return the JSX component that is to be displayed.

The you can pass your component to the ContentContainer prop called content and it should dsiplay.

*/



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
  
  //change this to whatever content to start with or to test ur component
  const StartContent = new RegsiterBuilder(); 
  const [options, setOptions] = useState(login_topOptions);
  const [leftContent, setLeftContent] = useState(null);
  const [mainContent, setMainContent] = useState(StartContent)


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
