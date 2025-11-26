import { useState, useEffect } from 'react';
import { ChevronRight, Lock, Check, Flame, RefreshCw, Info } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const LearningJourneyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);
  const [latestRoadmap, setLatestRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [notification, setNotification] = useState(null); // For showing API messages

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
      showNotification('Error fetching roadmaps', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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
      
      // Show success message
      showNotification(generateResponse.data.message || 'Roadmap generated successfully', 'success');
      
      // Extract roadmap content from the data object
      const roadmapData = generateResponse.data?.data?.roadmap_content || generateResponse.data?.roadmap_content || generateResponse.data;
      
      // Set the latest roadmap directly instead of refetching
      setLatestRoadmap(roadmapData);
      
      // Also refresh all roadmaps
      const roadmapsResponse = await api.get("/auth/student/roadmaps");
      setRoadmaps(roadmapsResponse.data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      // Show error message
      const errorMessage = error.response?.data?.message || 'Error generating roadmap';
      showNotification(errorMessage, 'error');
    } finally {
      setGenerating(false);
    }
  };

  const openDayDetails = (day) => {
    // Normalize the roadmap data when opening day details
    const normalizedDay = {
      ...day,
      ...normalizeRoadmap(day)
    };
    setSelectedDay(normalizedDay);
  };

  const closeDayDetails = () => {
    setSelectedDay(null);
  };

  // Function to normalize roadmap data
  function normalizeRoadmap(aiStep) {
    return {
      topics: aiStep["Topics to study"] || [],
      tools: aiStep["Tools to use"] || [],
      skills: aiStep["Skills learned"] || [],
      tasks: aiStep["Mini practice tasks"] || [],
      duration: aiStep["Estimated Duration"] || "",
      challenge: aiStep["Related Challenge/Milestones"] || "",
      resources: aiStep.resources || []
    };
  }

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
      const parsed = parseRoadmapWeeks(roadmap);
      // If parsing didn't work, fall back to the previous method
      if (parsed.length === 0) {
        return parseRoadmapString(roadmap);
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
      "Topics to study": module.topics || [],
      "Tools to use": module.tools || [],
      "Skills learned": module.skills || [],
      "Mini practice tasks": module.tasks || [],
      "Estimated Duration": module.duration || 'N/A',
      "Related Challenge/Milestones": module.challenge || 'Practice what you learned'
    }));
  };

  // Parse roadmap string into learning journey format
  const parseRoadmapString = (roadmapString) => {
    if (!roadmapString) return [];
    
    // Split the roadmap into sections by "**" which indicates major sections
    const sections = roadmapString.split('**');
    
    // Find the Phase-by-Phase Plan section or Learning Roadmap section
    const phasePlanIndex = sections.findIndex(section => 
      section.includes('Phase-by-Phase Plan') || 
      section.includes('Learning Roadmap') ||
      section.includes('Week 1') ||
      section.includes('Weeks')
    );
    
    if (phasePlanIndex === -1 || phasePlanIndex + 1 >= sections.length) {
      // If we can't find the phase plan, try to parse as generic markdown
      return parseGenericRoadmap(roadmapString);
    }
    
    // Get the content after the roadmap section header
    const phaseContent = sections[phasePlanIndex + 1];
    
    // Split into weeks/phases by "**Week" or similar patterns
    const phaseSections = phaseContent.split(/\*\*Week |\*\*Phase \d+:/);
    
    // Extract phases (skip the first section which is the header)
    const phases = phaseSections.slice(1).map((phase, index) => {
      const lines = phase.trim().split('\n').filter(line => line.trim() !== '');
      
      // Extract title (first line after phase header)
      let title = `Week ${index + 1}`;
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
        if (line.includes('Concepts:') || line.includes('Skills gained:') || line.includes('Expected outcome:')) {
          inTopicsSection = true;
          continue;
        }
        
        // Stop when we hit the next section
        if (inTopicsSection && (line.startsWith('**') || line.startsWith('- ') || line.match(/^\d+\./))) {
          if (!line.includes('Concepts:') && !line.includes('Skills gained:') && !line.includes('Expected outcome:')) {
            // Continue collecting if it's a list item
            if (!line.startsWith('- ') && !line.match(/^\d+\./)) {
              inTopicsSection = false;
            }
          }
        }
        
        // Collect topics while in topics section
        if (inTopicsSection && (line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
          const cleanLine = line
            .replace(/[-*]/g, '')
            .replace(/\t/g, '')
            .trim();
          if (cleanLine) {
            objectives.push(cleanLine);
          }
        }
      }
      
      return {
        id: index + 1,
        day: getTitleForWeek(index + 1),
        title: title,
        status: index === 0 ? 'in-progress' : 'locked',
        objective: objectives.length > 0 ? objectives.slice(0, 3).join(', ') : 'Complete this phase',
        resources: [],
        duration: getDurationForPhase(index + 1),
        challenge: `Complete all tasks in ${title}`
      };
    });
    
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
  const getTitleForWeek = (weekNumber) => {
    if (weekNumber <= 2) return 'Weeks 1-2';
    if (weekNumber <= 4) return 'Weeks 3-4';
    if (weekNumber <= 6) return 'Weeks 5-6';
    if (weekNumber <= 8) return 'Weeks 7-8';
    if (weekNumber <= 10) return 'Weeks 9-10';
    if (weekNumber <= 12) return 'Weeks 11-12';
    return `Week ${weekNumber}`;
  };
  
  const getDurationForPhase = (phaseNumber) => {
    return '5-10 hours/week';
  };
  
  // Extract explanation from roadmap string
  const extractExplanation = (roadmapString) => {
    if (!roadmapString) return "";

    // Try multiple formats for finding the explanation section
    const explanationStartMarkers = [
      'Roadmap Explanation:',
      '**Roadmap Explanation**',
      '1. Roadmap Explanation:'
    ];
    
    let explanationStartIndex = -1;
    let usedMarker = '';
    
    for (const marker of explanationStartMarkers) {
      const index = roadmapString.indexOf(marker);
      if (index !== -1) {
        explanationStartIndex = index;
        usedMarker = marker;
        break;
      }
    }
    
    if (explanationStartIndex === -1) return "";

    // Find the end of explanation (start of next major section)
    const nextSectionMarkers = [
      '**Learning Roadmap',
      '5. Learning Roadmap',
      '**Recommended Resources',
      '6. Recommended Resources'
    ];
    
    let endIndex = roadmapString.length;
    for (const marker of nextSectionMarkers) {
      const index = roadmapString.indexOf(marker, explanationStartIndex + usedMarker.length);
      if (index !== -1 && index < endIndex) {
        endIndex = index;
      }
    }

    // Extract the explanation section
    const explanation = roadmapString.substring(explanationStartIndex, endIndex).trim();
    return explanation;
  };
  
  // Extract roadmap plan from roadmap string
  const extractRoadmapPlan = (roadmapString) => {
    if (!roadmapString) return "";
    
    console.log("=== EXTRACTING ROADMAP PLAN ===");
    console.log("Input roadmap string:", roadmapString.substring(0, 200) + "..."); // First 200 chars
    
    // Find the roadmap plan section
    const roadmapStartIndex = roadmapString.indexOf('**Learning Roadmap');
    
    if (roadmapStartIndex === -1) {
      console.log("ERROR: Roadmap start index not found");
      return roadmapString; // Return entire string if no roadmap section found
    }
    
    // Extract the roadmap section
    const roadmapPlan = roadmapString.substring(roadmapStartIndex).trim();
    
    console.log("SUCCESS: Extracted roadmap plan:", roadmapPlan.substring(0, 500) + "...");
    return roadmapPlan;
  };
  
  // Extract roadmap title (e.g., "Learning Roadmap (16 weeks)")
  const extractRoadmapTitle = (roadmapString) => {
    if (!roadmapString) return "Learning Roadmap";
    
    const roadmapStartIndex = roadmapString.indexOf('**Learning Roadmap');
    if (roadmapStartIndex === -1) return "Learning Roadmap";
    
    // Find the end of the title line
    const titleEndIndex = roadmapString.indexOf('\n', roadmapStartIndex);
    if (titleEndIndex === -1) return "Learning Roadmap";
    
    // Extract and clean the title
    const title = roadmapString.substring(roadmapStartIndex + 2, titleEndIndex).trim();
    return title || "Learning Roadmap";
  };
  
  // Parse roadmap weeks data for detailed view
  const parseRoadmapWeeks = (roadmapString) => {
    if (!roadmapString) return [];
    
    // Find the roadmap plan section
    const roadmapStartIndex = roadmapString.indexOf('**Learning Roadmap');
    if (roadmapStartIndex === -1) {
      // Try alternative format
      const altRoadmapStartIndex = roadmapString.indexOf('5. Learning Roadmap');
      if (altRoadmapStartIndex === -1) return [];
      roadmapStartIndex = altRoadmapStartIndex;
    }
    
    // Get the roadmap content
    const roadmapContent = roadmapString.substring(roadmapStartIndex);
    
    // Split by week headings - try different patterns
    let weekSections = [];
    
    // Try pattern with en-dash
    if (roadmapContent.includes('–')) {
      weekSections = roadmapContent.split(/\*\*Week \d+–\d+:/);
    } 
    // Try pattern with hyphen
    else if (roadmapContent.includes('-')) {
      weekSections = roadmapContent.split(/\*\*Week \d+-\d+:/);
    }
    // Try pattern with space
    else {
      weekSections = roadmapContent.split(/\*\*Week \d+ \d+:/);
    }
    
    // Extract weeks (skip the first section which is the header)
    const weeks = weekSections.slice(1).map((week, index) => {
      const lines = week.trim().split('\n').filter(line => line.trim() !== '');
      
      // Extract title (first line after week header)
      let title = `Weeks ${index * 2 + 1}-${index * 2 + 2}`;
      if (lines.length > 0) {
        title = lines[0].replace(/\*\*/g, '').trim();
      }
      
      // Parse week details
      let topics = [];
      let tools = [];
      let skills = [];
      let tasks = [];
      let duration = "";
      let challenge = "";
      let resources = [];
      
      let currentSection = '';
      
      for (const line of lines) {
        if (line.includes('Topics to study:')) {
          currentSection = 'Topics to study';
          // Handle the case where topics are on the same line
          const topicsContent = line.replace('Topics to study:', '').trim();
          if (topicsContent) {
            // Split by comma and add each topic
            topicsContent.split(',').forEach(topic => {
              const cleanTopic = topic.replace('*', '').trim();
              if (cleanTopic) topics.push(cleanTopic);
            });
          }
          continue;
        } else if (line.includes('Tools to use:')) {
          currentSection = 'Tools to use';
          // Handle the case where tools are on the same line
          const toolsContent = line.replace('Tools to use:', '').trim();
          if (toolsContent) {
            // Split by comma and add each tool
            toolsContent.split(',').forEach(tool => {
              const cleanTool = tool.replace('*', '').trim();
              if (cleanTool) tools.push(cleanTool);
            });
          }
          continue;
        } else if (line.includes('Skills learned:')) {
          currentSection = 'Skills learned';
          // Handle the case where skills are on the same line
          const skillsContent = line.replace('Skills learned:', '').trim();
          if (skillsContent) {
            // Split by comma and add each skill
            skillsContent.split(',').forEach(skill => {
              const cleanSkill = skill.replace('*', '').trim();
              if (cleanSkill) skills.push(cleanSkill);
            });
          }
          continue;
        } else if (line.includes('Mini practice tasks or micro-projects:')) {
          currentSection = 'Mini practice tasks';
          // Handle the case where tasks are on the same line
          const tasksContent = line.replace('Mini practice tasks or micro-projects:', '').trim();
          if (tasksContent) {
            // Split by comma and add each task
            tasksContent.split(',').forEach(task => {
              const cleanTask = task.replace('*', '').trim();
              if (cleanTask) tasks.push(cleanTask);
            });
          }
          continue;
        } else if (line.includes('Estimated Duration:')) {
          currentSection = 'Estimated Duration';
          duration = line.replace('Estimated Duration:', '').trim();
          continue;
        } else if (line.includes('Related Challenge/Milestones:')) {
          currentSection = 'Related Challenge/Milestones';
          challenge = line.replace('Related Challenge/Milestones:', '').trim();
          continue;
        } else if (line.includes('Recommended Resources:') || line.includes('Resources:')) {
          currentSection = 'Recommended Resources';
          continue;
        }
        
        // Collect items for current section (for cases where items are on separate lines with asterisks)
        if (currentSection === 'Topics to study' && line.trim().startsWith('*')) {
          topics.push(line.replace('*', '').trim());
        } else if (currentSection === 'Tools to use' && line.trim().startsWith('*')) {
          tools.push(line.replace('*', '').trim());
        } else if (currentSection === 'Skills learned' && line.trim().startsWith('*')) {
          skills.push(line.replace('*', '').trim());
        } else if (currentSection === 'Mini practice tasks' && line.trim().startsWith('*')) {
          tasks.push(line.replace('*', '').trim());
        } else if (currentSection === 'Recommended Resources' && line.trim().startsWith('*')) {
          resources.push(line.replace('*', '').trim());
        } else if (currentSection === 'Estimated Duration' && !duration) {
          duration = line.trim();
        } else if (currentSection === 'Related Challenge/Milestones' && !challenge) {
          challenge = line.trim();
        }
      }
      
      return {
        id: index + 1,
        title: title,
        day: `Weeks ${index * 2 + 1}-${index * 2 + 2}`,
        status: index === 0 ? 'in-progress' : 'locked',
        objective: skills.length > 0 ? skills.slice(0, 2).join(', ') : 'Complete this week',
        resources: resources,
        "Topics to study": topics,
        "Tools to use": tools,
        "Skills learned": skills,
        "Mini practice tasks": tasks,
        "Estimated Duration": duration,
        "Related Challenge/Milestones": challenge
      };
    });
    
    return weeks;
  };
  
  // Format explanation text for display
  const formatExplanation = (explanation) => {
    if (!explanation) return "";
    
    // Convert markdown to HTML-like structure for display
    let formatted = explanation
      .replace(/Roadmap Explanation:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Roadmap Explanation</h3>')
      .replace(/Key Highlights:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Key Highlights</h3>')
      .replace(/Current Skill Assessment:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Current Skill Assessment</h3>')
      .replace(/Strengths:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Strengths:</h4>')
      .replace(/Weaknesses:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Weaknesses:</h4>')
      .replace(/Gaps detected from quiz performance:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Gaps detected from quiz performance:</h4>')
      .replace(/Learning Objectives:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Learning Objectives</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\n\s*•\s*/g, '<br/>• ')
      .replace(/^• /gm, '• ')
      .replace(/\n/g, '<br/>');
    
    // Add some spacing between sections
    formatted = formatted.replace(/<br\/>(<h[34])/g, '<br/><br/>$1');
    
    return formatted;
  };
  
  // Extract recommended resources section
  const extractRecommendedResources = (roadmapString) => {
    if (!roadmapString) return "";
    
    const resourcesStartIndex = roadmapString.indexOf('Recommended Resources:');
    const timelineStartIndex = roadmapString.indexOf('Timeline & Milestones:');
    
    if (resourcesStartIndex === -1) return "";
    
    // Determine the end of resources content
    const endIndex = timelineStartIndex !== -1 ? timelineStartIndex : roadmapString.length;
    
    // Extract the resources section
    const resources = roadmapString.substring(resourcesStartIndex, endIndex).trim();
    
    return resources;
  };
  
  // Extract timeline and milestones section
  const extractTimelineMilestones = (roadmapString) => {
    if (!roadmapString) return "";
    
    const timelineStartIndex = roadmapString.indexOf('Timeline & Milestones:');
    
    if (timelineStartIndex === -1) return "";
    
    // Extract the timeline section (to the end of the string)
    const timeline = roadmapString.substring(timelineStartIndex).trim();
    
    return timeline;
  };
  
  // Format recommended resources for display
  const formatRecommendedResources = (resources) => {
    if (!resources) return "";
    
    // Convert markdown to HTML-like structure for display
    let formatted = resources
      .replace(/Recommended Resources:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Recommended Resources</h3>')
      .replace(/Courses:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Courses:</h4>')
      .replace(/Tutorials:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Tutorials:</h4>')
      .replace(/Documentation:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">Documentation:</h4>')
      .replace(/GitHub repos:/g, '<h4 class="font-bold mt-3 mb-1 text-gray-800">GitHub Repositories:</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\n\s*•\s*/g, '<br/>• ')
      .replace(/^• /gm, '• ')
      .replace(/\n/g, '<br/>');
    
    return formatted;
  };
  
  // Format timeline and milestones for display
  const formatTimelineMilestones = (timeline) => {
    if (!timeline) return "";
    
    // Convert markdown to HTML-like structure for display
    let formatted = timeline
      .replace(/Timeline & Milestones:/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-blue-800">Timeline & Milestones</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\n\s*•\s*/g, '<br/>• ')
      .replace(/^• /gm, '• ')
      .replace(/\n/g, '<br/>');
    
    return formatted;
  };
  
  // Use latest roadmap data only (no mock data fallback)
  const learningJourney = latestRoadmap 
    ? transformRoadmapToLearningJourney(
        extractRoadmapPlan(latestRoadmap) || latestRoadmap
      )
    : [];
  
  console.log("Learning journey:", learningJourney);

  const explanation = latestRoadmap 
    ? extractExplanation(latestRoadmap)
    : "";
  
  const roadmapTitle = latestRoadmap 
    ? extractRoadmapTitle(latestRoadmap)
    : "Learning Roadmap";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
          notification.type === 'error' ? 'bg-red-500 text-white' :
          notification.type === 'success' ? 'bg-green-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center">
            <span>{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
                <h2 className="text-2xl font-bold text-gray-900">{roadmapTitle}</h2>
                <p className="text-gray-600">AI-generated learning path based on your goals and progress</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {latestRoadmap && (
                  <>
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                    </button>
                    {/* <button
                      onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      {showAdditionalInfo ? 'Hide Roadmap Details' : 'Show Roadmap Details'}
                    </button> */}
                  </>
                )}
                {/* hannan just fr testing purpose.  */}
                <button
                  onClick={generateNewRoadmap}
                  disabled={generating}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
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
            </div>

            {showExplanation && explanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Why this roadmap?</h3>
                <div 
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: formatExplanation(explanation) }}
                />
              </div>
            )}

            {showAdditionalInfo && latestRoadmap && (
              <>
                {/* Recommended Resources Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Recommended Resources</h3>
                  <div 
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ 
                      __html: formatRecommendedResources(
                        extractRecommendedResources(latestRoadmap)
                      ) 
                    }}
                  />
                </div>
                
                {/* Timeline & Milestones Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Timeline & Milestones</h3>
                  <div 
                    className="text-gray-700 text-sm"
                    dangerouslySetInnerHTML={{ 
                      __html: formatTimelineMilestones(
                        extractTimelineMilestones(latestRoadmap)
                      ) 
                    }}
                  />
                </div>
              </>
            )}

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
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Topics to Study</h3>
                  <ul className="space-y-2">
                    {selectedDay.topics && selectedDay.topics.length > 0 ? (
                      selectedDay.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                          <p className="ml-2 text-gray-700">{topic}</p>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No topics specified</li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Tools to Use</h3>
                  <ul className="space-y-2">
                    {selectedDay.tools && selectedDay.tools.length > 0 ? (
                      selectedDay.tools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                          <p className="ml-2 text-gray-700">{tool}</p>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No tools specified</li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Skills Learned</h3>
                  <ul className="space-y-2">
                    {selectedDay.skills && selectedDay.skills.length > 0 ? (
                      selectedDay.skills.map((skill, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                          <p className="ml-2 text-gray-700">{skill}</p>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No skills specified</li>
                    )}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Practice Tasks & Challenges</h3>
                  <ul className="space-y-2">
                    {/* Display practice tasks */}
                    {selectedDay.tasks && selectedDay.tasks.length > 0 ? (
                      selectedDay.tasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                          <p className="ml-2 text-gray-700">{task}</p>
                        </li>
                      ))
                    ) : null}
                    
                    {/* Display related challenges/milestones */}
                    {selectedDay.challenge ? (
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                        <p className="ml-2 text-gray-700">{selectedDay.challenge}</p>
                      </li>
                    ) : null}
                    
                    {/* Show message if no tasks or challenges */}
                    {(!selectedDay.tasks || selectedDay.tasks.length === 0) && !selectedDay.challenge && (
                      <li className="text-gray-500">No practice tasks or challenges specified</li>
                    )}
                  </ul>
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