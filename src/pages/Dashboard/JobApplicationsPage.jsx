import { useState, useEffect } from 'react';
import { Building, MapPin, Briefcase, Search, X, Check, User, Mail, Phone, ChevronRight, AlertCircle, FileText, Download, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const JobApplicationsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [roadmapCompleted, setRoadmapCompleted] = useState(false);
  const [roadmapProgress, setRoadmapProgress] = useState(0);
  const [cvData, setCvData] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch companies and user profile on component mount
  useEffect(() => {
    fetchCompanies();
    fetchUserProfile();
    fetchRoadmapStatus();
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

  const fetchRoadmapStatus = async () => {
    try {
      const response = await api.get('/auth/student/progress');
      if (response.data.status) {
        const progressData = response.data.data;
        const percentage = progressData.roadmap_progress?.percentage || 0;
        setRoadmapProgress(percentage);
        // Consider roadmap completed if progress is 100% or if there's a completion flag
        setRoadmapCompleted(percentage >= 100);
      }
    } catch (err) {
      console.error('Error fetching roadmap status:', err);
    }
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // For now, we'll use mock data since we don't have the actual API endpoint
      // In a real implementation, this would be:
      // const response = await api.get('/auth/student/companies');
      
      // Mock data for demonstration
      const mockCompanies = [
        {
          id: 1,
          name: "Tech Innovations Inc.",
          industry: "Technology",
          location: "San Francisco, CA",
          description: "Leading technology company specializing in AI and machine learning solutions.",
          website: "https://techinnovations.com",
          employees: "201-500",
          postedJobs: 5,
          logo: "TI"
        },
        {
          id: 2,
          name: "Global Finance Group",
          industry: "Finance",
          location: "New York, NY",
          description: "International financial services company with focus on digital banking.",
          website: "https://globalfinance.com",
          employees: "1000+",
          postedJobs: 3,
          logo: "GF"
        },
        {
          id: 3,
          name: "HealthTech Solutions",
          industry: "Healthcare",
          location: "Boston, MA",
          description: "Innovative healthcare technology company improving patient outcomes.",
          website: "https://healthtechsolutions.com",
          employees: "51-200",
          postedJobs: 7,
          logo: "HS"
        },
        {
          id: 4,
          name: "Eco Energy Corp",
          industry: "Energy",
          location: "Austin, TX",
          description: "Renewable energy company focused on sustainable solutions.",
          website: "https://ecoenergy.com",
          employees: "501-1000",
          postedJobs: 2,
          logo: "EE"
        },
        {
          id: 5,
          name: "Creative Media Studios",
          industry: "Media",
          location: "Los Angeles, CA",
          description: "Award-winning digital media and entertainment company.",
          website: "https://creativemedia.com",
          employees: "51-200",
          postedJobs: 4,
          logo: "CM"
        }
      ];
      
      setCompanies(mockCompanies);
      setError(null);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  const handleApply = async (companyId) => {
    // Check if roadmap is completed before allowing application
    if (!roadmapCompleted) {
      alert(`You cannot apply for jobs until you complete your learning roadmap.\nCurrent progress: ${roadmapProgress}%\nPlease complete your roadmap first.`);
      return;
    }
    
    try {
      // In a real implementation, this would call an API to submit the application
      // const response = await api.post(`/auth/student/companies/${companyId}/apply`);
      
      alert(`Application submitted to ${selectedCompany.name} successfully!`);
      handleCloseModal();
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please try again later.');
    }
  };

  const handleIgnore = () => {
    handleCloseModal();
  };

  const generateCV = async () => {
    if (!roadmapCompleted) {
      alert(`You cannot generate a resume until you complete your learning roadmap.\nCurrent progress: ${roadmapProgress}%\nPlease complete your roadmap first.`);
      return;
    }
    
    try {
      // In a real implementation, this would call an API to generate the CV
      // const response = await api.post('/auth/student/cv/generate');
      
      // For demo purposes, we'll create mock CV data
      const mockCVData = {
        name: `${userProfile?.first_name} ${userProfile?.last_name}`,
        email: userProfile?.email,
        phone: userProfile?.phone || 'Not provided',
        major_subject: userProfile?.studentProfile?.major_subject || 'Not specified',
        skills: ['React', 'JavaScript', 'HTML/CSS', 'Node.js'], // This would come from the actual roadmap
        projects: [
          { name: 'E-commerce Website', description: 'Built a full-stack e-commerce site using React and Node.js' },
          { name: 'Data Visualization Dashboard', description: 'Created interactive charts using D3.js' }
        ],
        achievements: [
          { name: 'Web Development Certification', date: '2023' },
          { name: 'Top Performer Badge', date: '2023' }
        ]
      };
      
      setCvData(mockCVData);
      alert('Resume generated successfully! You can now download it.');
    } catch (err) {
      console.error('Error generating CV:', err);
      alert('Failed to generate resume. Please try again later.');
    }
  };

  const downloadCV = async () => {
    if (!roadmapCompleted) {
      alert(`You cannot download a resume until you complete your learning roadmap.\nCurrent progress: ${roadmapProgress}%\nPlease complete your roadmap first.`);
      return;
    }
    
    if (!cvData) {
      alert('Please generate your resume first.');
      return;
    }
    
    try {
      // In a real implementation, this would call an API to download the CV
      // const response = await api.get('/auth/student/cv/download', { responseType: 'blob' });
      
      // For demo purposes, we'll simulate a download
      alert('In a real implementation, this would download your resume as a PDF file.');
      
      // Simulate file download
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'resume.pdf');
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    } catch (err) {
      console.error('Error downloading CV:', err);
      alert('Failed to download resume. Please try again later.');
    }
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
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
                <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🏢 Job Applications</h1>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  JA
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading companies...</p>
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🏢 Job Applications</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                JA
              </div>
            </div>
          </div>
        </header>

        {/* Roadmap Progress Banner */}
        {!roadmapCompleted && (
          <div className="bg-yellow-50 border-b border-yellow-200 p-4">
            <div className="max-w-7xl mx-auto flex items-center">
              <AlertCircle className="text-yellow-600 mr-2" size={20} />
              <p className="text-yellow-800">
                Complete your learning roadmap to unlock job applications. Current progress: {roadmapProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies by name, industry, or location..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* CV Generation Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Builder</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-700 mb-4">
                  Generate a professional resume based on your completed learning roadmap and achievements.
                  {roadmapCompleted ? " Your roadmap is complete, so you can generate your resume now." : 
                  ` You need to complete your learning roadmap (currently ${roadmapProgress}% complete) to unlock this feature.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={generateCV}
                    disabled={!roadmapCompleted}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      roadmapCompleted
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FileText size={20} className="mr-2" />
                    Generate Resume
                  </button>
                  <button
                    onClick={downloadCV}
                    disabled={!roadmapCompleted}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      roadmapCompleted
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-2">Resume Tips</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Highlight your completed projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Include skills from your learning path</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Showcase your achievements and badges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Companies</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
                <button 
                  onClick={fetchCompanies}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}
            
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <div 
                    key={company.id} 
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCompanyClick(company)}
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                        {company.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{company.name}</h3>
                        <p className="text-gray-600 text-sm">{company.industry}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-2" />
                        {company.location}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Briefcase size={16} className="mr-2" />
                        {company.employees} employees
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {company.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {company.postedJobs} jobs
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                        View Details
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Company Profile Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                    {selectedCompany.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                    <p className="text-gray-600">{selectedCompany.industry}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{selectedCompany.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building size={18} className="mr-2" />
                  <span>{selectedCompany.employees} employees</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase size={18} className="mr-2" />
                  <span>{selectedCompany.postedJobs} available positions</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{selectedCompany.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Your Profile</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <User size={16} className="mr-2 text-gray-600" />
                    <span className="font-medium">
                      {userProfile?.first_name} {userProfile?.last_name}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Mail size={16} className="mr-2 text-gray-600" />
                    <span>{userProfile?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-gray-600" />
                    <span>{userProfile?.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              
              {/* Show warning if roadmap is not completed */}
              {!roadmapCompleted && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="text-yellow-600 mr-2" size={18} />
                    <p className="text-yellow-800 text-sm">
                      You need to complete your learning roadmap (currently {roadmapProgress}% complete) before you can apply for jobs.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleApply(selectedCompany.id)}
                  disabled={!roadmapCompleted}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
                    roadmapCompleted
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Check size={20} className="mr-2" />
                  Apply Now
                </button>
                <button
                  onClick={handleIgnore}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                >
                  <X size={20} className="mr-2" />
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationsPage;