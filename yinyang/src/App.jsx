import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PostSkill from './pages/PostSkill.jsx';
import NotFound from './pages/NotFound.jsx';
import MainLayout from "./layouts/MainLayout.jsx";
import ExploreSkills from './pages/ExploreSkills.jsx';
import SkillDetails from './pages/SkillDetails.jsx';
export default function App(){
  return(
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/post-skill' element={<PostSkill/>}/>
          <Route path='/services' element={<ExploreSkills/>}/>
          <Route path="/skill/:id" element={<SkillDetails/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
      </MainLayout>
    </Router>
  );
}