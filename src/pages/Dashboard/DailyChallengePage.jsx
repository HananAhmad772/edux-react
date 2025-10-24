import { useState } from 'react';
import { Play, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const DailyChallengePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock challenge data
  const challenge = {
    title: "Build a small calculator using loops and conditions",
    instructions: "Use while loop to repeat user input until they type 'exit'. Try to handle invalid inputs gracefully.",
    exampleSolution: `# Example solution
while True:
    user_input = input("Enter 'exit' to quit or any key to continue: ")
    
    if user_input.lower() == 'exit':
        print("Goodbye!")
        break
    
    try:
        num1 = float(input("Enter first number: "))
        operator = input("Enter operator (+, -, *, /): ")
        num2 = float(input("Enter second number: "))
        
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 != 0:
                result = num1 / num2
            else:
                print("Error: Division by zero!")
                continue
        else:
            print("Invalid operator!")
            continue
            
        print(f"Result: {result}")
    except ValueError:
        print("Invalid input! Please enter valid numbers.")`
  };

  const handleSubmit = () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate AI evaluation
    setTimeout(() => {
      const marks = Math.floor(Math.random() * 6) + 5; // Random marks between 5-10
      
      const feedback = marks < 5 
        ? "Let's retry this project before moving on. You missed handling division by zero. Try adding a conditional check." 
        : "Good job! You've handled most cases correctly. Consider adding more input validation for edge cases.";
      
      setEvaluation({
        marks: marks,
        feedback: feedback,
        passed: marks >= 5
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const handleRetry = () => {
    setEvaluation(null);
    setCode('');
  };

  const handleUnlockNext = () => {
    alert("Next day unlocked! You'll be redirected to the next lesson.");
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h2>
            
            <div className="mt-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Instructions</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700">{challenge.instructions}</p>
              </div>
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

          {/* Example Solution */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Example Solution</h3>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>{challenge.exampleSolution}</code>
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DailyChallengePage;