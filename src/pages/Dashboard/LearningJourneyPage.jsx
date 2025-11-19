import { useState, useEffect } from 'react';
import { ChevronRight, Lock, Check, Flame, RefreshCw } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const LearningJourneyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [latestRoadmap, setLatestRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch roadmaps when component mounts
  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      // Get token from localStorage (consistent with login page)
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // Fetch all roadmaps
      const roadmapsResponse = await api.get("/auth/student/roadmaps");
      setRoadmaps(roadmapsResponse.data);
      
      // Fetch latest roadmap
      const latestResponse = await api.get("/auth/student/roadmap/latest");
      
      // Extract roadmap content from the data object
      const roadmapData = latestResponse.data?.data?.roadmap_content || latestResponse.data?.roadmap_content || latestResponse.data;
      setLatestRoadmap(roadmapData);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewRoadmap = async () => {
    setGenerating(true);
    try {
      // Get token from localStorage (consistent with login page)
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // Generate new roadmap
      const generateResponse = await api.post("/auth/student/generate-roadmap");
      
      // Extract roadmap content from the data object
      const roadmapData = generateResponse.data?.data?.roadmap_content || generateResponse.data?.roadmap_content || generateResponse.data;
      
      // Set the latest roadmap directly instead of refetching
      setLatestRoadmap(roadmapData);
      
      // Also refresh all roadmaps
      const roadmapsResponse = await api.get("/auth/student/roadmaps");
      setRoadmaps(roadmapsResponse.data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setGenerating(false);
    }
  };

  const openDayDetails = (day) => {
    setSelectedDay(day);
  };

  const closeDayDetails = () => {
    setSelectedDay(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-white" />;
      case 'in-progress':
        return <Flame className="w-4 h-4 text-white" />;
      default:
        return <Lock className="w-4 h-4 text-white" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  // Transform roadmap data into learning journey format
  const transformRoadmapToLearningJourney = (roadmap) => {
    // Handle the case where roadmap is a string (as shown in the API response)
    if (typeof roadmap === 'string') {
      const parsed = parseRoadmapString(roadmap);
      // If parsing didn't work well, try generic parsing
      if (parsed.length === 0 || (parsed.length === 1 && parsed[0].objective === 'Complete this phase')) {
        const genericParsed = parseGenericRoadmap(roadmap);
        if (genericParsed.length > 0) {
          return genericParsed;
        }
      }
      // If parsing didn't work, create a fallback entry
      if (parsed.length === 0) {
        return [{
          id: 1,
          day: 'Overview',
          title: 'AI & Machine Learning Roadmap',
          status: 'in-progress',
          objective: roadmap.substring(0, 200) + '...',
          resources: [],
          duration: 'Varies',
          challenge: 'Follow the roadmap to learn AI & ML'
        }];
      }
      return parsed;
    }
    
    // Handle object format with modules
    if (!roadmap || !roadmap.modules) {
      return [];
    }
    
    return roadmap.modules.map((module, index) => ({
      id: module.id || index + 1,
      day: `Module ${index + 1}`,
      title: module.title || `Module ${index + 1}`,
      status: module.status || 'locked',
      objective: module.description || 'Complete this module',
      resources: module.resources || [],
      duration: module.duration || 'N/A',
      challenge: module.challenge || 'Practice what you learned'
    }));
  };

  // Parse roadmap string into learning journey format
  const parseRoadmapString = (roadmapString) => {
    if (!roadmapString) return [];
    
    console.log("Parsing roadmap string:", roadmapString);
    
    // Split the roadmap into sections by "**" which indicates major sections
    const sections = roadmapString.split('**');
    
    // Find the Phase-by-Phase Plan section
    const phasePlanIndex = sections.findIndex(section => section.includes('Phase-by-Phase Plan'));
    
    if (phasePlanIndex === -1 || phasePlanIndex + 1 >= sections.length) {
      // If we can't find the phase plan, try to parse as generic markdown
      return parseGenericRoadmap(roadmapString);
    }
    
    // Get the content after "Phase-by-Phase Plan"
    const phaseContent = sections[phasePlanIndex + 1];
    
    // Split into phases by "**Phase"
    const phaseSections = phaseContent.split(/\*\*Phase \d+:/);
    
    // Extract phases (skip the first section which is the header)
    const phases = phaseSections.slice(1).map((phase, index) => {
      const lines = phase.trim().split('\n').filter(line => line.trim() !== '');
      
      // Extract title (first line after phase header)
      let title = `Phase ${index + 1}`;
      if (lines.length > 0) {
        // Look for the phase title in the first few lines
        for (let i = 0; i < Math.min(3, lines.length); i++) {
          if (lines[i].includes('(') && lines[i].includes(')')) {
            title = lines[i].replace(/\*/g, '').replace(/:+/g, '').trim();
            break;
          }
        }
      }
      
      // Find topics and extract objectives
      let objectives = [];
      let inTopicsSection = false;
      
      for (const line of lines) {
        if (line.includes('Topics:')) {
          inTopicsSection = true;
          continue;
        }
        
        // Stop when we hit the next section
        if (inTopicsSection && (line.startsWith('**') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.'))) {
          if (!line.includes('Topics:')) {
            inTopicsSection = false;
          }
        }
        
        // Collect topics while in topics section
        if (inTopicsSection && (line.trim().startsWith('*') || line.trim().startsWith('\t*'))) {
          const cleanLine = line
            .replace(/\*/g, '')
            .replace(/\t/g, '')
            .trim();
          if (cleanLine) {
            objectives.push(cleanLine);
          }
        }
      }
      
      return {
        id: index + 1,
        day: `Weeks ${getWeeksForPhase(index + 1)}`,
        title: title,
        status: index === 0 ? 'in-progress' : 'locked',
        objective: objectives.length > 0 ? objectives.slice(0, 3).join(', ') : 'Complete this phase',
        resources: [],
        duration: getDurationForPhase(index + 1),
        challenge: `Complete all tasks in ${title}`
      };
    });
    
    console.log("Parsed phases:", phases);
    return phases;
  };
  
  // Parse generic roadmap when specific format isn't found
  const parseGenericRoadmap = (roadmapString) => {
    console.log("Parsing generic roadmap");
    
    // Try to find sections that look like phases
    const phaseRegex = /\*\*Phase \d+.*?\*\*/g;
    const phaseMatches = [...roadmapString.matchAll(phaseRegex)];
    
    if (phaseMatches.length > 0) {
      return phaseMatches.map((match, index) => {
        const phaseText = match[0];
        // Extract phase title
        const title = phaseText.replace(/\*\*/g, '').trim();
        
        // Try to extract weeks information
        const weekMatch = phaseText.match(/\(Weeks [\d\-]+\)/);
        const day = weekMatch ? weekMatch[0].replace(/[()]/g, '') : `Phase ${index + 1}`;
        
        return {
          id: index + 1,
          day: day,
          title: title,
          status: index === 0 ? 'in-progress' : 'locked',
          objective: 'Complete this phase based on the roadmap',
          resources: [],
          duration: '5-10 hours/week',
          challenge: 'Follow the roadmap guidance'
        };
      });
    }
    
    // Try to find bullet points or numbered lists that might represent phases
    const lines = roadmapString.split('\n').filter(line => line.trim() !== '');
    const phaseLines = lines.filter(line => 
      line.trim().startsWith('*') || 
      line.trim().startsWith('-') || 
      line.trim().match(/^\d+\./)
    );
    
    if (phaseLines.length > 0) {
      return phaseLines.map((line, index) => ({
        id: index + 1,
        day: `Week ${index + 1}`,
        title: line.replace(/[*\-0-9.]/g, '').trim(),
        status: index === 0 ? 'in-progress' : 'locked',
        objective: 'Complete this section based on the roadmap',
        resources: [],
        duration: '5-10 hours/week',
        challenge: 'Follow the roadmap guidance'
      }));
    }
    
    // Fallback: create a single entry with the entire content
    return [{
      id: 1,
      day: 'Overview',
      title: 'Learning Roadmap',
      status: 'in-progress',
      objective: roadmapString.substring(0, 200) + '...',
      resources: [],
      duration: 'Varies',
      challenge: 'Follow the roadmap to achieve your goals'
    }];
  };
  
  // Helper functions for phase information
  const getWeeksForPhase = (phaseNumber) => {
    switch(phaseNumber) {
      case 1: return 'Weeks 1-8';
      case 2: return 'Weeks 9-16';
      case 3: return 'Weeks 17-24';
      default: return `Phase ${phaseNumber}`;
    }
  };
  
  const getDurationForPhase = (phaseNumber) => {
    return '5-10 hours/week';
  };
  
  // Use latest roadmap data only (no mock data fallback)
  const learningJourney = latestRoadmap 
    ? transformRoadmapToLearningJourney(latestRoadmap)
    : [];

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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">🗓️ Learning Journey</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                LJ
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Personalized Roadmap</h2>
                <p className="text-gray-600">AI-generated learning path based on your goals and progress</p>
              </div>
              <button
                onClick={generateNewRoadmap}
                disabled={generating}
                className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New Roadmap
                  </>
                )}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : learningJourney.length > 0 ? (
              <>
                {/* Timeline View */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform translate-x-1/2"></div>
                  
                  <div className="space-y-6">
                    {learningJourney.map((day, index) => (
                      <div key={day.id} className="relative flex items-start">
                        {/* Timeline node */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          day.status === 'completed' ? 'bg-green-500' : 
                          day.status === 'in-progress' ? 'bg-orange-500' : 
                          'bg-gray-300'
                        }`}>
                          {getStatusIcon(day.status)}
                        </div>
                        
                        {/* Content */}
                        <div 
                          className={`ml-6 flex-1 rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${
                            getStatusClass(day.status)
                          } ${day.status !== 'locked' ? 'hover:shadow-md' : ''}`}
                          onClick={() => openDayDetails(day)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{day.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">{day.day}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                          
                          <p className="mt-2 text-gray-700 text-sm">{day.objective}</p>
                          
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <span>{day.duration}</span>
                            <span className="mx-2">•</span>
                            <span>{day.resources.length} resources</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No roadmap available</h3>
                <p className="text-gray-500 mb-6">Generate your first personalized learning roadmap</p>
                <button
                  onClick={generateNewRoadmap}
                  disabled={generating}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Your First Roadmap
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Day Details Modal */}
        {selectedDay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDay.title}</h2>
                    <p className="text-gray-600">{selectedDay.day}</p>
                  </div>
                  <button 
                    onClick={closeDayDetails}
                    className="text-gray-400 hover:text-gray-500 text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Learning Objective</h3>
                  <p className="text-gray-700">{selectedDay.objective}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Resources</h3>
                  <ul className="space-y-2">
                    {selectedDay.resources && selectedDay.resources.length > 0 ? (
                      selectedDay.resources.map((resource, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                          <p className="ml-2 text-gray-700">{resource}</p>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No resources available</li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Estimated Duration</h3>
                  <p className="text-gray-700">{selectedDay.duration}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Related Challenge/Milestones</h3>
                  <p className="text-gray-700">{selectedDay.challenge}</p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={closeDayDetails}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningJourneyPage;