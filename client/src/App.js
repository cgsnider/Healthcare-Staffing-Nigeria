import './App.css';
import './index.css';

import {BrowserRouter as Router, Routes, Route, Nav} from 'react-router-dom'

import Login from './components/pages/Login';
import Regisration from './components/pages/Regisration';
import Jobs from './components/pages/professionals/Jobs'
import TopBar from './components/parts/TopBar';
//import Elogin from './components/examples/Elogin';

function App() {
  return (
    
    
      <Router>
          <Routes>
            <Route path="/"  element={<Login/>}/>
            <Route path="/register"  element={<Regisration/>} />
            <Route path="/jobs" element={<Jobs/>} />
          </Routes>
      </Router>
  );
}

export default App;
