import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Flame,
  Play,
  ChevronRight,
  User,
  LogOut,
  Award,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import api from '../../api/axios';
import Sidebar from '../../components/Sidebar';


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ first_name: 'Hannan' });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileChecked, setProfileChecked] = useState(false);
  
  // Ref to prevent double API calls in development due to React Strict Mode
  const fetchDashboardDataRef = useRef(false);
  const profileFetchRef = useRef(false);


  // Fetch user profile first, then dashboard data
useEffect(() => {
  if (!profileFetchRef.current) {
    profileFetchRef.current = true;
    fetchUserProfile();
  }
}, []);


  // Fetch dashboard data after profile is verified
  useEffect(() => {
    if (profileChecked && user && user.user_type === 'student') {
      const studentProfile = user.student_profile || user.studentProfile; // Support both formats
      // Only fetch dashboard if profile is complete
      if (studentProfile && 
          studentProfile.major_subject && 
          studentProfile.current_skill_level && 
          studentProfile.main_goal) {
        // Prevent double execution
        if (!fetchDashboardDataRef.current) {
          fetchDashboardDataRef.current = true;
          fetchDashboardData();
        }
      }
    } else if (profileChecked && user && user.user_type !== 'student') {
      // Not a student, fetch dashboard anyway
      // Prevent double execution
      if (!fetchDashboardDataRef.current) {
        fetchDashboardDataRef.current = true;
        fetchDashboardData();
      }
    }
  }, [user, profileChecked]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/profile');
      if (response.data.status) {
        const userData = response.data.data;
        setUser(userData);
        
        // Check if student profile is incomplete
        if (userData.user_type === 'student') {
          const studentProfile = userData.student_profile || userData.studentProfile; // Support both formats
          if (!studentProfile) {
            // No profile - redirect immediately
            setProfileChecked(true);
            navigate('/student/profile-setup');
            return;
          }
          
          // Check required fields
          const requiredFields = ['major_subject', 'current_skill_level', 'main_goal'];
          const hasRequiredFields = requiredFields.every(field => 
            studentProfile[field] && studentProfile[field].trim() !== ''
          );
          
          if (!hasRequiredFields) {
            // Profile incomplete - redirect immediately
            setProfileChecked(true);
            navigate('/student/profile-setup');
            return;
          }
        }
        
        // Profile is complete or not a student
        setProfileChecked(true);
      } else {
        setProfileChecked(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfileChecked(true);
      
      // If 403 and profile incomplete, redirect
      if (error.response?.status === 403 && error.response?.data?.profile_incomplete) {
        navigate('/student/profile-setup');
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/student/dashboard');
      if (response.data.status) {
        setDashboardData(response.data.data);
      } else {
        // Check if profile is incomplete
        if (response.data.profile_incomplete || response.status === 403) {
          // Redirect to profile setup
          navigate('/student/profile-setup');
          return;
        }
        console.error('Failed to fetch dashboard data:', response.data.message);
      }
    } catch (error) {
      // Handle 403 (profile incomplete) or other errors
      if (error.response?.status === 403 && error.response?.data?.profile_incomplete) {
        navigate('/student/profile-setup');
        return;
      }
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      // Reset the ref so future calls can execute
      fetchDashboardDataRef.current = false;
    }
  };

  // Extract data with fallbacks
  const currentWeek = dashboardData?.current_week || { week_number: 1, week_name: 'Week 1–2', step_title: 'Getting Started', current_day: 1, total_days: 14 };
  const xp = dashboardData?.xp || 0;
  const streak = dashboardData?.streak || 0;
  const lastProjectScore = dashboardData?.last_project_score;
  const todayTopic = dashboardData?.today_topic;
  const yesterdayTopic = dashboardData?.yesterday_topic;
  const roadmapProgress = dashboardData?.roadmap_progress?.steps || [];
  const aiRecommendation = dashboardData?.ai_recommendation || "Welcome! Start your learning journey today.";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        navigate("/login");
        return;
      }

      // Call the logout API with Authorization header
      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const startLesson = () => {
    // Check if there are no topics
    if (!todayTopic) {
      // Navigate to Learning Journey page to generate roadmap
      navigate('/student/courses');
    } else {
      // Navigate to AI Mentor page
      navigate('/student/ai-mentor');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/student/settings');
    setDropdownOpen(false);
  };

  // Don't render dashboard if profile check hasn't completed or profile is incomplete
  if (!profileChecked || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is student but profile is incomplete, show message (should redirect but just in case)
  if (user?.user_type === 'student') {
    const studentProfile = user.student_profile || user.studentProfile; // Support both formats
    if (!studentProfile || 
        !studentProfile.major_subject || 
        !studentProfile.current_skill_level || 
        !studentProfile.main_goal) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Setup Required</h2>
            <p className="text-gray-600 mb-6">
              Please complete your profile setup to access the dashboard.
            </p>
            <button
              onClick={() => navigate('/student/profile-setup')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Go to Profile Setup
            </button>
          </div>
        </div>
      );
    }
  }

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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🏠 Dashboard</h1>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold focus:outline-none"
              >
                HA
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-2" />
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              👋 Welcome back, {user.first_name}!
            </h1>
            <p className="text-blue-100 mb-4">
              You're currently on {currentWeek.week_name} – {currentWeek.step_title}
            </p>
            
            {loading ? (
              <div className="text-center py-4">
                <p className="text-blue-100">Loading dashboard data...</p>
              </div>
            ) : (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm text-blue-100">Current Week</p>
                    <p className="text-lg font-bold">{currentWeek.current_day} of {currentWeek.total_days}</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm text-blue-100">XP</p>
                    <p className="text-lg font-bold">{xp} pts</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm text-blue-100">Streak</p>
                    <p className="text-lg font-bold">{streak} days</p>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm text-blue-100">Last Project</p>
                    {lastProjectScore ? (
                      <p className="text-lg font-bold">
                        {lastProjectScore.passed ? '✅' : '❌'} {lastProjectScore.passed ? 'Passed' : 'Failed'} with {lastProjectScore.score}/10
                      </p>
                    ) : (
                      <p className="text-lg font-bold">No projects yet</p>
                    )}
                  </div>
                </div>
                
                {/* Today's Mission */}
                <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-4">
                  <h3 className="font-bold text-lg mb-2">Today's Mission</h3>
                  {todayTopic ? (
                    <>
                      <p className="mb-1">Today's topic: {todayTopic.topic}</p>
                      <p className="mb-3">Step: {todayTopic.step_title}</p>
                    </>
                  ) : (
                    <p className="mb-3">No topic assigned yet. Generate a roadmap to get started!</p>
                  )}
                  <button
                    onClick={startLesson}
                    className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    {!todayTopic ? (
                      <>
                        <RefreshCw size={16} className="mr-2" />
                        Generate Roadmap
                      </>
                    ) : (
                      <>
                        <Play size={16} className="mr-2" />
                        Start Lesson
                      </>
                    )}
                  </button>
                </div>
                
                {/* AI Suggestion */}
                <div className="bg-yellow-500 bg-opacity-20 rounded-xl p-4 flex items-start">
                  <Lightbulb size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <p>{aiRecommendation}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Roadmap Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Roadmap Progress</h2>
              {dashboardData?.roadmap_progress && (
                <p className="text-sm text-gray-600">
                  {dashboardData.roadmap_progress.completed_topics} / {dashboardData.roadmap_progress.total_topics} topics completed
                  ({dashboardData.roadmap_progress.percentage}%)
                </p>
              )}
            </div>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {roadmapProgress.length > 0 ? (
                roadmapProgress.map((week, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[60px]">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      week.status === 'completed' ? 'bg-green-500 text-white' : 
                      week.status === 'in-progress' ? 'bg-orange-500 text-white' : 
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {week.status === 'completed' ? '✅' : 
                       week.status === 'in-progress' ? '🔥' : 
                       `W${week.week}`}
                    </div>
                    <span className="text-xs text-gray-500 text-center">{week.week_name || `Week ${week.week}`}</span>
                    {week.progress !== undefined && (
                      <span className="text-xs text-gray-400 mt-1">{week.progress}%</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No roadmap progress available. Generate a roadmap to get started!</p>
              )}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button 
              onClick={() => navigate('/student/ai-mentor')}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <User size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Ask AI Mentor</span>
              </div>
            </button>

            <button 
              onClick={() => navigate('/student/progress')}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                  <TrendingUp size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">View Progress</span>
              </div>
            </button>

            <button 
              onClick={() => navigate('/student/projects')}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                  <Award size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Start Project</span>
              </div>
            </button>

            <button 
              onClick={() => navigate('/student/courses')}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                  <Play size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Continue Learning</span>
              </div>
            </button>
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 text-white text-center">
            <p className="text-lg font-medium">
              "Keep going, {user.first_name}! You're just 3 lessons away from your next badge 🏅"
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;