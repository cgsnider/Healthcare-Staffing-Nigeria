import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Listing from './components/Listing';
import JobListGrid from './components/JobListGrid';
import Register from "./components/Register.js";
import HeaderBar from "./components/TopBar.jsx"
import TopBar from './components/TopBar.jsx';
import Page from './components/Page';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

function App() {
  const mockJob = <Listing link="http://localhost:3000" image='resources/cmg_logo.png' position="ER Physician" location="Generic, Nigeria" shifts="12 Hour Shifts" salary="$70,000"/>;
  const jobList = [];
  for (let i = 0; i < 9; i++) {
    jobList.push(mockJob);
  }
  return (
      <div className="App">
          <Page />
      </div>
  );
}

export default App;
