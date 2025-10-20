import { useState, useEffect, useCallback } from 'react';
import { Code, Database, Smartphone, Cloud, Brain, Palette, ArrowRight, ArrowLeft } from 'lucide-react';

const FieldOfInterestStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [selectedField, setSelectedField] = useState(data.fieldOfInterest || '');
  const [currentFocus, setCurrentFocus] = useState(data.currentFocus || '');

  const fieldOptions = [
    {
      id: 'web_development',
      title: 'Web Development',
      description: 'Build websites and web applications',
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mobile_development',
      title: 'Mobile Development',
      description: 'Create mobile apps for iOS and Android',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'data_science',
      title: 'Data Science & AI',
      description: 'Analyze data and build intelligent systems',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'cloud_computing',
      title: 'Cloud Computing',
      description: 'Build scalable cloud infrastructure',
      icon: Cloud,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'database_management',
      title: 'Database Management',
      description: 'Design and manage data systems',
      icon: Database,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'ui_ux_design',
      title: 'UI/UX Design',
      description: 'Design user interfaces and experiences',
      icon: Palette,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const focusOptions = [
    { id: 'just_starting', label: 'Just getting started with programming' },
    { id: 'career_change', label: 'Looking to change careers' },
    { id: 'skill_improvement', label: 'Want to improve existing skills' },
    { id: 'academic_project', label: 'Working on academic projects' },
    { id: 'personal_project', label: 'Building personal projects' },
    { id: 'job_preparation', label: 'Preparing for job interviews' }
  ];

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    if (selectedField && currentFocus) {
      onUpdate({
        fieldOfInterest: selectedField,
        currentFocus: currentFocus
      });
    }
  }, [selectedField, currentFocus, onUpdate]);

  // Only update parent when both values are set and they change
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleNext = () => {
    if (currentQuestion === 1 && selectedField) {
      onNext();
    } else if (currentQuestion === 2 && currentFocus) {
      onNext();
    }
  };

  const canProceed = () => {
    if (currentQuestion === 1) return selectedField;
    if (currentQuestion === 2) return currentFocus;
    return false;
  };

  // Question 1: Field Selection
  if (currentQuestion === 1) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What's your main area of interest?
            </h3>
            <p className="text-lg text-gray-600">
              Choose the field you're most excited to learn about
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {fieldOptions.map((field) => {
              const IconComponent = field.icon;
              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    selectedField === field.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-lg p-3 bg-gradient-to-r ${field.color}`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {field.title}
                      </h4>
                      <p className="text-gray-600">
                        {field.description}
                      </p>
                    </div>
                  </div>
                  {selectedField === field.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-5">
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
            disabled={!canProceed()}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next Question
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Question 2: Current Focus
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            What describes your current situation best?
          </h3>
          <p className="text-lg text-gray-600">
            This helps us customize your learning experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <div className="space-y-3">
            {focusOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                  currentFocus === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="currentFocus"
                  value={option.id}
                  checked={currentFocus === option.id}
                  onChange={(e) => setCurrentFocus(e.target.value)}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-4 text-lg text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between p-5">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous Question
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next Step
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FieldOfInterestStep;