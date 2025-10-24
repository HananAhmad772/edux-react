import { useState, useEffect } from 'react';
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
  Lightbulb
} from 'lucide-react';
import api from '../../api/axios';
import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ first_name: 'Hannan' });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock data for quick stats
  const quickStats = {
    currentDay: 3,
    totalDays: 7,
    xp: 120,
    streak: 4,
    lastProjectScore: 8
  };

  // Mock data for roadmap progress (Week-based)
  const roadmapProgress = [
    { week: 1, status: 'completed' },
    { week: 2, status: 'completed' },
    { week: 3, status: 'in-progress' },
    { week: 4, status: 'pending' },
    { week: 5, status: 'pending' },
    { week: 6, status: 'pending' },
    { week: 7, status: 'pending' },
    { week: 8, status: 'pending' },
    { week: 9, status: 'pending' },
    { week: 10, status: 'pending' },
  ];

  // Mock data for recommendations
  const recommendations = [
    { id: 1, title: 'Python Loops Mastery', description: 'Advanced techniques for working with loops', progress: 60 },
    { id: 2, title: 'Error Handling', description: 'Learn how to handle exceptions gracefully', progress: 30 },
    { id: 3, title: 'List Comprehensions', description: 'Write cleaner and more efficient Python code', progress: 0 }
  ];

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
    // Navigate to AI Mentor page
    navigate('/student/ai-mentor');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/student/settings');
    setDropdownOpen(false);
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
              You're currently on Week {Math.ceil(quickStats.currentDay / 7)} – Loops in Python
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Current Week</p>
                <p className="text-lg font-bold">{quickStats.currentDay} of {quickStats.totalDays}</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm text-blue-100">XP</p>
                <p className="text-lg font-bold">{quickStats.xp} pts</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Streak</p>
                <p className="text-lg font-bold">{quickStats.streak} days</p>
              </div>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Last Project</p>
                <p className="text-lg font-bold">✅ Passed with {quickStats.lastProjectScore}/10</p>
              </div>
            </div>
            
            {/* Today's Mission */}
            <div className="bg-white bg-opacity-10 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-lg mb-2">Today's Mission</h3>
              <p className="mb-1">Today's topic: Loops in Python</p>
              <p className="mb-3">Goal: Understand while and for loops</p>
              <button
                onClick={startLesson}
                className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Play size={16} className="mr-2" />
                Start Lesson
              </button>
            </div>
            
            {/* AI Suggestion */}
            <div className="bg-yellow-500 bg-opacity-20 rounded-xl p-4 flex items-start">
              <Lightbulb size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <p>
                Yesterday you struggled with conditions — let's review before continuing!
              </p>
            </div>
          </div>
          
          {/* Roadmap Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Roadmap Progress</h2>
            <div className="flex items-center justify-between">
              {roadmapProgress.map((week, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    week.status === 'completed' ? 'bg-green-500 text-white' : 
                    week.status === 'in-progress' ? 'bg-orange-500 text-white' : 
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {week.status === 'completed' ? '✅' : 
                     week.status === 'in-progress' ? '🔥' : 
                     `W${week.week}`}
                  </div>
                  <span className="text-xs text-gray-500">Week {week.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen size={24} />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.progress}% complete</p>
                    </div>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-blue-600">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
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