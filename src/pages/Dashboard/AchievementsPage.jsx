import { useState, useEffect } from 'react';
import { Award, Download, Lock, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const AchievementsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [badges, setBadges] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch badges and certificates on component mount
  useEffect(() => {
    fetchBadges();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response.data.status) {
        setUserProfile(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await api.get('/badges');
      setBadges(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching badges:', err);
      setError('Failed to load badges');
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (certificateId) => {
    try {
      // Get user's field of interest from profile
      const fieldOfInterest = userProfile?.studentProfile?.major_subject || userProfile?.studentProfile?.fieldOfInterest || 'Computer Science';
      const userName = `${userProfile?.first_name || 'Student'} ${userProfile?.last_name || ''}`.trim() || 'Student';
      
      // In a real implementation, this would call an API endpoint to generate the certificate
      // For now, we'll simulate the generation with a delay
      alert(`Generating certificate for ${fieldOfInterest}...\nThis would normally download a PDF with your name: ${userName}`);
      
      // Simulate API call to generate certificate
      // const response = await api.post('/auth/student/certificate/generate', {
      //   certificate_id: certificateId,
      //   field_of_interest: fieldOfInterest,
      //   user_name: userName
      // });
      
      // If successful, trigger download
      // downloadCertificateFile(response.data.certificate_url);
    } catch (err) {
      console.error('Error generating certificate:', err);
      alert('Failed to generate certificate. Please try again later.');
    }
  };

  const downloadCertificate = async (certificateId) => {
    try {
      // In a real implementation, this would download the actual certificate file
      // For now, we'll simulate the download
      alert(`Downloading certificate as PDF...\nIn a real implementation, this would download the actual certificate file.`);
      
      // Simulate actual download
      // const response = await api.get(`/auth/student/certificate/${certificateId}/download`, {
      //   responseType: 'blob'
      // });
      // downloadCertificateFile(response.data);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      alert('Failed to download certificate. Please try again later.');
    }
  };

  // Helper function to download certificate file
  const downloadCertificateFile = (blobData) => {
    // Create a URL for the blob data
    const url = window.URL.createObjectURL(new Blob([blobData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'certificate.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
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

          {/* Loading State */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Loading achievements...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
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
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
                <button 
                  onClick={fetchBadges}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}
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
                      Earned on {new Date(badge.earned_at).toLocaleDateString()}
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

            {/* Certificate Generation Section */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">Generate Personalized Certificate</h3>
              <p className="text-gray-700 mb-4">
                Create a certificate based on your field of interest: 
                <span className="font-semibold"> {userProfile?.studentProfile?.major_subject || 'Not specified'}</span>
              </p>
              <button
                onClick={() => generateCertificate('personalized')}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600"
              >
                <Award size={16} className="mr-2" />
                Generate Certificate
              </button>
            </div>

            {/* Certificate Generation Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
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