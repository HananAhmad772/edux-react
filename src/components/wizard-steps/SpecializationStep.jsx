import { useState, useEffect, useCallback } from 'react';
import { Monitor, Server, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

const SpecializationStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(data.specialization || '');

  // Define specializations based on field of interest
  const getSpecializationOptions = () => {
    switch (data.fieldOfInterest) {
      case 'web_development':
        return [
          {
            id: 'frontend',
            title: 'Frontend Development',
            description: 'Focus on user interfaces, user experience, and client-side development',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'HTML, CSS, JavaScript',
              'React, Vue, Angular',
              'Responsive Design',
              'User Experience (UX)'
            ]
          },
          {
            id: 'backend',
            title: 'Backend Development',
            description: 'Focus on server-side logic, databases, and API development',
            icon: Server,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Server-side Programming',
              'Database Management',
              'API Development',
              'Security & Authentication'
            ]
          },
          {
            id: 'fullstack',
            title: 'Full Stack Development',
            description: 'Learn both frontend and backend development',
            icon: Layers,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Frontend Technologies',
              'Backend Technologies',
              'Database Design',
              'DevOps Basics'
            ]
          }
        ];
      
      case 'mobile_development':
        return [
          {
            id: 'native_ios',
            title: 'Native iOS Development',
            description: 'Build native iOS apps using Swift/SwiftUI',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Swift Programming',
              'SwiftUI & UIKit',
              'iOS SDK',
              'App Store Guidelines'
            ]
          },
          {
            id: 'native_android',
            title: 'Native Android Development',
            description: 'Build native Android apps using Kotlin/Java',
            icon: Server,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Kotlin/Java Programming',
              'Android SDK',
              'Material Design',
              'Google Play Store'
            ]
          },
          {
            id: 'cross_platform',
            title: 'Cross-Platform Development',
            description: 'Build apps for both iOS and Android with one codebase',
            icon: Layers,
            color: 'from-purple-500 to-pink-500',
            details: [
              'React Native/Flutter',
              'Cross-platform APIs',
              'Platform-specific Design',
              'Hybrid App Development'
            ]
          }
        ];

      case 'data_science':
        return [
          {
            id: 'data_analysis',
            title: 'Data Analysis',
            description: 'Focus on analyzing and visualizing data insights',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Python/R Programming',
              'Data Visualization',
              'Statistical Analysis',
              'Business Intelligence'
            ]
          },
          {
            id: 'machine_learning',
            title: 'Machine Learning',
            description: 'Build predictive models and AI systems',
            icon: Server,
            color: 'from-green-500 to-emerald-500',
            details: [
              'ML Algorithms',
              'Model Training',
              'Deep Learning',
              'Neural Networks'
            ]
          },
          {
            id: 'data_engineering',
            title: 'Data Engineering',
            description: 'Build data pipelines and infrastructure',
            icon: Layers,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Data Pipelines',
              'Big Data Technologies',
              'Data Warehousing',
              'ETL Processes'
            ]
          }
        ];

      default:
        return [
          {
            id: 'frontend',
            title: 'Frontend Focus',
            description: 'User-facing applications and interfaces',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: ['UI/UX Development', 'Client-side Programming']
          },
          {
            id: 'backend',
            title: 'Backend Focus',
            description: 'Server-side development and infrastructure',
            icon: Server,
            color: 'from-green-500 to-emerald-500',
            details: ['Server Programming', 'Database Management']
          },
          {
            id: 'fullstack',
            title: 'Full Stack Focus',
            description: 'End-to-end development skills',
            icon: Layers,
            color: 'from-purple-500 to-pink-500',
            details: ['Frontend & Backend', 'Complete Solutions']
          }
        ];
    }
  };

  const specializationOptions = getSpecializationOptions();

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    if (selectedSpecialization) {
      onUpdate({
        specialization: selectedSpecialization
      });
    }
  }, [selectedSpecialization, onUpdate]);

  // Only update parent when value changes
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleNext = () => {
    if (selectedSpecialization) {
      onNext();
    }
  };

  const getFieldDisplayName = () => {
    return data.fieldOfInterest?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'your selected field';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Specialization
          </h3>
          <p className="text-lg text-gray-600">
            Based on your interest in {getFieldDisplayName()}, which area would you like to focus on?
          </p>
        </div>

        {/* Specialization Options */}
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {specializationOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedSpecialization(option.id)}
                className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  selectedSpecialization === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`rounded-lg p-3 bg-gradient-to-r ${option.color}`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {option.title}
                      </h4>
                      {selectedSpecialization === option.id && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">
                      {option.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.details.map((detail, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between p-5">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedSpecialization}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next Step
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SpecializationStep;