import { useState, useEffect, useCallback, useRef } from 'react';
import { Brain, CheckCircle, Clock, ArrowLeft, Loader } from 'lucide-react';
import api from '../../api/axios';

const QuizStep = ({ data, onUpdate, onComplete, onBack, studentData, isSubmitting }) => {
  const hasFetchedRef = useRef(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use quiz questions from wizard data if available
  useEffect(() => {
    console.log("QuizStep received data:", data);
    // Check if quiz questions are already available and properly formatted
    // Only fetch from backend if we don't have valid questions
    const hasValidQuestions = data.quizQuestions && 
                             Array.isArray(data.quizQuestions) && 
                             data.quizQuestions.length > 0 && 
                             (typeof data.quizQuestions[0] === 'object' && data.quizQuestions[0] !== null);
    
    if (hasValidQuestions) {
      console.log("Using quiz questions from wizard data:", data.quizQuestions);
      // Ensure questions are in the correct format
      let formattedQuestions = data.quizQuestions;
      
      // If questions are a string, try to parse them as JSON
      if (typeof data.quizQuestions === 'string') {
        try {
          formattedQuestions = JSON.parse(data.quizQuestions);
        } catch (e) {
          console.error("Error parsing quiz questions:", e);
          // Don't use default questions, show error instead
          setError("Invalid quiz data format received from AI service.");
          setLoading(false);
          return;
        }
      }
      
      // If questions is an object with a questions property, use that
      if (formattedQuestions && formattedQuestions.questions) {
        formattedQuestions = formattedQuestions.questions;
      }
      
      // If questions is an array of quiz objects, get questions from the first one
      if (Array.isArray(formattedQuestions) && formattedQuestions.length > 0 && formattedQuestions[0].questions) {
        formattedQuestions = formattedQuestions[0].questions;
      }
      
      // Add IDs and proper formatting to questions if needed
      if (Array.isArray(formattedQuestions) && formattedQuestions.length > 0) {
        formattedQuestions = formattedQuestions.map((q, index) => ({
          ...q,
          id: q.id || index + 1,
          type: q.type || (q.options ? 'mcq' : 'short'),
          correctAnswer: q.correctAnswer || q.correct_answer
        }));
      }
      
      console.log("Formatted questions:", formattedQuestions);
      
      // Only use questions if they're in a valid array format
      if (Array.isArray(formattedQuestions) && formattedQuestions.length > 0) {
        setQuizQuestions(formattedQuestions);
        setLoading(false);
      } else {
        // Show error if questions format is invalid
        setError("Invalid quiz questions format received from AI service.");
        setLoading(false);
      }
    } else if (!loading && !hasFetchedRef.current) {  // Only fetch if not already loading and not already fetched
      console.log("No quiz questions in wizard data, fetching from backend");
      hasFetchedRef.current = true;
      // If no questions provided in data, fetch quiz questions from the backend
      fetchQuizQuestions();
    }
  }, [data.quizQuestions, loading]);

  // Reset the fetch ref when component unmounts
  useEffect(() => {
    return () => {
      hasFetchedRef.current = false;
    };
  }, []);

  const fetchQuizQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get token from studentData
      const token = studentData?.token || localStorage.getItem('token');
      
      // Set authorization header
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // Fetch the AI-generated quiz questions
      const response = await api.get("/auth/student/quizzes");
      
      console.log("Quiz API Response:", response.data);
      
      // Handle the response format: array of quiz objects
      let questions = [];
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Use questions from the first quiz object
        questions = response.data[0].questions || [];
        
        // Add IDs to questions if they don't have them
        questions = questions.map((q, index) => ({
          ...q,
          id: q.id || index + 1,
          type: q.type || (q.options ? 'mcq' : 'short'),
          correctAnswer: q.correctAnswer || q.correct_answer
        }));
      } else if (response.data && response.data.questions) {
        // Handle case where response is a single quiz object
        questions = response.data.questions || [];
        
        // Add IDs to questions if they don't have them
        questions = questions.map((q, index) => ({
          ...q,
          id: q.id || index + 1,
          type: q.type || (q.options ? 'mcq' : 'short'),
          correctAnswer: q.correctAnswer || q.correct_answer
        }));
      }
      
      console.log("Parsed questions:", questions);
      
      // Only use questions from API, no fallback to default questions
      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
      } else {
        // Show error if no questions received from API
        setError("No quiz questions available from AI generation. Please try again.");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setError("Failed to load quiz questions from AI service. Please try again.");
      setQuizQuestions([]); // Empty array instead of default questions
      setLoading(false);
    }
  };

  const getDefaultQuestions = () => {
    return [];
  };

  // Timer effect
  useEffect(() => {
    if (quizQuestions.length > 0 && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (quizQuestions.length > 0 && timeLeft === 0 && !quizCompleted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted, quizQuestions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuizQuestion < quizQuestions.length) {
      setCurrentQuizQuestion(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuizQuestion > 1) {
      setCurrentQuizQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalQuestions = 0;

    quizQuestions.forEach(question => {
      totalQuestions++;
      if (question.type === 'mcq') {
        // For MCQ, check if selected option matches correct answer
        if (answers[question.id] !== undefined && 
            question.options[answers[question.id]] === question.correctAnswer) {
          correctAnswers++;
        }
      } else if (question.type === 'short') {
        // For short answers, do a case-insensitive comparison with trimming
        const userAnswer = (answers[question.id] || '').trim().toLowerCase();
        const correctAnswer = (question.correctAnswer || '').trim().toLowerCase();
        if (userAnswer === correctAnswer) {
          correctAnswers++;
        }
      }
    });

    // Score based on all questions
    return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  };

  // Use useCallback to prevent function recreation on each render
  const handleQuizComplete = useCallback(() => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);

    // Create detailed results with question, user answer, and correct answer
    const detailedResults = quizQuestions.map(question => {
      const userAnswer = answers[question.id];
      let userAnswerText = '';
      let isCorrect = false;
      
      if (question.type === 'mcq') {
        userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : '';
        isCorrect = userAnswerText === question.correctAnswer;
      } else if (question.type === 'short') {
        userAnswerText = userAnswer || '';
        isCorrect = userAnswerText.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
      }
      
      return {
        id: question.id,
        question: question.question,
        type: question.type,
        options: question.options || [],
        userAnswer: userAnswerText,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect
      };
    });
    
    // Update wizard data with quiz results
    onUpdate({
      quizAnswers: {
        allAnswers: answers,
        mcq: Object.fromEntries(
          quizQuestions
            .filter(q => q.type === 'mcq')
            .map(q => [q.id, answers[q.id] !== undefined ? q.options[answers[q.id]] : ''])
        ),
        shortAnswers: Object.fromEntries(
          quizQuestions
            .filter(q => q.type === 'short')
            .map(q => [q.id, answers[q.id] || ''])
        )
      },
      quizQuestions: quizQuestions, // Include the questions themselves
      quizResults: detailedResults, // Include detailed results
      quizScore: finalScore
    });
  }, [answers, onUpdate, quizQuestions]);

  const getScoreMessage = () => {
    if (score >= 80) return { message: "Excellent! You have a strong foundation.", color: "text-green-600" };
    if (score >= 60) return { message: "Good work! You understand the basics well.", color: "text-blue-600" };
    if (score >= 40) return { message: "Not bad! There's room for improvement.", color: "text-yellow-600" };
    return { message: "Don't worry! Everyone starts somewhere.", color: "text-orange-600" };
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="w-8 h-8 text-purple-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your personalized quiz...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
          <p className="text-yellow-800 mb-4">{error}</p>
          <button
            onClick={fetchQuizQuestions}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Ensure we have questions before proceeding
  if (!loading && quizQuestions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-xl font-bold text-red-800 mb-2">Quiz Not Available</h3>
          <p className="text-red-700 mb-4">
            {error || "No quiz questions are currently available from the AI service. Please try again later."}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={fetchQuizQuestions}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuizQuestion - 1];
  console.log("Current question index:", currentQuizQuestion - 1);
  console.log("Quiz questions:", quizQuestions);
  console.log("Current question:", currentQ);
  // Fix: Progress should be 0% for the first question (1 of 8)
  const progress = currentQuizQuestion === 1 ? 0 : ((currentQuizQuestion - 1) / quizQuestions.length) * 100;

  // Show completed state
  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h3>
              <p className="text-lg text-gray-600">
                Thank you for completing the quick assessment
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Results</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">{score}%</div>
              <p className={`text-sm ${scoreMessage.color}`}>
                {scoreMessage.message}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                🎯 Based on your responses, we'll customize your learning path to match your current level and help you achieve your goals!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={onComplete}
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving Results...' : 'Start Learning Journey'}
          </button>
        </div>
      </div>
    );
  }

  // Show quiz question
  if (!currentQ) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Questions...</h3>
          <p className="text-gray-600">Please wait while we prepare your assessment.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Assessment
          </h3>
          <p className="text-lg text-gray-600">
            Question {currentQuizQuestion} of {quizQuestions.length}
          </p>
        </div>

        {/* Progress and Timer */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">
              Progress: {Math.round(progress)}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-600 font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 max-w-3xl mx-auto w-full">
          <h4 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQ.question}
          </h4>

          {currentQ.type === 'mcq' ? (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={`question_${currentQ.id}`}
                    value={index}
                    checked={answers[currentQ.id] === index}
                    onChange={() => handleAnswerSelect(currentQ.id, index)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              rows="4"
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerSelect(currentQ.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={currentQuizQuestion === 1 ? onBack : handlePrevious}
          className="flex items-center px-6 py-3 m-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          {currentQuizQuestion === 1 ? 'Back to Goals' : 'Previous'}
        </button>
        
        <button
          onClick={handleNext}
          // Fix: Enable button when an answer is selected for the current question
          disabled={currentQ.type === 'mcq' ? answers[currentQ.id] === undefined : !(answers[currentQ.id] && answers[currentQ.id].trim())}
          className="px-6 py-3 m-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {currentQuizQuestion === quizQuestions.length ? 'Finish Assessment' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizStep;