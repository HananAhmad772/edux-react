import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SkillsExchange from './pages/SkillsExchange';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Mentors from './pages/Mentors';
import Login from './components/Login';
import StudentRegister from './components/StudentRegister';
import MentorRegister from './components/MentorRegister';
import CompanyRegister from './components/CompanyRegister';
import ProfessionalRegister from './components/ProfessionalRegister';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';
import AdminLogin from './components/AdminLogin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin/*" element={
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<SuperAdminDashboard />} />
            </Routes>
          } />

          {/* Public Routes - With Navbar/Footer */}
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/skills-exchange" element={<SkillsExchange />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/mentors" element={<Mentors />} />

                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register/student" element={<StudentRegister />} />
                  <Route path="/register/mentor" element={<MentorRegister />} />
                  <Route path="/register/company" element={<CompanyRegister />} />
                  <Route path="/register/professional" element={<ProfessionalRegister />} />

                  {/* Password Reset Routes */}
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
