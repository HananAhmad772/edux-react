import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/landing-pages/Home';
import About from './pages/landing-pages/About';
import Contact from './pages/landing-pages/Contact';
import SkillsExchange from './pages/SkillsExchange';
import Students from './pages/landing-pages/Students';
import Companies from './pages/landing-pages/Companies';
import Mentors from './pages/landing-pages/Mentors';
import Login from './components/Login';
import StudentRegister from './components/StudentRegister';
import MentorRegister from './components/MentorRegister';
import CompanyRegister from './components/CompanyRegister';
import ProfessionalRegister from './components/ProfessionalRegister';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';
import AdminLogin from './components/AdminLogin';
import SuperAdminDashboard from './pages/Admin/SuperAdminDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import CompanyDashboard from './pages/Dashboard/CompanyDashboard';
// import JobSeekerDashboard from './pages/Dashboard/JobSeekerDashboard';
import LearningJourneyPage from './pages/Dashboard/LearningJourneyPage';
import AIMentorPage from './pages/Dashboard/AIMentorPage';
import DailyChallengePage from './pages/Dashboard/DailyChallengePage';
import ProgressFeedbackPage from './pages/Dashboard/ProgressFeedbackPage';
import AchievementsPage from './pages/Dashboard/AchievementsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import ProfileSetupPage from './pages/Dashboard/ProfileSetupPage';
import JobApplicationsPage from './pages/Dashboard/JobApplicationsPage';
import StudentRouteGuard from './components/StudentRouteGuard';
import CompanyRouteGuard from './components/CompanyRouteGuard';
import './App.css';
import PrivacyPolicy from './pages/landing-pages/PrivacyPolicy';
import TermsOfService from './pages/landing-pages/TermsOfServices';
import CookiePolicy from './pages/landing-pages/CookiePolicy';

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
                  <Route path="/job-seekers" element={<Mentors />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />

                  {/* Authentication Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register/student" element={<StudentRegister />} />
                  {/* <Route path="/register/job-seeker" element={<MentorRegister />} /> */}
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
          
          {/* Student Dashboard Routes - No Navbar/Footer */}
          <Route path="/student/*" element={
            <StudentRouteGuard>
              <Routes>
                <Route path="profile-setup" element={<ProfileSetupPage />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<LearningJourneyPage />} />
                <Route path="ai-mentor" element={<AIMentorPage />} />
                <Route path="projects" element={<DailyChallengePage />} />
                <Route path="progress" element={<ProgressFeedbackPage />} />
                <Route path="certifications" element={<AchievementsPage />} />
                <Route path="jobs" element={<JobApplicationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Routes>
            </StudentRouteGuard>
          } />
          
          {/* Company Dashboard Routes - No Navbar/Footer */}
          <Route path="/company/*" element={
            <CompanyRouteGuard>
              <Routes>
                <Route path="dashboard" element={<CompanyDashboard />} />
                <Route path="candidates" element={<CompanyDashboard />} />
                <Route path="jobs" element={<CompanyDashboard />} />
                <Route path="analytics" element={<CompanyDashboard />} />
                <Route path="profile" element={<CompanyDashboard />} />
              </Routes>
            </CompanyRouteGuard>
          } />
          
          {/* Other Dashboard Routes - No Navbar/Footer */}
          {/* <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;