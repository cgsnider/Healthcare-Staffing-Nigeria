import './App.css';
import './index.css';

import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Login from './components/pages/Login';
import Regisration from './components/pages/Regisration';
import Jobs from './components/pages/professionals/Jobs'
import TopBar from './components/parts/TopBar';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile.jsx';
import PendingVerifications from './components/pages/Admins/PendingVerifications.jsx';
//import Drop from './components/pages/Drop';
//import Elogin from './components/examples/Elogin';

const App = () => {
  const LayoutsWithNavbar = () => {
    return (
      <>
        <div className="z-40 sticky top-0">
          <TopBar/>
        </div>
        
  
        <Outlet /> 
        
        {/* You can add a footer here */}
      </>
    );
  }

  return (
    <Router>
      <Routes>
        {/** pages with navbar at top under this route */}
        <Route path="/" element={<LayoutsWithNavbar/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/jobs" element={<Jobs/>} />
          <Route path='/user' element={<Profile/>} />
          <Route path='/pendingVerifications' element={<PendingVerifications/>} />
        </Route>

        {/**pages without navbar go here */}
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Regisration/>} />
        
      </Routes>
    </Router>
  )

  
}

export default App;
