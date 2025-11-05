import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ExploreSkills from "./pages/ExploreSkills.jsx";
import PostSkill from "./pages/PostSkill.jsx";
import SkillDetails from "./pages/SkillDetails.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EditSkill from "./pages/EditSkill.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<LandingPage />} />
          <Route path="services" element={<ExploreSkills />} />
          <Route path="post-skill" element={<PostSkill />} />
          <Route path="skill/:id" element={<SkillDetails />} />
          <Route path="my-requests" element={<MyRequests />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="edit-skill/:id" element={<EditSkill />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
