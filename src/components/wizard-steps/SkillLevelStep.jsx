import { useState, useEffect, useCallback } from 'react';
import { Target, Clock, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';

const SkillLevelStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [skillLevel, setSkillLevel] = useState(data.skillLevel || '');
  const [finalGoal, setFinalGoal] = useState(data.finalGoal || '');
  const [timeCommitment, setTimeCommitment] = useState(data.timeCommitment || '');

  const skillLevels = [
    {
      id: 'complete_beginner',
      title: 'Complete Beginner',
      description: 'I have no programming experience',
      icon: '🌱',
      details: 'Perfect! We\'ll start from the very basics and build up your knowledge step by step.'
    },
    {
      id: 'some_basics',
      title: 'Know Some Basics',
      description: 'I understand basic programming concepts',
      icon: '🌿',
      details: 'Great! You have a foundation to build upon. We can focus on practical applications.'
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'I can build simple projects',
      icon: '🌳',
      details: 'Excellent! You\'re ready for more complex projects and advanced concepts.'
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'I have significant experience',
      icon: '🏆',
      details: 'Amazing! We can help you specialize further and tackle challenging projects.'
    }
  ];

  const goalOptions = [
    {
      id: 'get_job',
      title: 'Get a Programming Job',
      description: 'I want to become a professional developer',
      icon: '💼',
      timeline: '6-12 months with dedicated learning'
    },
    {
      id: 'freelance',
      title: 'Start Freelancing',
      description: 'I want to work as a freelance developer',
      icon: '🌐',
      timeline: '4-8 months to build portfolio'
    },
    {
      id: 'build_projects',
      title: 'Build Personal Projects',
      description: 'I want to create my own applications',
      icon: '🛠️',
      timeline: '3-6 months for first project'
    },
    {
      id: 'improve_skills',
      title: 'Improve Current Skills',
      description: 'I want to enhance my existing knowledge',
      icon: '📈',
      timeline: 'Ongoing skill development'
    },
    {
      id: 'academic_goals',
      title: 'Academic Requirements',
      description: 'I need programming skills for my studies',
      icon: '🎓',
      timeline: 'Based on academic schedule'
    },
    {
      id: 'career_change',
      title: 'Career Change',
      description: 'I want to transition into tech',
      icon: '🔄',
      timeline: '8-18 months transition period'
    }
  ];

  const timeCommitmentOptions = [
    {
      id: 'casual',
      title: '2-5 hours per week',
      description: 'Learning at a relaxed pace',
      icon: '🐌',
      suitable: 'Perfect for busy schedules'
    },
    {
      id: 'moderate',
      title: '5-10 hours per week',
      description: 'Steady progress with good balance',
      icon: '🚶',
      suitable: 'Recommended for most learners'
    },
    {
      id: 'intensive',
      title: '10-20 hours per week',
      description: 'Fast-paced learning',
      icon: '🏃',
      suitable: 'For dedicated learners'
    },
    {
      id: 'bootcamp',
      title: '20+ hours per week',
      description: 'Intensive, bootcamp-style learning',
      icon: '🚀',
      suitable: 'For career transitions'
    }
  ];

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    if (skillLevel || finalGoal || timeCommitment) {
      onUpdate({
        skillLevel,
        finalGoal,
        timeCommitment
      });
    }
  }, [skillLevel, finalGoal, timeCommitment, onUpdate]);

  // Only update parent when values change
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleNext = () => {
    if (skillLevel && finalGoal && timeCommitment) {
      onNext();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8 pb-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Let's Plan Your Learning Journey
            </h3>
            <p className="text-gray-600">
              Help us customize your experience based on your current level and goals
            </p>
          </div>

      {/* Skill Level Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-orange-500" />
          <h4 className="text-lg font-semibold text-gray-900">
            What's your current skill level?
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillLevels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSkillLevel(level.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                skillLevel === level.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{level.icon}</span>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {level.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {level.description}
                  </p>
                  <p className="text-xs text-blue-600">
                    {level.details}
                  </p>
                </div>
                {skillLevel === level.id && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Goal Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-500" />
          <h4 className="text-lg font-semibold text-gray-900">
            What's your main goal?
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goalOptions.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setFinalGoal(goal.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                finalGoal === goal.id
                  ? 'border-green-500 bg-green-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{goal.icon}</span>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {goal.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {goal.description}
                  </p>
                  <p className="text-xs text-green-600">
                    {goal.timeline}
                  </p>
                </div>
                {finalGoal === goal.id && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Commitment Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-500" />
          <h4 className="text-lg font-semibold text-gray-900">
            How much time can you dedicate per week?
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeCommitmentOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setTimeCommitment(option.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                timeCommitment === option.id
                  ? 'border-purple-500 bg-purple-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">
                    {option.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {option.description}
                  </p>
                  <p className="text-xs text-purple-600">
                    {option.suitable}
                  </p>
                </div>
                {timeCommitment === option.id && (
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between p-5 border-t">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!skillLevel || !finalGoal || !timeCommitment}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Complete Profile Setup
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SkillLevelStep;