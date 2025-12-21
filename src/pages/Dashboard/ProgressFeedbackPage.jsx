import { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Calendar, Loader2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const ProgressFeedbackPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/auth/student/progress');
        setProgressData(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load progress data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

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
                <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">📊 Progress & Feedback</h1>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  PF
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading your progress data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
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
                <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">📊 Progress & Feedback</h1>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  PF
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center bg-white rounded-xl shadow-sm p-8 max-w-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Extract data with fallbacks
  const xp = progressData?.xp || 0;
  const streak = progressData?.streak || 0;
  const currentWeek = progressData?.current_week || { week_number: 1, week_name: 'Week 1', step_title: 'Getting Started', current_day: 1 };
  const weeklyActivity = progressData?.weekly_activity?.days || [];
  const skillMastery = progressData?.skill_mastery?.skills || [];
  const aiInsights = progressData?.ai_insights ? [
    progressData.ai_insights.motivational_message || "Keep up the good work!",
    `Completion rate: ${progressData.ai_insights.completion_rate || 0}%`,
    `Challenges completed: ${progressData.ai_insights.challenges_completed || 0}`
  ] : ["Start your learning journey today!", "Complete challenges to earn XP.", "Consistent practice leads to mastery."];
  const feedbackHistory = progressData?.feedback_history || [];

  // Calculate XP progress
  const xpProgress = {
    current: xp,
    nextLevel: xp + 1000, // Simplified calculation
    percentage: Math.min(100, Math.max(0, xp / (xp + 1000) * 100))
  };

  // Format weekly activity for chart
  const formattedWeeklyActivity = weeklyActivity.map(day => ({
    day: day.day,
    hours: Math.round(day.time_spent_minutes / 60 * 10) / 10 // Convert minutes to hours
  }));

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
                {formattedWeeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 px-2">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg hover:opacity-75 transition-opacity"
                      style={{ height: `${Math.min(100, (day.hours / 10) * 100)}%` }}
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
                {skillMastery.length > 0 ? (
                  skillMastery.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{skill.name || skill.skill}</span>
                        <span className="text-gray-500">{skill.mastery || skill.level || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${skill.mastery || skill.level || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No skill data available yet. Complete challenges to see your progress.
                  </div>
                )}
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
              {feedbackHistory.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feedbackHistory.map((feedback, index) => (
                      <tr key={feedback.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.topic || 'Challenge'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            (feedback.points_earned || feedback.marks || 0) >= 50 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {feedback.points_earned || feedback.marks || 0}/100
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-md overflow-hidden">
                            {feedback.feedback ? (
                              <>
                                {feedback.feedback.substring(0, 100)}
                                {feedback.feedback.length > 100 ? '...' : ''}
                              </>
                            ) : (
                              'No feedback available'
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No feedback history yet. Complete challenges to receive AI feedback.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgressFeedbackPage;