import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentRegistrationWizard from '../../components/StudentRegistrationWizard';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWizard, setShowWizard] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.status) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleWizardComplete = () => {
    // Close wizard and redirect to student dashboard
    setShowWizard(false);
    navigate("/student/dashboard");
  };

  const handleWizardClose = () => {
    // Don't allow closing - user must complete profile
    // Could show a message here
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">📝 Complete Your Profile</h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to EduX! 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                To get started with your personalized learning journey, please complete your profile setup.
                This will help us create a customized roadmap just for you.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You won't be able to access the dashboard until you complete your profile.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Registration Wizard Modal */}
      <StudentRegistrationWizard
        isOpen={showWizard}
        onClose={handleWizardClose}
        onComplete={handleWizardComplete}
        studentData={user}
      />
    </div>
  );
};

export default ProfileSetupPage;

