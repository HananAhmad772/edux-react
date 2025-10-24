import { useState } from 'react';
import { User, Palette, Bell, Shield, Trash2, LogOut } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'Hannan',
    lastName: 'Ahmad',
    email: 'hannan@example.com',
    bio: 'Aspiring software developer passionate about Python and AI',
    fieldOfInterest: 'Python Programming',
    aiTone: 'Friendly'
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      alert('Progress reset successfully!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
    }
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">⚙️ Settings</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                ST
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className="inline mr-2" size={18} />
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'preferences'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Palette className="inline mr-2" size={18} />
                  Learning Preferences
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'account'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Shield className="inline mr-2" size={18} />
                  Account
                </button>
              </nav>
            </div>

            {/* Profile Details Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Learning Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Learning Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Interest</label>
                    <select
                      name="fieldOfInterest"
                      value={profile.fieldOfInterest}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Python Programming">Python Programming</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Mobile Development">Mobile Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI Mentor Tone</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {['Friendly', 'Professional', 'Concise'].map((tone) => (
                        <label 
                          key={tone}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                            profile.aiTone === tone 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="aiTone"
                            value={tone}
                            checked={profile.aiTone === tone}
                            onChange={handleProfileChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 font-medium text-gray-700">{tone}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Trash2 className="text-red-500 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-900">Reset Progress</h3>
                        <p className="text-sm text-gray-500">Clear all your learning progress and start over</p>
                      </div>
                    </div>
                    <button
                      onClick={handleResetProgress}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <LogOut className="text-gray-500 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-gray-900">Logout</h3>
                        <p className="text-sm text-gray-500">Sign out of your account</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;