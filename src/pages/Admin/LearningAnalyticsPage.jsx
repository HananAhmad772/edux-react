import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Users,
  Bot
} from 'lucide-react';

const LearningAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('weekly');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setTimeRange('daily')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'daily' 
                ? 'bg-blue-600 text-white' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTimeRange('weekly')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'weekly' 
                ? 'bg-blue-600 text-white' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'monthly' 
                ? 'bg-blue-600 text-white' 
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Engagement Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Daily Engagement</h3>
          <div className="h-64 flex items-end justify-between">
            {[45, 62, 58, 75, 68, 82, 70].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg hover:opacity-75 transition-opacity"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">D{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Engagement</h3>
          <div className="h-64 flex items-end justify-between">
            {[120, 180, 150, 220, 190, 250, 210].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg hover:opacity-75 transition-opacity"
                  style={{ height: `${value / 3}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Average Learning Time */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Average Learning Time per Session</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">24m</p>
            <p className="text-sm text-gray-600">Monday</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">32m</p>
            <p className="text-sm text-gray-600">Tuesday</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">28m</p>
            <p className="text-sm text-gray-600">Wednesday</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">35m</p>
            <p className="text-sm text-gray-600">Thursday</p>
          </div>
        </div>
      </div>

      {/* Project Success Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Project Success Rate</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">425</p>
              <p className="text-sm text-gray-600">Projects Approved</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">75</p>
              <p className="text-sm text-gray-600">Projects Rejected</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Top Performing Students</h3>
          <div className="space-y-4">
            {[
              { name: 'Hannan Ahmad', progress: 95, consistency: 'High' },
              { name: 'Sarah Johnson', progress: 92, consistency: 'High' }, 
              { name: 'Mike Chen', progress: 88, consistency: 'Medium' },
              { name: 'Emma Wilson', progress: 85, consistency: 'High' },
              { name: 'John Davis', progress: 82, consistency: 'Medium' }
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Consistency: {student.consistency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{student.progress}%</p>
                  <p className="text-sm text-gray-500">Progress</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Efficiency Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">AI Efficiency Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <span className="text-lg font-bold text-green-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Average Feedback Rating</p>
              <span className="text-lg font-bold text-blue-600">4.7/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Improvement Over Time</p>
              <span className="text-lg font-bold text-purple-600">+15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropout Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Dropout Analysis</h3>
        <div className="h-64 flex items-end justify-between">
          {[
            { stage: 'Registration', dropouts: 120 },
            { stage: 'First Lesson', dropouts: 85 },
            { stage: 'First Project', dropouts: 60 },
            { stage: 'Midpoint', dropouts: 35 },
            { stage: 'Final Project', dropouts: 15 }
          ].map((stage, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-2">
              <div 
                className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t-lg hover:opacity-75 transition-opacity"
                style={{ height: `${(120 - stage.dropouts) * 2}px` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2 text-center">{stage.stage}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Most dropouts occur after the first lesson (29% attrition rate)</p>
        </div>
      </div>
    </div>
  );
};

export default LearningAnalyticsPage;