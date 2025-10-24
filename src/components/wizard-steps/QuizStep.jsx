import { useState, useEffect, useCallback } from 'react';
import { Brain, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

const QuizStep = ({ data, onUpdate, onComplete, onBack }) => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Quiz questions based on programming fundamentals and problem solving
  const quizQuestions = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is a variable in programming?',
      options: [
        'A fixed value that cannot be changed',
        'A container for storing data values',
        'A type of function',
        'A programming language'
      ],
      correctAnswer: 1,
      explanation: 'A variable is a container that holds data values and can be changed during program execution.'
    },
    {
      id: 2,
      type: 'mcq',
      question: 'Which of the following is the correct way to write a comment in most programming languages?',
      options: [
        '/* This is a comment */',
        '// This is a comment',
        '# This is a comment',
        'All of the above can be correct depending on the language'
      ],
      correctAnswer: 3,
      explanation: 'Different programming languages use different comment syntaxes.'
    },
    {
      id: 3,
      type: 'mcq',
      question: 'What is the main purpose of a loop in programming?',
      options: [
        'To store data',
        'To repeat a block of code multiple times',
        'To make decisions',
        'To define functions'
      ],
      correctAnswer: 1,
      explanation: 'Loops are used to execute a block of code repeatedly until a certain condition is met.'
    },
    {
      id: 4,
      type: 'short',
      question: 'Explain what you think "debugging" means in programming.',
      placeholder: 'Write your answer here...',
      sampleAnswer: 'Debugging is the process of finding and fixing errors or bugs in code.'
    },
    {
      id: 5,
      type: 'mcq',
      question: 'You have a list of numbers: [5, 2, 8, 1, 9]. If you want to find the largest number, what approach would you take?',
      options: [
        'Compare each number with every other number',
        'Start with the first number and compare it with each subsequent number, keeping track of the largest',
        'Sort the list first, then take the last element',
        'Both B and C are good approaches'
      ],
      correctAnswer: 3,
      explanation: 'Both iterating through the list and sorting are valid approaches to find the maximum value.'
    },
    {
      id: 6,
      type: 'short',
      question: 'If you were asked to create a simple calculator, what basic operations would you include and why?',
      placeholder: 'Describe your approach...',
      sampleAnswer: 'I would include addition, subtraction, multiplication, and division as they are the fundamental mathematical operations most people need.'
    },
    {
      id: 7,
      type: 'mcq',
      question: 'What is an algorithm?',
      options: [
        'A programming language',
        'A step-by-step procedure to solve a problem',
        'A type of computer',
        'A software application'
      ],
      correctAnswer: 1,
      explanation: 'An algorithm is a finite sequence of well-defined instructions to solve a problem or perform a task.'
    },
    {
      id: 8,
      type: 'short',
      question: 'Imagine you need to organize a list of student names alphabetically. Describe how you would approach this problem.',
      placeholder: 'Explain your thinking...',
      sampleAnswer: 'I would compare names letter by letter, starting from the first letter, and arrange them in alphabetical order using a sorting method.'
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted]);

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
    let totalMCQ = 0;

    quizQuestions.forEach(question => {
      if (question.type === 'mcq') {
        totalMCQ++;
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    // Score based on MCQ questions only (short answers are subjective)
    return totalMCQ > 0 ? Math.round((correctAnswers / totalMCQ) * 100) : 0;
  };

  // Use useCallback to prevent function recreation on each render
  const handleQuizComplete = useCallback(() => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);

    // Update wizard data with quiz results
    onUpdate({
      quizAnswers: {
        mcq: answers,
        shortAnswers: Object.fromEntries(
          quizQuestions
            .filter(q => q.type === 'short')
            .map(q => [q.id, answers[q.id] || ''])
        )
      },
      quizScore: finalScore
    });
  }, [answers, onUpdate, quizQuestions]);

  const getScoreMessage = () => {
    if (score >= 80) return { message: "Excellent! You have a strong foundation.", color: "text-green-600" };
    if (score >= 60) return { message: "Good work! You understand the basics well.", color: "text-blue-600" };
    if (score >= 40) return { message: "Not bad! There's room for improvement.", color: "text-yellow-600" };
    return { message: "Don't worry! Everyone starts somewhere.", color: "text-orange-600" };
  };

  const currentQ = quizQuestions[currentQuizQuestion - 1];
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
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            Start Learning Journey
          </button>
        </div>
      </div>
    );
  }

  // Show quiz question
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