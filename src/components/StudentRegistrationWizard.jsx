import { useState, useCallback, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Brain } from 'lucide-react';
import FieldOfInterestStep from './wizard-steps/FieldOfInterestStep';
import SpecializationStep from './wizard-steps/SpecializationStep';
import LanguagePreferenceStep from './wizard-steps/LanguagePreferenceStep';
import SkillLevelStep from './wizard-steps/SkillLevelStep';
import QuizStep from './wizard-steps/QuizStep';
import api from '../api/axios';

const StudentRegistrationWizard = ({ isOpen, onClose, onComplete, studentData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizIntro, setShowQuizIntro] = useState(false);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [wizardData, setWizardData] = useState({
    major_subject: '',
    current_position: '',
    specialization_field: '',
    preferred_technologies: [],
    current_skill_level: '',
    main_goal: '',
    time_per_week: '',
    quizQuestions: [],
    quizAnswers: {
      mcq: {},
      shortAnswers: {}
    },
    quizScore: 0
  });
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizGenerationError, setQuizGenerationError] = useState(null);

  // Define the structure of steps and questions (now only 4 steps)
  const stepStructure = {
    1: { questions: 2, title: 'Field of Interest' },
    2: { questions: 1, title: 'Specialization' },
    3: { questions: 1, title: 'Preferred Technologies' },
    4: { questions: 1, title: 'Goals & Experience' }
  };

  const totalQuestions = Object.values(stepStructure).reduce((sum, step) => sum + step.questions, 0);
  const getCurrentQuestionNumber = () => {
    let questionNum = 0;
    for (let i = 1; i < currentStep; i++) {
      questionNum += stepStructure[i].questions;
    }
    return questionNum + currentQuestion;
  };

  const congratsMessages = {
    1: "🎉 Great choice! Your learning path is taking shape.",
    2: "✨ Perfect! We're building your personalized curriculum.",
    3: "🚀 Excellent! Your tech stack preferences are noted.",
    4: "🎯 Amazing! We understand your goals now."
  };

  // Use useCallback to prevent unnecessary re-renders
  const updateWizardData = useCallback((stepData) => {
    setWizardData(prev => ({
      ...prev,
      ...stepData
    }));
  }, []);

  const handleNext = () => {
    const maxQuestions = stepStructure[currentStep].questions;
    
    if (currentQuestion < maxQuestions) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // End of current step
      if (currentStep < 4) {
        // Show congratulations before moving to next step
        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
          setCurrentStep(prev => prev + 1);
          setCurrentQuestion(1);
        }, 2000);
      } else {
        // After step 4, show quiz introduction
        setShowQuizIntro(true);
      }
    }
  };

  const handleBack = () => {
    if (showQuizIntro) {
      setShowQuizIntro(false);
    } else if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentQuestion(stepStructure[prevStep].questions);
    }
  };

  const handleRegistration = async () => {
    setIsRegistering(true);
    
    try {
      // Combine student registration data with wizard data
      const completeData = {
        ...studentData
      };
      
      const response = await api.post("/auth/signup", completeData);
      console.log("Registration successful:", response.data);
      
      setIsRegistering(false);
      setRegistrationComplete(true);
      
      // After showing success message, show quiz intro after 3 seconds
      setTimeout(() => {
        setRegistrationComplete(false);
        setShowQuizIntro(true);
      }, 3000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setIsRegistering(false);
      // Handle error - could show error message
      if (error.response && error.response.data) {
        alert(`Registration failed: ${error.response.data.message || 'Please try again.'}`);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  // Automatically generate quiz when showing quiz intro
  useEffect(() => {
    if (showQuizIntro) {
      generateQuizAutomatically();
    }
  }, [showQuizIntro]);

  const generateQuizAutomatically = async () => {
    setIsGeneratingQuiz(true);
    setQuizGenerationError(null);
    
    try {
      // Get token from studentData (consistent with login page)
      const token = studentData?.token || localStorage.getItem('token');
      
      // Set authorization header
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // Call the endpoint to update profile and automatically generate quiz
      const profileData = {
        major_subject: wizardData.major_subject,
        current_position: wizardData.current_position,
        specialization_field: wizardData.specialization_field,
        preferred_technologies: wizardData.preferred_technologies,
        current_skill_level: wizardData.current_skill_level,
        main_goal: wizardData.main_goal,
        time_per_week: wizardData.time_per_week
      };
      
      const response = await api.post("/auth/student/questions", profileData);
      
      console.log("Profile update response:", response.data);
      
      // Update wizard data with quiz questions if returned
      let questions = [];
      if (response.data) {
        // Handle the standard API response structure {status, code, message, data}
        const responseData = response.data.data || response.data;
        
        if (responseData.quiz) {
          questions = responseData.quiz;
        } else if (responseData.questions) {
          questions = responseData.questions;
        } else if (Array.isArray(responseData) && responseData.length > 0) {
          // Handle case where response is directly an array of quiz objects
          questions = responseData;
        } else if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
          // Handle case where response data is an object that might contain questions directly
          questions = responseData;
        }
      }
      
      console.log("Questions after initial parsing:", questions);
      
      // If questions is a string, try to parse it as JSON
      if (typeof questions === 'string') {
        try {
          questions = JSON.parse(questions);
        } catch (e) {
          console.error("Error parsing quiz questions from string:", e);
        }
      }
      
      // If questions is an object with a questions property, use that
      if (questions && questions.questions) {
        questions = questions.questions;
      }
      
      // If questions is an array of quiz objects, get questions from the first one
      if (Array.isArray(questions) && questions.length > 0 && questions[0].questions) {
        questions = questions[0].questions;
      }
      
      console.log("Questions after formatting:", questions);
      
      // Add IDs and proper formatting to questions if needed
      if (Array.isArray(questions) && questions.length > 0) {
        questions = questions.map((q, index) => ({
          ...q,
          id: q.id || index + 1,
          type: q.type || (q.options ? 'mcq' : 'short'),
          correctAnswer: q.correctAnswer || q.correct_answer
        }));
      }
      
      console.log("Questions after ID formatting:", questions);
      
      // Only set quiz questions if they're in a valid array format
      if (Array.isArray(questions) && questions.length > 0) {
        console.log("Setting quiz questions from initial response:", questions);
        setWizardData(prev => ({
          ...prev,
          quizQuestions: questions
        }));
      } else {
        // If no questions in response, try to fetch them
        try {
          const quizResponse = await api.get("/auth/student/quizzes");
          console.log("Quiz fetch response after profile update:", quizResponse.data);
          
          // Parse quiz questions from response (array of quiz objects)
          let fetchedQuestions = [];
          if (quizResponse.data && Array.isArray(quizResponse.data) && quizResponse.data.length > 0) {
            // Use questions from the first quiz object
            fetchedQuestions = quizResponse.data[0].questions || [];
            
            console.log("Extracted questions from first quiz object:", fetchedQuestions);
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            }
          } else if (quizResponse.data && quizResponse.data.questions) {
            // Handle case where response is a single quiz object
            fetchedQuestions = quizResponse.data.questions || [];
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            } else {
              // If it's not an array, make it an empty array
              fetchedQuestions = [];
            }
          } else if (quizResponse.data && Array.isArray(quizResponse.data.data) && quizResponse.data.data.length > 0) {
            // Handle standard API response structure {status, code, message, data}
            const responseData = quizResponse.data.data;
            // Use questions from the first quiz object
            fetchedQuestions = responseData[0].questions || [];
            
            console.log("Extracted questions from first quiz object (standard API):", fetchedQuestions);
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            }
          } else if (quizResponse.data && quizResponse.data.data && quizResponse.data.data.questions) {
            // Handle standard API response structure with single quiz object
            const responseData = quizResponse.data.data;
            fetchedQuestions = responseData.questions || [];
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            } else {
              // If it's not an array, make it an empty array
              fetchedQuestions = [];
            }
          }
          
          // If questions is a string, try to parse it as JSON
          if (typeof fetchedQuestions === 'string') {
            try {
              fetchedQuestions = JSON.parse(fetchedQuestions);
            } catch (e) {
              console.error("Error parsing questions from string:", e);
            }
          }
          
          console.log("Fetched questions after parsing:", fetchedQuestions);
          
          // Check if fetchedQuestions is valid
          if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
            console.log("Setting quiz questions from fetched response:", fetchedQuestions);
            setWizardData(prev => ({
              ...prev,
              quizQuestions: fetchedQuestions
            }));
          } else {
            // Set error state if no valid questions received
            console.log("No valid quiz questions found in response");
            setQuizGenerationError("No valid quiz questions received from AI service.");
          }
        } catch (fetchError) {
          console.error("Error fetching quiz after profile update:", fetchError);
          setQuizGenerationError("Failed to fetch quiz questions from AI service.");
        }
      }
      
      console.log("Profile updated and quiz generated automatically");
    } catch (error) {
      console.error("Error generating quiz automatically:", error);
      setQuizGenerationError("Failed to generate quiz. You can try generating it manually.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleManualQuizGeneration = async () => {
    setIsGeneratingQuiz(true);
    setQuizGenerationError(null);
    
    try {
      // Get token from studentData (consistent with login page)
      const token = studentData?.token || localStorage.getItem('token');
      
      // Set authorization header
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // Manually trigger AI quiz generation
      const response = await api.post("/auth/student/generate-quiz");
      
      console.log("Manual quiz generation response:", response.data);
      
      // Try to extract quiz questions from the response
      let questions = [];
      if (response.data) {
        // Handle the standard API response structure {status, code, message, data}
        const responseData = response.data.data || response.data;
        
        if (responseData.quiz) {
          questions = responseData.quiz;
        } else if (responseData.questions) {
          questions = responseData.questions;
        } else if (Array.isArray(responseData) && responseData.length > 0) {
          // Handle case where response is directly an array of quiz objects
          questions = responseData;
        } else if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
          // Handle case where response data is an object that might contain questions directly
          questions = responseData;
        }
      }
      
      console.log("Questions after initial parsing (manual):", questions);
      
      // If questions is a string, try to parse it as JSON
      if (typeof questions === 'string') {
        try {
          questions = JSON.parse(questions);
        } catch (e) {
          console.error("Error parsing questions from string:", e);
        }
      }
      
      // If questions is an object with a questions property, use that
      if (questions && questions.questions) {
        questions = questions.questions;
      }
      
      // If questions is an array of quiz objects, get questions from the first one
      if (Array.isArray(questions) && questions.length > 0 && questions[0].questions) {
        questions = questions[0].questions;
      }
      
      console.log("Questions after formatting (manual):", questions);
      
      // Add IDs and proper formatting to questions if needed
      if (Array.isArray(questions) && questions.length > 0) {
        questions = questions.map((q, index) => ({
          ...q,
          id: q.id || index + 1,
          type: q.type || (q.options ? 'mcq' : 'short'),
          correctAnswer: q.correctAnswer || q.correct_answer
        }));
      }
      
      console.log("Questions after ID formatting (manual):", questions);
      
      // If we got questions from the generation response, use them
      if (Array.isArray(questions) && questions.length > 0) {
        console.log("Setting quiz questions from manual generation response:", questions);
        setWizardData(prev => ({
          ...prev,
          quizQuestions: questions
        }));
      } else {
        // Otherwise, fetch the quiz questions
        try {
          const quizResponse = await api.get("/auth/student/quizzes");
          
          console.log("Quiz fetch response:", quizResponse.data);
          
          // Parse quiz questions from response (array of quiz objects)
          let fetchedQuestions = [];
          if (quizResponse.data && Array.isArray(quizResponse.data) && quizResponse.data.length > 0) {
            // Use questions from the first quiz object
            fetchedQuestions = quizResponse.data[0].questions || [];
            
            console.log("Extracted questions from first quiz object (manual):", fetchedQuestions);
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            }
          } else if (quizResponse.data && quizResponse.data.questions) {
            // Handle case where response is a single quiz object
            fetchedQuestions = quizResponse.data.questions || [];
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            } else {
              // If it's not an array, make it an empty array
              fetchedQuestions = [];
            }
          } else if (quizResponse.data && Array.isArray(quizResponse.data.data) && quizResponse.data.data.length > 0) {
            // Handle standard API response structure {status, code, message, data}
            const responseData = quizResponse.data.data;
            // Use questions from the first quiz object
            fetchedQuestions = responseData[0].questions || [];
            
            console.log("Extracted questions from first quiz object (manual, standard API):", fetchedQuestions);
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            }
          } else if (quizResponse.data && quizResponse.data.data && quizResponse.data.data.questions) {
            // Handle standard API response structure with single quiz object
            const responseData = quizResponse.data.data;
            fetchedQuestions = responseData.questions || [];
            
            // Add IDs to questions if they don't have them and it's an array
            if (Array.isArray(fetchedQuestions)) {
              fetchedQuestions = fetchedQuestions.map((q, index) => ({
                ...q,
                id: q.id || index + 1,
                type: q.type || (q.options ? 'mcq' : 'short'),
                correctAnswer: q.correctAnswer || q.correct_answer
              }));
            } else {
              // If it's not an array, make it an empty array
              fetchedQuestions = [];
            }
          }
          
          // If questions is a string, try to parse it as JSON
          if (typeof fetchedQuestions === 'string') {
            try {
              fetchedQuestions = JSON.parse(fetchedQuestions);
            } catch (e) {
              console.error("Error parsing questions from string:", e);
            }
          }
          
          console.log("Fetched questions after parsing (manual):", fetchedQuestions);
          
          // Check if fetchedQuestions is valid
          if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
            console.log("Setting quiz questions from fetched response (manual):", fetchedQuestions);
            setWizardData(prev => ({
              ...prev,
              quizQuestions: fetchedQuestions
            }));
          } else {
            // Set error state if no valid questions received
            console.log("No valid quiz questions found in response (manual)");
            setQuizGenerationError("No valid quiz questions received from AI service.");
          }
        } catch (fetchError) {
          console.error("Error fetching quiz:", fetchError);
          setQuizGenerationError("Failed to fetch quiz questions from AI service.");
        }
      }
      
      console.log("Quiz generated manually");
    } catch (error) {
      console.error("Error generating quiz manually:", error);
      setQuizGenerationError("Failed to generate quiz manually. Please try again.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleStartQuiz = () => {
    console.log("Starting quiz with wizard data:", wizardData);
    console.log("Quiz questions being passed to QuizStep:", wizardData.quizQuestions);
    setShowQuizIntro(false);
    setShowQuiz(true);
  };

  const handleQuizComplete = async () => {
    // Save quiz data only
    setIsSubmittingQuiz(true);
    try {
      // Format the data according to API requirements
      // Based on the API response, the "questions" field should contain user answers
      // and the "answers" field is required but seems to be for something else
      let questionsData = '';
      let answersData = '';
      
      // Combine both MCQ and short answers for the questions field (this is what the API expects)
      const allAnswers = { ...wizardData.quizAnswers.mcq, ...wizardData.quizAnswers.shortAnswers };
      if (allAnswers && Object.keys(allAnswers).length > 0) {
        answersData = Object.entries(allAnswers)
          .map(([id, answer]) => `${id}: ${answer}`)
          .join('; ');
      }
      
      // For the answers field, let's put the actual questions
      if (wizardData.quizQuestions && wizardData.quizQuestions.length > 0) {
        questionsData = wizardData.quizQuestions
          .map(question => `${question.id}: ${question.question}`)
          .join('; ');
      }
      
      // Ensure we always have string values
      const quizData = {
        questions: questionsData || '',
        answers: answersData || '',
        score: String(wizardData.quizScore || 0)
      };
      
      // Get token from localStorage or studentData (consistent with login page)
      const token = studentData?.token || localStorage.getItem('token');
      
      // Set authorization header
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('Quiz questions data:', wizardData.quizQuestions);
      console.log('Quiz answers data:', wizardData.quizAnswers);
      console.log('Formatted questions data (user answers):', questionsData);
      console.log('Formatted answers data (actual questions):', answersData);
      console.log('Sending quiz data to API:', quizData);
      
      // Ensure all fields are strings
      Object.keys(quizData).forEach(key => {
        if (typeof quizData[key] !== 'string') {
          quizData[key] = String(quizData[key]);
        }
      });
      
      await api.post("/auth/student/quiz", quizData);
      
      // After quiz completion, redirect to dashboard
      onComplete();
    } catch (error) {
      console.error("Error saving quiz data:", error);
      if (error.response && error.response.data) {
        console.error("API Error Details:", error.response.data);
        if (error.response.data.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('; ');
          alert(`There was an error saving your quiz data: ${errorMessages}`);
        } else {
          alert(`There was an error saving your quiz data: ${error.response.data.message || 'Please try again.'}`);
        }
      } else {
        alert("There was an error saving your quiz data. Please try again.");
      }
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  const renderStep = () => {
    if (showCongrats) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Step {currentStep} Complete!
          </h3>
          <p className="text-lg text-gray-600 max-w-md">
            {congratsMessages[currentStep]}
          </p>
        </div>
      );
    }

    if (isRegistering) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <h3 className="text-2xl font-bold text-gray-900">
            Creating Your Account...
          </h3>
          <p className="text-lg text-gray-600 max-w-md">
            Please wait while we set up your personalized learning environment and prepare your dashboard.
          </p>
        </div>
      );
    }

    if (registrationComplete) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Account Created Successfully!
          </h3>
          <p className="text-lg text-gray-600 max-w-md">
            Your account has been created. Getting ready for your skill assessment...
          </p>
        </div>
      );
    }

    if (showQuizIntro) {
      return (
        <div className="flex flex-col items-center justify-center text-center space-y-6 pb-8 ">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Let's Check Your Skills!
          </h3>
          <p className="text-lg text-gray-600 max-w-md">
            To better understand your current programming knowledge and learning approach, 
            we'll ask you a few quick questions. This will help us customize your learning path.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
            <p className="text-sm text-blue-800">
              🎯 The quiz contains 8 questions and should take less than 5 minutes to complete.
            </p>
          </div>
          
          {isGeneratingQuiz && (
            <div className="flex flex-col items-center py-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-600">Generating your personalized quiz...</p>
            </div>
          )}
          
          {quizGenerationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
              <p className="text-sm text-red-800">
                {quizGenerationError}
              </p>
              <button
                onClick={handleManualQuizGeneration}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleBack}
              disabled={isGeneratingQuiz}
              className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </button>
            
            <button
              onClick={handleStartQuiz}
              disabled={isGeneratingQuiz}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
            >
              Start Quiz
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    if (showQuiz) {
      return (
        <QuizStep 
          data={wizardData}
          onUpdate={updateWizardData}
          onComplete={handleQuizComplete}
          onBack={() => setShowQuiz(false)}
          studentData={studentData}
          isSubmitting={isSubmittingQuiz}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <FieldOfInterestStep 
            data={wizardData}
            onUpdate={updateWizardData}
            onNext={handleNext}
            onBack={handleBack}
            currentQuestion={currentQuestion}
            canGoBack={currentStep > 1 || currentQuestion > 1}
          />
        );
      case 2:
        return (
          <SpecializationStep 
            data={wizardData}
            onUpdate={updateWizardData}
            onNext={handleNext}
            onBack={handleBack}
            currentQuestion={currentQuestion}
            canGoBack={true}
          />
        );
      case 3:
        return (
          <LanguagePreferenceStep 
            data={wizardData}
            onUpdate={updateWizardData}
            onNext={handleNext}
            onBack={handleBack}
            currentQuestion={currentQuestion}
            canGoBack={true}
          />
        );
      case 4:
        return (
          <SkillLevelStep 
            data={wizardData}
            onUpdate={updateWizardData}
            onNext={handleNext}
            onBack={handleBack}
            currentQuestion={currentQuestion}
            canGoBack={true}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const currentQuestionNumber = getCurrentQuestionNumber();
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {showQuizIntro ? "Skill Assessment" : showQuiz ? "Quick Quiz" : "Complete Your Profile"}
              </h2>
              <p className="text-blue-100 mt-1">
                {showQuizIntro ? "Getting to know your skills" : showQuiz ? "Question 1 of 8" : `Step ${currentStep} of 4: ${stepStructure[currentStep]?.title}`}
              </p>
              {!showQuizIntro && !showQuiz && (
                <p className="text-blue-200 text-sm mt-1">
                  Overall Progress: Question {currentQuestionNumber} of {totalQuestions}
                </p>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-blue-400 bg-opacity-30 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Area - Takes remaining space */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 h-full">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationWizard;