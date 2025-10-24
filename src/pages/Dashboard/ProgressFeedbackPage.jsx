import { useState } from 'react';
import { TrendingUp, Target, Award, Calendar } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const ProgressFeedbackPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for XP progress
  const xpProgress = {
    current: 1250,
    nextLevel: 2000,
    percentage: 62.5
  };

  // Mock data for weekly activity
  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 8.0 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 3.8 }
  ];

  // Mock data for skill mastery
  const skillMastery = [
    { skill: 'Python Basics', mastery: 70 },
    { skill: 'Conditions & Logic', mastery: 85 },
    { skill: 'Loops', mastery: 65 },
    { skill: 'Functions', mastery: 40 },
    { skill: 'Data Structures', mastery: 25 }
  ];

  // Mock data for AI insights
  const aiInsights = [
    "You're excelling in loops but need to review functions. Want a quick recap?",
    "Your consistency is impressive! Keep up the 5-day streak.",
    "Try spending more time on data structures for better understanding."
  ];

  // Mock data for feedback history
  const feedbackHistory = [
    { date: 'Oct 18', projectName: 'Loops Project', marks: '8/10', feedback: 'Missed edge cases' },
    { date: 'Oct 19', projectName: 'Calculator App', marks: '9/10', feedback: 'Well structured code' },
    { date: 'Oct 20', projectName: 'Condition Challenge', marks: '7/10', feedback: 'Good logic, needs better error handling' },
    { date: 'Oct 21', projectName: 'Function Exercise', marks: '6/10', feedback: 'Function concepts need review' },
    { date: 'Oct 22', projectName: 'Data Structure Task', marks: '5/10', feedback: 'Basic implementation, lacks optimization' }
  ];

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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">📊 Progress & Feedback</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                PF
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* XP Progress Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="mr-2" size={24} />
              XP Progress
            </h2>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{xpProgress.current} XP</span>
                <span>{xpProgress.nextLevel} XP to next level</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full" 
                style={{ width: `${xpProgress.percentage}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right text-sm text-gray-500">
              {xpProgress.percentage.toFixed(1)}% to next level
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2" size={24} />
                Weekly Activity
              </h2>
              <div className="flex items-end justify-between h-48 mt-8">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 px-2">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg hover:opacity-75 transition-opacity"
                      style={{ height: `${(day.hours / 10) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2">{day.hours}h</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Mastery Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2" size={24} />
                Skill Mastery
              </h2>
              <div className="space-y-4 mt-6">
                {skillMastery.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{skill.skill}</span>
                      <span className="text-gray-500">{skill.mastery}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.mastery}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI Insights</h2>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="mr-2" size={24} />
              Feedback History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Feedback</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedbackHistory.map((feedback, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.projectName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {feedback.marks}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{feedback.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgressFeedbackPage;