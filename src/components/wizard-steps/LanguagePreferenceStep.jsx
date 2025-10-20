import { useState, useEffect, useCallback } from 'react';
import { Code, Database, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

const LanguagePreferenceStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [selectedLanguages, setSelectedLanguages] = useState({
    frontend: data.preferredLanguages?.frontend || [],
    backend: data.preferredLanguages?.backend || [],
    database: data.preferredLanguages?.database || []
  });

  const languageOptions = {
    frontend: [
      { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500', description: 'Essential for web development' },
      { id: 'typescript', name: 'TypeScript', color: 'bg-blue-600', description: 'JavaScript with type safety' },
      { id: 'react', name: 'React', color: 'bg-cyan-500', description: 'Popular UI library' },
      { id: 'vue', name: 'Vue.js', color: 'bg-green-500', description: 'Progressive framework' },
      { id: 'angular', name: 'Angular', color: 'bg-red-600', description: 'Full-featured framework' },
      { id: 'html_css', name: 'HTML/CSS', color: 'bg-orange-500', description: 'Web fundamentals' },
      { id: 'sass', name: 'Sass/SCSS', color: 'bg-pink-500', description: 'CSS preprocessor' },
      { id: 'tailwind', name: 'Tailwind CSS', color: 'bg-teal-500', description: 'Utility-first CSS' }
    ],
    backend: [
      { id: 'javascript_node', name: 'JavaScript (Node.js)', color: 'bg-green-600', description: 'Server-side JavaScript' },
      { id: 'python', name: 'Python', color: 'bg-blue-500', description: 'Versatile and beginner-friendly' },
      { id: 'java', name: 'Java', color: 'bg-red-500', description: 'Enterprise development' },
      { id: 'csharp', name: 'C#', color: 'bg-purple-600', description: 'Microsoft ecosystem' },
      { id: 'php', name: 'PHP', color: 'bg-indigo-600', description: 'Web development' },
      { id: 'ruby', name: 'Ruby', color: 'bg-red-700', description: 'Ruby on Rails' },
      { id: 'go', name: 'Go', color: 'bg-cyan-600', description: 'Fast and efficient' },
      { id: 'rust', name: 'Rust', color: 'bg-orange-600', description: 'Systems programming' }
    ],
    database: [
      { id: 'mysql', name: 'MySQL', color: 'bg-blue-600', description: 'Popular relational DB' },
      { id: 'postgresql', name: 'PostgreSQL', color: 'bg-blue-800', description: 'Advanced relational DB' },
      { id: 'mongodb', name: 'MongoDB', color: 'bg-green-600', description: 'NoSQL document DB' },
      { id: 'sqlite', name: 'SQLite', color: 'bg-gray-600', description: 'Lightweight database' },
      { id: 'redis', name: 'Redis', color: 'bg-red-600', description: 'In-memory data store' },
      { id: 'firebase', name: 'Firebase', color: 'bg-orange-500', description: 'Google\'s platform' }
    ]
  };

  // Get relevant categories based on specialization
  const getRelevantCategories = () => {
    const categories = [];
    
    if (data.specialization === 'frontend' || data.specialization === 'fullstack') {
      categories.push('frontend');
    }
    
    if (data.specialization === 'backend' || data.specialization === 'fullstack') {
      categories.push('backend');
      categories.push('database');
    }
    
    // For mobile development
    if (data.fieldOfInterest === 'mobile_development') {
      if (data.specialization === 'native_ios') {
        categories.push('frontend'); // We'll show relevant mobile languages
      } else if (data.specialization === 'native_android') {
        categories.push('backend'); // Java/Kotlin will be in backend section
      } else if (data.specialization === 'cross_platform') {
        categories.push('frontend'); // React Native, Flutter
      }
    }
    
    // For data science
    if (data.fieldOfInterest === 'data_science') {
      categories.push('backend'); // Python, R, etc.
      categories.push('database');
    }
    
    // Default fallback
    if (categories.length === 0) {
      categories.push('frontend', 'backend');
    }
    
    return categories;
  };

  const relevantCategories = getRelevantCategories();

  const handleLanguageToggle = (category, languageId) => {
    setSelectedLanguages(prev => {
      const updated = { ...prev };
      if (updated[category].includes(languageId)) {
        updated[category] = updated[category].filter(id => id !== languageId);
      } else {
        updated[category] = [...updated[category], languageId];
      }
      return updated;
    });
  };

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    onUpdate({
      preferredLanguages: selectedLanguages
    });
  }, [selectedLanguages, onUpdate]);

  // Only update parent when value changes
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const hasSelectedLanguages = () => {
    return relevantCategories.some(category => selectedLanguages[category].length > 0);
  };

  const handleNext = () => {
    if (hasSelectedLanguages()) {
      onNext();
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'frontend': return 'Frontend Technologies';
      case 'backend': return 'Backend Languages';
      case 'database': return 'Database Technologies';
      default: return category;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend': return Globe;
      case 'backend': return Code;
      case 'database': return Database;
      default: return Code;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Preferred Technologies
          </h3>
          <p className="text-lg text-gray-600">
            Select the programming languages and technologies you'd like to learn or improve
          </p>
        </div>

        {/* Language Categories */}
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          {relevantCategories.map((category) => {
            const IconComponent = getCategoryIcon(category);
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    {getCategoryTitle(category)}
                  </h4>
                  <span className="text-sm text-gray-500">
                    ({selectedLanguages[category].length} selected)
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions[category].map((language) => (
                    <div
                      key={language.id}
                      onClick={() => handleLanguageToggle(category, language.id)}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-md hover:scale-105 ${
                        selectedLanguages[category].includes(language.id)
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${language.color}`} />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 truncate">
                            {language.name}
                          </h5>
                          <p className="text-xs text-gray-500 truncate">
                            {language.description}
                          </p>
                        </div>
                        {selectedLanguages[category].includes(language.id) && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
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
            );
          })}
        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 max-w-4xl mx-auto w-full">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Start with 2-3 technologies to avoid overwhelming yourself. 
            You can always learn more later!
          </p>
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
          disabled={!hasSelectedLanguages()}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next Step
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LanguagePreferenceStep;