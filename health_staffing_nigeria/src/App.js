//import logo from './logo.svg';
import './App.css';
//import Login from './components/Login';
import Listing from './components/Listing';
import JobListGrid from './components/JobListGrid';

function App() {
  const mockJob = <Listing link="http://localhost:3000" image='Resources/mediumnew.png' position="ER Physician" location="Generic, Nigeria" shifts="12 Hour Shifts" salary="$70,000"/>;
  const jobList = [];
  for (let i = 0; i < 9; i++) {
    jobList.push(mockJob);
  }
  return (
      <div className="App">
          {
              //<JobListGrid jobItems={jobList} numJobs={jobList.length}/>
          }
          <Register />
      </div>
  );
}

export default App;
