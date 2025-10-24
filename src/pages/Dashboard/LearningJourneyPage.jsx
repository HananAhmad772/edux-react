import { useState } from 'react';
import { ChevronRight, Lock, Check, Flame } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const LearningJourneyPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for learning journey
  const learningJourney = [
    {
      id: 1,
      day: "Day 1",
      title: "Introduction to Python",
      status: "completed",
      objective: "Understand the basics of Python programming language",
      resources: ["Video: Python Basics (15 min)", "Article: Python Syntax Guide"],
      duration: "2 hours",
      challenge: "Write a simple 'Hello, World!' program"
    },
    {
      id: 2,
      day: "Day 2",
      title: "Conditions & Logic",
      status: "completed",
      objective: "Learn to use conditional statements and logical operators",
      resources: ["Video: If-Else Statements (20 min)", "Practice: Conditional Challenges"],
      duration: "2.5 hours",
      challenge: "Create a simple number guessing game"
    },
    {
      id: 3,
      day: "Day 3",
      title: "Loops",
      status: "in-progress",
      objective: "Master for and while loops in Python",
      resources: ["Video: Looping in Python (25 min)", "Article: Loop Best Practices"],
      duration: "3 hours",
      challenge: "Build a multiplication table generator"
    },
    {
      id: 4,
      day: "Day 4",
      title: "Functions",
      status: "locked",
      objective: "Learn to create and use functions in Python",
      resources: ["Video: Functions in Python (30 min)", "Practice: Function Exercises"],
      duration: "2.5 hours",
      challenge: "Create a calculator with custom functions"
    },
    {
      id: 5,
      day: "Day 5",
      title: "Mini Project 1",
      status: "locked",
      objective: "Apply all learned concepts in a practical project",
      resources: ["Project Guide: Simple Task Manager", "Code Review Checklist"],
      duration: "4 hours",
      challenge: "Build a personal task manager application"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check size={20} className="text-green-500" />;
      case 'in-progress':
        return <Flame size={20} className="text-orange-500" />;
      case 'locked':
        return <Lock size={20} className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in-progress':
        return 'border-orange-500 bg-orange-50';
      case 'locked':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-200';
    }
  };

  const openDayDetails = (day) => {
    if (day.status !== 'locked') {
      setSelectedDay(day);
    }
  };

  const closeDayDetails = () => {
    setSelectedDay(null);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Roadmap</h2>
            <p className="text-gray-600 mb-6">AI-generated learning path based on your goals and progress</p>

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
                          <p className="text-gray-600 text-sm">{day.day}</p>
                        </div>
                        {day.status !== 'locked' && (
                          <ChevronRight size={20} className="text-gray-400" />
                        )}
                      </div>
                      
                      <p className="mt-2 text-gray-700">{day.objective}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {day.duration}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {day.challenge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    {selectedDay.resources.map((resource, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                        <p className="ml-2 text-gray-700">{resource}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Estimated Duration</h3>
                  <p className="text-gray-700">{selectedDay.duration}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Related Challenge</h3>
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