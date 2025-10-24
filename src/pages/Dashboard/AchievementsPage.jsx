import { useState } from 'react';
import { Award, Download, Lock, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const AchievementsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for badges
  const badges = [
    { id: 1, name: 'First Login', description: 'Completed registration', earned: true, date: 'Oct 15, 2023', icon: '🎉' },
    { id: 2, name: 'Day 5 Completed', description: 'Finished first week', earned: true, date: 'Oct 20, 2023', icon: '🔥' },
    { id: 3, name: 'First Project Passed', description: 'Successfully completed first project', earned: true, date: 'Oct 19, 2023', icon: '✅' },
    { id: 4, name: 'Consistency Champion', description: '5-day learning streak', earned: true, date: 'Oct 22, 2023', icon: '🏆' },
    { id: 5, name: 'Python Basics Master', description: 'Scored 90%+ in basics', earned: true, date: 'Oct 18, 2023', icon: '🐍' },
    { id: 6, name: 'Early Bird', description: 'Learn before 8 AM', earned: false, date: null, icon: '🌅' },
    { id: 7, name: 'Night Owl', description: 'Learn after 10 PM', earned: false, date: null, icon: '🦉' },
    { id: 8, name: 'Speed Learner', description: 'Complete 3 days in 1 week', earned: false, date: null, icon: '⚡' },
    { id: 9, name: 'Perfectionist', description: 'Score 10/10 in project', earned: false, date: null, icon: '💯' }
  ];

  // Mock data for certificates
  const certificates = [
    { id: 1, name: 'Python Basics Completion', date: 'Oct 20, 2023', status: 'available' },
    { id: 2, name: 'Introduction to Programming', date: 'Oct 15, 2023', status: 'available' },
    { id: 3, name: 'Loops and Conditions', date: 'Pending', status: 'locked' }
  ];

  const downloadCertificate = (id) => {
    alert(`Downloading certificate ${id} as PDF...`);
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🎓 Achievements</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                AC
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Badges Grid */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`rounded-xl p-6 flex flex-col items-center text-center transition-all ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-sm hover:shadow-md' 
                      : 'bg-gray-50 border border-gray-200 opacity-70'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 ${
                    badge.earned ? 'bg-white shadow' : 'bg-gray-200'
                  }`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{badge.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-3">{badge.description}</p>
                  {badge.earned ? (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle size={16} className="mr-1" />
                      Earned on {badge.date}
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500 text-sm">
                      <Lock size={16} className="mr-1" />
                      Locked
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificates</h2>
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div 
                  key={certificate.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">{certificate.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {certificate.status === 'available' 
                        ? `Issued on ${certificate.date}` 
                        : certificate.date}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    {certificate.status === 'available' ? (
                      <button
                        onClick={() => downloadCertificate(certificate.id)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600"
                      >
                        <Download size={16} className="mr-2" />
                        Download PDF
                      </button>
                    ) : (
                      <div className="flex items-center px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">
                        <Lock size={16} className="mr-2" />
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate Generation Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">Auto-Generated Certificates</h3>
              <p className="text-gray-700">
                Certificates are automatically generated when you complete your learning roadmap. 
                They are available for download as PDF and can be shared with employers or added to your portfolio.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AchievementsPage;