import { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Map, 
  Bot, 
  Lightbulb, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    field: 'Web Dev',
    level: 'Beginner'
  });


  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Home },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'journeys', label: 'Learning Journeys', icon: Map },
    { id: 'ai-analytics', label: 'AI Mentor Analytics', icon: Bot },
    { id: 'projects', label: 'Projects & Evaluations', icon: Lightbulb },
    { id: 'reports', label: 'Reports & Insights', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback & Support', icon: MessageSquare },
    { id: 'system', label: 'System Settings', icon: Settings }
  ];

  // Mock data for dashboard overview
  const stats = {
    totalStudents: 1247,
    activeAISessions: 89,
    avgLearningProgress: 65,
    aiAccuracy: 92,
    systemHealth: 'Operational',
    totalMentors: 24,
    totalAdmins: 5,
    activeProjects: 156
  };

  const recentActivity = [
    { id: 1, user: 'Hannan', action: 'submitted "Loops Project"', score: '8/10', time: '2 hours ago' },
    { id: 2, user: 'Sarah', action: 'completed "Functions Module"', score: '9/10', time: '4 hours ago' },
    { id: 3, user: 'Mike', action: 'started "Data Structures"', score: 'In Progress', time: '1 day ago' },
    { id: 4, user: 'System', action: 'AI feedback retrained with 50 new interactions', score: '', time: '1 day ago' }
  ];

  // Mock data for user management
  const users = [
    { id: 1, name: 'Hannan Ahmad', email: 'hannan@edux.com', role: 'Student', field: 'Web Dev', level: 'Beginner', progress: 65, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@edux.com', role: 'Student', field: 'Data Science', level: 'Intermediate', progress: 82, status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike@edux.com', role: 'Student', field: 'AI', level: 'Advanced', progress: 45, status: 'Inactive' },
    { id: 4, name: 'Emma Wilson', email: 'emma@edux.com', role: 'Student', field: 'Mobile Dev', level: 'Beginner', progress: 30, status: 'Active' },
    { id: 5, name: 'Alex Turner', email: 'alex@edux.com', role: 'Mentor', field: 'Full Stack', level: 'Expert', progress: 0, status: 'Active' },
    { id: 6, name: 'James Wilson', email: 'james@edux.com', role: 'Admin', field: 'System', level: 'Expert', progress: 0, status: 'Active' }
  ];

  const admins = [
    { id: 1, name: 'James Wilson', email: 'james@edux.com', role: 'Super Admin', avatar: 'JW', status: 'Active' },
    { id: 2, name: 'Maria Garcia', email: 'maria@edux.com', role: 'Admin', avatar: 'MG', status: 'Active' },
    { id: 3, name: 'Robert Brown', email: 'robert@edux.com', role: 'Admin', avatar: 'RB', status: 'Inactive' },
    { id: 4, name: 'Lisa Taylor', email: 'lisa@edux.com', role: 'Content Admin', avatar: 'LT', status: 'Active' },
    { id: 5, name: 'David Miller', email: 'david@edux.com', role: 'Support Admin', avatar: 'DM', status: 'Active' }
  ];

  const handleAddUser = () => {
    // In a real app, this would make an API call
    console.log('Adding new user:', newUser);
    alert(`User ${newUser.name} added successfully!`);
    setShowAddUserForm(false);
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      field: 'Web Dev',
      level: 'Beginner'
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {/* <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1> */}
          <p className="text-gray-600">Welcome back, Super Admin</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
          Add New Roadmap
        </button>
        <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
          View Reports
        </button>
        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
          Manage AI
        </button>
      </div>

      {/* Top Stats Cards - 3 in first row, 3 in second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">👩‍🎓 Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudents.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">💬 Active AI Sessions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeAISessions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">📈 Avg. Learning Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgLearningProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">🧠 AI Accuracy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.aiAccuracy}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">⚙️ System Health</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.systemHealth}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">👥 Total Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalAdmins}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Graphs and Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - New Signups */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">New Signups per Week</h3>
          <div className="h-64 flex items-end justify-between">
            {[120, 180, 150, 220, 190, 250, 210].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg hover:opacity-75 transition-opacity"
                  style={{ height: `${value / 3}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Project Scores */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Avg. Project Scores per Domain</h3>
          <div className="h-64 flex items-end justify-between">
            {[
              { domain: 'Web Dev', score: 85 },
              { domain: 'AI', score: 78 },
              { domain: 'Data Sci', score: 82 },
              { domain: 'Mobile', score: 75 },
              { domain: 'ML', score: 80 }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-lg hover:opacity-75 transition-opacity"
                  style={{ height: `${item.score}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">{item.domain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart - Field Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Field of Interest Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute text-center">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Web Dev (40%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm">AI (25%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
              <span className="text-sm">Data Sci (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Others (15%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  User {activity.user} {activity.action}
                  {activity.score && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {activity.score}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderManageUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Blank class just for styling the button  */}
        <h1 className="text-2xl font-bold text-gray-900">  </h1>
        <button 
          onClick={() => setShowAddUserForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,276</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Roles</option>
              <option>Students</option>
              <option>Mentors</option>
              <option>Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">
            Students
          </button>
          <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
            Admins
          </button>
        </nav>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.filter(user => user.role === 'Student').map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.field}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setActiveTab('user-profile')}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">
                      Reset
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                        {admin.avatar}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {admin.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddUserForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
        <button 
          onClick={() => setShowAddUserForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Field of Interest</label>
            <select
              value={newUser.field}
              onChange={(e) => setNewUser({...newUser, field: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Web Dev">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Mobile Dev">Mobile Development</option>
              <option value="ML">Machine Learning</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              value={newUser.level}
              onChange={(e) => setNewUser({...newUser, level: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleAddUser}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setActiveTab('users')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <span className="mr-2">←</span> Back to Users
        </button>
        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        <div></div> {/* Spacer for alignment */}
      </div>

      {/* User Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-start">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
            HA
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hannan Ahmad</h2>
            <p className="text-gray-600">hannan@edux.com</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Web Dev</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Beginner</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Interaction Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">AI Interaction Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-900">42</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Avg. Response Time</p>
            <p className="text-2xl font-bold text-gray-900">2.4s</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">Helpfulness Rating</p>
            <p className="text-2xl font-bold text-gray-900">4.7/5</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Average Daily Marks</p>
            <div className="flex items-end h-32">
              {[8, 7, 9, 6, 8, 9, 7].map((value, index) => (
                <div key={index} className="flex flex-col items-center mx-1">
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                    style={{ height: `${value * 10}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">D{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Roadmap Progress</p>
            <div className="space-y-3">
              {[
                { topic: 'Introduction to Python', progress: 100 },
                { topic: 'Conditions & Logic', progress: 100 },
                { topic: 'Loops', progress: 85 },
                { topic: 'Functions', progress: 60 },
                { topic: 'Data Structures', progress: 30 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.topic}</span>
                    <span className="text-gray-500">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Weak Areas (Detected by AI)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-red-200 bg-red-50 rounded-lg p-4">
            <h4 className="font-medium text-red-800">Functions</h4>
            <p className="text-sm text-red-600 mt-1">Struggles with parameter passing and return values</p>
          </div>
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
            <h4 className="font-medium text-orange-800">Error Handling</h4>
            <p className="text-sm text-orange-600 mt-1">Needs improvement in exception handling</p>
          </div>
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800">Data Structures</h4>
            <p className="text-sm text-yellow-600 mt-1">Basic understanding of lists and dictionaries</p>
          </div>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Recent AI Feedback</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">"Good job on the loops project! You missed handling division by zero. Try adding a conditional check."</p>
            <p className="text-sm text-gray-500 mt-2">Project: Calculator App • Score: 8/10</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">"Your logic is sound but could be more efficient. Consider using list comprehensions for better performance."</p>
            <p className="text-sm text-gray-500 mt-2">Project: Data Processing • Score: 7/10</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Render content based on active tab */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && !showAddUserForm && renderManageUsers()}
          {activeTab === 'users' && showAddUserForm && renderAddUserForm()}
          {activeTab === 'user-profile' && renderUserProfile()}
          
          {/* Placeholder for other tabs */}
          {['journeys', 'ai-analytics', 'projects', 'reports', 'feedback', 'system'].includes(activeTab) && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{sidebarItems.find(item => item.id === activeTab)?.label}</h3>
              <p className="text-gray-600">This section is under development and will be available soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;