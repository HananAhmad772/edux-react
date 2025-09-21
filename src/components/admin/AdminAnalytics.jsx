import { useState } from 'react';
import { Eye, Users, TrendingUp, Clock, BarChart3, PieChart, Monitor, Smartphone, Activity } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const analyticsData = {
    overview: [
      { title: 'Page Views', value: '2.4M', change: '+18.2%', icon: Eye, color: 'from-blue-500 to-blue-600' },
      { title: 'Unique Visitors', value: '856K', change: '+12.5%', icon: Users, color: 'from-purple-500 to-purple-600' },
      { title: 'Bounce Rate', value: '24.3%', change: '-5.2%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
      { title: 'Avg Session', value: '4m 32s', change: '+8.1%', icon: Clock, color: 'from-orange-500 to-orange-600' }
    ],
    traffic: [
      { source: 'Direct', percentage: 45, color: 'bg-blue-500' },
      { source: 'Search Engines', percentage: 28, color: 'bg-purple-500' },
      { source: 'Social Media', percentage: 15, color: 'bg-green-500' },
      { source: 'Referrals', percentage: 12, color: 'bg-orange-500' }
    ],
    devices: [
      { device: 'Desktop', percentage: 62, icon: Monitor, color: 'bg-blue-500' },
      { device: 'Mobile', percentage: 30, icon: Smartphone, color: 'bg-purple-500' },
      { device: 'Tablet', percentage: 8, icon: Monitor, color: 'bg-green-500' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <p className={`text-sm font-medium mt-1 ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 55, 45, 60, 75, 65, 80, 85, 90, 95, 88, 92].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.traffic.map((source, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 ${source.color} rounded`}></div>
                <span className="flex-1 text-sm font-medium text-gray-700">{source.source}</span>
                <span className="text-sm text-gray-500">{source.percentage}%</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 ${source.color} rounded-full`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.devices.map((device, index) => {
            const Icon = device.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-12 h-12 text-gray-400 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{device.percentage}%</p>
                    <p className="text-sm text-gray-600">{device.device}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 ${device.color} rounded-full`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Load Time</h4>
            <p className="text-2xl font-bold text-blue-600">2.3s</p>
            <p className="text-xs text-blue-600">Average page load</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-green-800 mb-2">Uptime</h4>
            <p className="text-2xl font-bold text-green-600">99.9%</p>
            <p className="text-xs text-green-600">Last 30 days</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-purple-800 mb-2">Error Rate</h4>
            <p className="text-2xl font-bold text-purple-600">0.1%</p>
            <p className="text-xs text-purple-600">Server errors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
