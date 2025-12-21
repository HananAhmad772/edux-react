import { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/axios';

const DailyChallengePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchChallengeRef = useRef(false);

  // State to control visibility of different sections
  const [showInstructions, setShowInstructions] = useState(false);
  const [showExpectedOutcome, setShowExpectedOutcome] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch daily challenge from API
  useEffect(() => {
    // Prevent double execution in development due to React Strict Mode
    if (fetchChallengeRef.current) {
      return;
    }
    
    fetchChallengeRef.current = true;
    
    const fetchDailyChallenge = async () => {
      try {
        setLoading(true);
        const response = await api.get('/auth/student/daily-challenge');
        console.log('Daily challenge response:', response);
        setChallenge(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching daily challenge:', err);
        console.error('Error response:', err.response);
        
        // More detailed error messaging
        let errorMessage = 'Failed to load daily challenge. Please try again later.';
        
        if (err.response) {
          // Server responded with error status
          if (err.response.status === 404) {
            errorMessage = 'User progress not found. Please complete your profile and generate a learning roadmap first.';
          } else if (err.response.status === 403) {
            errorMessage = 'Access denied. Please make sure you are logged in and have completed your profile.';
          } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.data?.detail) {
            errorMessage = err.response.data.detail;
          } else {
            // Show the actual error status and message
            errorMessage = `Server Error ${err.response.status}: ${err.response.statusText || 'Unknown error'}`;
          }
        } else if (err.request) {
          // Request was made but no response received
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyChallenge();
  }, []);

  const handleSubmit = async () => {
    if (!code.trim() || !challenge) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit the code for evaluation
      // Updated to match the expected backend structure
      const response = await api.post('/auth/student/daily-challenge/submit', {
        challenge_id: challenge.id,
        submission: code  // Changed from 'code' to 'submission' to match backend expectation
      });
      
      setEvaluation({
        marks: response.data.data.points_earned,
        feedback: response.data.data.ai_feedback || "Good job! Your solution demonstrates understanding of the topic.",
        passed: response.data.data.is_completed
      });
    } catch (err) {
      console.error('Error submitting challenge:', err);
      console.error('Error response:', err.response);
      
      // More detailed error messaging for submission
      let errorMessage = "There was an error evaluating your submission. Please try again.";
      
      if (err.response) {
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.status === 422) {
          errorMessage = "Validation error. Please check your submission and try again.";
        }
      }
      
      setEvaluation({
        marks: 0,
        feedback: errorMessage,
        passed: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setEvaluation(null);
    setCode('');
  };

  const handleUnlockNext = () => {
    alert("Next day unlocked! You'll be redirected to the next lesson.");
  };

  // const parseChallengeDescription = (description) => {
  //   try {
  //     if (typeof description === 'string') {
  //       // Remove trailing quotes if present
  //       const cleaned = description.trim().replace(/^"+|"+$/g, '');
  //       const parsed = JSON.parse(cleaned);
  //       return parsed;
  //     }
  //     if (typeof description === 'object' && description !== null) {
  //       return description;
  //     }
  //     return { description };
  //   } catch (e) {
  //     // fallback if JSON parse fails
  //     return { description };
  //   }
  // };

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
                <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">💡 Daily Challenge</h1>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  DC
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading today's challenge...</p>
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
                <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">💡 Daily Challenge</h1>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  DC
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center bg-white rounded-xl shadow-sm p-8 max-w-2xl">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Challenge</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              {error.includes("profile") && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    Please complete your profile setup to unlock the daily challenge.
                  </p>
                  <button
                    onClick={() => window.location.href = '/student/profile-setup'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:-blue-600"
                  >
                    Complete Profile Now
                  </button>
                </div>
              )}
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

  // Parse challenge data
  // const parsed = parseChallengeDescription(challenge?.description);

  // Extract clean fields
  const challengeTitle = challenge?.topic ?? "Daily Coding Challenge";
  const description = challenge?.description ?? "";
  const instructions = challenge?.instructions ?? "";
  const expectedOutcome = challenge?.expected_outcome ?? "";
  const tips = challenge?.tips ?? []; // Ensure this is always an array
  const solution = challenge?.solution ?? "";
  const difficulty = challenge?.difficulty ?? "Beginner";
  const estimatedTime = challenge?.estimated_time ?? "20-30 minutes";

  // Ensure tips is always an array, even if it comes as a string
  const tipsArray = Array.isArray(tips) 
    ? tips 
    : typeof tips === 'string' 
      ? tips.split("\n").filter(line => line.trim() !== "")
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
              <h1 className="text-xl font-semibold text-gray-900 ml-2 lg:ml-0">💡 Daily Challenge</h1>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                DC
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{challengeTitle}</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {difficulty}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {estimatedTime}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Description</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{description}</p>
              </div>
            </div>

            {/* Instructions Section - Hidden by default */}
            <div className="mt-6">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg text-gray-900">Instructions</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showInstructions && instructions && (
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{instructions}</p>
                </div>
              )}
            </div>

            {/* Expected Outcome Section - Hidden by default */}
            <div className="mt-6">
              <button
                onClick={() => setShowExpectedOutcome(!showExpectedOutcome)}
                className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg text-gray-900">Expected Outcome</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${showExpectedOutcome ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showExpectedOutcome && expectedOutcome && (
                <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{expectedOutcome}</p>
                </div>
              )}
            </div>

            {/* Tips Section - Hidden by default */}
            <div className="mt-6">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg text-gray-900">Tips</h3>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${showTips ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showTips && tipsArray.length > 0 && (
                <ul className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                  {tipsArray.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 font-bold mr-2">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Submission Box */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Your Solution</h3>
              <div className="mb-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste or write your code here..."
                  className="w-full h-64 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  spellCheck="false"
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !code.trim()}
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Evaluating...
                  </>
                ) : (
                  <>
                    <Play size={20} className="mr-2" />
                    Submit for Evaluation
                  </>
                )}
              </button>
            </div>

            {/* AI Evaluation Output */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">AI Evaluation</h3>
              
              {evaluation ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    evaluation.passed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {evaluation.passed ? (
                        <CheckCircle size={24} className="text-green-500 mr-2" />
                      ) : (
                        <AlertCircle size={24} className="text-red-500 mr-2" />
                      )}
                      <h4 className="font-bold text-lg">
                        {evaluation.passed ? 'Challenge Passed!' : 'Needs Improvement'}
                      </h4>
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                      Marks: <span className={evaluation.passed ? 'text-green-600' : 'text-red-600'}>
                        {evaluation.marks}/10
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Feedback</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{evaluation.feedback}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    {!evaluation.passed ? (
                      <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Retry Challenge
                      </button>
                    ) : (
                      <button
                        onClick={handleUnlockNext}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600"
                      >
                        Unlock Next Day
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-gray-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">No Submission Yet</h4>
                  <p className="text-gray-600">
                    Submit your code solution to get AI feedback and evaluation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DailyChallengePage;