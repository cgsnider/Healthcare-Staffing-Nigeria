import './App.css';

import {BrowserRouter as Router, Routes, Route, Nav} from 'react-router-dom'

import Login from './components/pages/Login';
import Regisration from './components/pages/Regisration';
import Prof_JobHub from './components/pages/professionals/Prof_JobHub'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/"  element={<Login/>}/>
          <Route path="/register"  element={<Regisration/>} />
          <Route path="/jobs" element={<Prof_JobHub/>} />
        </Routes>
    </Router>
  );
}

export default App;
