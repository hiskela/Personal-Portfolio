import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminHome from "./pages/admin/AdminHome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/messages" element={<AdminMessages/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>
<Route
  path="/admin/projects"
  element={<AdminProjects />}
/>
<Route path="/admin/skills" element={<AdminSkills />} />
<Route path="/admin/about" element={<AdminAbout />} />
<Route path="/admin/home" element={<AdminHome/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;