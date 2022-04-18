import './App.css';
import './index.css';

import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Login from './components/pages/Login';
import Regisration from './components/pages/Regisration';
import Jobs from './components/pages/professionals/Jobs'
import TopBar from './components/parts/TopBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Profile from './components/pages/Profile.jsx';
import PendingVerifications from './components/pages/Admins/PendingVerifications.jsx';
import ViewApplications from "./components/pages/professionals/ViewApplications";
import Fac_Profile from './components/pages/facility/Fac_Profile';
import EditPost from './components/pages/facility/EditPost';
import ViewApplicants from "./components/pages/facility/ViewApplicants";
import ViewMaster from "./components/pages/facility/ViewMaster";
import CreatePosting from "./components/pages/facility/CreatePosting";
import ManageProfessionals from "./components/pages/Admins/ManageProfessionals";
import ManageFacilities from "./components/pages/Admins/ManageFacilities";
import PostList from "./components/pages/facility/PostList";
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
//register_admin
  return (
    <Router>
      <Routes>
        {/** pages with navbar at top under this route */}
        <Route path="/" element={<LayoutsWithNavbar/>}>
          <Route path="/" element={<Home/>}/>
          <Route path='/about' element={<About/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path='/user' element={<Profile/>} />
          <Route path ='/facility' element = {<Fac_Profile/>} />
          <Route path='/pendingVerifications' element={<PendingVerifications/>} />
          <Route path='/applications' element={<ViewApplications/>}/>
          <Route path='/facilityManage' element={<ViewMaster/>}/>
          <Route path='/newPosting' element={<CreatePosting/>}/>
          <Route path='/postings' element={<PostList/>}/>

          <Route path='/manage_professionals' element={<ManageProfessionals/>}/>
          <Route path='/manage_facilities' element={<ManageFacilities/>}/>

          
          <Route path='/editPosting' element={<EditPost />}/>
        </Route>

        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Regisration admin={false}/>} />
        <Route path="/register_admin"  element={<Regisration admin={true}/>} />
        
      </Routes>
    </Router>
  )

  
}

export default App;
