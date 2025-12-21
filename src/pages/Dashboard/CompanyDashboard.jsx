import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  Building,
  MapPin,
  UserCheck,
  Briefcase,
  ChevronRight,
  LogOut,
  Search,
  Mail,
  Phone
} from 'lucide-react';
import api from '../../api/axios';
import CompanySidebar from '../../components/CompanySidebar';
import StudentProfileModal from '../../components/StudentProfileModal';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileChecked, setProfileChecked] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ref to prevent double API calls in development due to React Strict Mode
  const fetchDashboardDataRef = useRef(false);

  // Fetch user profile first, then dashboard data
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch dashboard data after profile is verified
  useEffect(() => {
    if (profileChecked && user && user.user_type === 'company') {
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
        setProfileChecked(true);
      } else {
        setProfileChecked(true);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setProfileChecked(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch real company dashboard data
      const response = await api.get('/auth/company/dashboard');
      
      if (response.data.status) {
        setDashboardData(response.data.data);
      } else {
        // Use mock data as fallback
        const mockData = {
          company: {
            name: "Tech Innovations Inc.",
            industry: "Technology",
            size: "201-500 employees",
            location: "San Francisco, CA",
            website: "https://techinnovations.com"
          },
          stats: {
            total_students: 1247,
            active_students: 892,
            internship_opportunities: 45,
            job_opportunities: 32
          },
          top_students: [
            { id: 1, name: "John Doe", program: "Web Development", score: 95, skills: ["React", "Node.js", "MongoDB"], email: "john.doe@example.com", phone: "+1 (555) 123-4567" },
            { id: 2, name: "Emma Wilson", program: "Data Science", score: 92, skills: ["Python", "Machine Learning", "SQL"], email: "emma.wilson@example.com", phone: "+1 (555) 234-5678" },
            { id: 3, name: "Alex Chen", program: "Mobile Development", score: 90, skills: ["React Native", "Firebase", "UI/UX"], email: "alex.chen@example.com", phone: "+1 (555) 345-6789" },
            { id: 4, name: "Sarah Johnson", program: "Web Development", score: 88, skills: ["Vue.js", "Express", "PostgreSQL"], email: "sarah.johnson@example.com", phone: "+1 (555) 456-7890" },
            { id: 5, name: "Michael Brown", program: "Data Science", score: 87, skills: ["R", "Statistics", "Data Visualization"], email: "michael.brown@example.com", phone: "+1 (555) 567-8901" },
            { id: 6, name: "Jennifer Lee", program: "Cybersecurity", score: 85, skills: ["Network Security", "Ethical Hacking", "SIEM"], email: "jennifer.lee@example.com", phone: "+1 (555) 678-9012" },
            { id: 7, name: "David Kim", program: "Cloud Computing", score: 84, skills: ["AWS", "Docker", "Kubernetes"], email: "david.kim@example.com", phone: "+1 (555) 789-0123" },
            { id: 8, name: "Lisa Wang", program: "UI/UX Design", score: 83, skills: ["Figma", "Adobe XD", "User Research"], email: "lisa.wang@example.com", phone: "+1 (555) 890-1234" }
          ]
        };
        
        setDashboardData(mockData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data as fallback
      const mockData = {
        company: {
          name: "Tech Innovations Inc.",
          industry: "Technology",
          size: "201-500 employees",
          location: "San Francisco, CA",
          website: "https://techinnovations.com"
        },
        stats: {
          total_students: 1247,
          active_students: 892,
          internship_opportunities: 45,
          job_opportunities: 32
        },
        top_students: [
          { id: 1, name: "John Doe", program: "Web Development", score: 95, skills: ["React", "Node.js", "MongoDB"], email: "john.doe@example.com", phone: "+1 (555) 123-4567" },
          { id: 2, name: "Emma Wilson", program: "Data Science", score: 92, skills: ["Python", "Machine Learning", "SQL"], email: "emma.wilson@example.com", phone: "+1 (555) 234-5678" },
          { id: 3, name: "Alex Chen", program: "Mobile Development", score: 90, skills: ["React Native", "Firebase", "UI/UX"], email: "alex.chen@example.com", phone: "+1 (555) 345-6789" },
          { id: 4, name: "Sarah Johnson", program: "Web Development", score: 88, skills: ["Vue.js", "Express", "PostgreSQL"], email: "sarah.johnson@example.com", phone: "+1 (555) 456-7890" },
          { id: 5, name: "Michael Brown", program: "Data Science", score: 87, skills: ["R", "Statistics", "Data Visualization"], email: "michael.brown@example.com", phone: "+1 (555) 567-8901" },
          { id: 6, name: "Jennifer Lee", program: "Cybersecurity", score: 85, skills: ["Network Security", "Ethical Hacking", "SIEM"], email: "jennifer.lee@example.com", phone: "+1 (555) 678-9012" },
          { id: 7, name: "David Kim", program: "Cloud Computing", score: 84, skills: ["AWS", "Docker", "Kubernetes"], email: "david.kim@example.com", phone: "+1 (555) 789-0123" },
          { id: 8, name: "Lisa Wang", program: "UI/UX Design", score: 83, skills: ["Figma", "Adobe XD", "User Research"], email: "lisa.wang@example.com", phone: "+1 (555) 890-1234" }
        ]
      };
      
      setDashboardData(mockData);
    } finally {
      setLoading(false);
      // Reset the ref so future calls can execute
      fetchDashboardDataRef.current = false;
    }
  };

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    // For now, we'll just show an alert since we don't have a company profile page
    alert("Company profile settings would be here");
    setDropdownOpen(false);
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleMakeOffer = (student) => {
    // In a real implementation, this would call an API to make a job offer
    alert(`Job/Internship offer sent to ${student.name}!`);
  };

  const filteredStudents = dashboardData?.top_students?.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Don't render dashboard if profile check hasn't completed
  if (!profileChecked || loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is not a company, show message
  if (user && user.user_type !== 'company') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the company dashboard. Please log in with a company account.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const company = dashboardData?.company || {};
  const stats = dashboardData?.stats || {};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CompanySidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🏢 Company Dashboard</h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                  </div>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleProfileClick}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Company Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.first_name}!</h2>
            <p className="text-gray-600">Discover top talent and make job/internship offers</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_students || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active_students || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Internship Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.internship_opportunities || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Job Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.job_opportunities || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Top Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Top Performing Candidates</h3>
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.program}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold">{student.score}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewProfile(student)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleMakeOffer(student)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Make Offer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Building className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{company.name || "Company Name"}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{company.location || "Location"}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{company.size || "Company Size"}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{company.industry || "Industry"}</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Student Profile Modal */}
      <StudentProfileModal 
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMakeOffer={handleMakeOffer}
      />
    </div>
  );
};

export default CompanyDashboard;