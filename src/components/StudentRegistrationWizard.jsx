import { useState, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
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
  const [wizardData, setWizardData] = useState({
    fieldOfInterest: '',
    currentFocus: '',
    specialization: '',
    preferredLanguages: {
      frontend: [],
      backend: [],
      database: []
    },
    skillLevel: '',
    finalGoal: '',
    timeCommitment: '',
    quizAnswers: {
      mcq: {},
      shortAnswers: {}
    },
    quizScore: 0
  });

  // Define the structure of steps and questions
  const stepStructure = {
    1: { questions: 2, title: 'Field of Interest' },
    2: { questions: 1, title: 'Specialization' },
    3: { questions: 1, title: 'Programming Languages' },
    4: { questions: 1, title: 'Goals & Experience' }, // Changed from 3 to 1 - all questions now on one screen
    5: { questions: 8, title: 'Quick Assessment' }
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
      } else if (currentStep === 4) {
        // After step 4, trigger registration
        handleRegistration();
      } else {
        // Step 5 (quiz) - complete
        handleQuizComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
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
        ...studentData,
        wizardData
      };
      
      const response = await api.post("/auth/signup", completeData);
      console.log("Registration successful:", response.data);
      
      setIsRegistering(false);
      setRegistrationComplete(true);
      
      // After showing success message, redirect to login after 3 seconds
      setTimeout(() => {
        onComplete();
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

  const handleQuizComplete = () => {
    // After quiz completion, redirect to login
    onComplete();
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
            Your account has been created. You will be redirected to the login page shortly.
          </p>
        </div>
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
      case 5:
        return (
          <QuizStep 
            data={wizardData}
            onUpdate={updateWizardData}
            onComplete={handleQuizComplete}
            onBack={handleBack}
            currentQuestion={currentQuestion}
            canGoBack={false}
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
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
              <p className="text-blue-100 mt-1">
                Step {currentStep} of 5: {stepStructure[currentStep]?.title}
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Overall Progress: Question {currentQuestionNumber} of {totalQuestions}
              </p>
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