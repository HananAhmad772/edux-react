import { useState, useEffect, useCallback } from 'react';
import { Code, Database, Globe, ArrowRight, ArrowLeft } from 'lucide-react';

const LanguagePreferenceStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState(data.preferred_technologies || []);

  // Define technology options based on specialization
  const getTechnologyOptions = () => {
    // Map specialization to relevant technologies
    const specializationMap = {
      'Deep Learning': [
        { id: 'tensorflow', name: 'TensorFlow', color: 'bg-orange-500', description: 'Open-source machine learning framework' },
        { id: 'pytorch', name: 'PyTorch', color: 'bg-red-600', description: 'Deep learning framework by Facebook' },
        { id: 'keras', name: 'Keras', color: 'bg-purple-600', description: 'High-level neural networks API' },
        { id: 'scikit-learn', name: 'Scikit-learn', color: 'bg-blue-500', description: 'Machine learning library for Python' },
        { id: 'opencv', name: 'OpenCV', color: 'bg-green-600', description: 'Computer vision library' }
      ],
      'NLP': [
        { id: 'nltk', name: 'NLTK', color: 'bg-blue-500', description: 'Natural Language Toolkit for Python' },
        { id: 'spacy', name: 'spaCy', color: 'bg-purple-600', description: 'Industrial-strength NLP library' },
        { id: 'transformers', name: 'Hugging Face Transformers', color: 'bg-orange-500', description: 'State-of-the-art NLP models' },
        { id: 'gensim', name: 'Gensim', color: 'bg-green-600', description: 'Topic modeling and document similarity' }
      ],
      'Computer Vision': [
        { id: 'opencv', name: 'OpenCV', color: 'bg-green-600', description: 'Computer vision library' },
        { id: 'tensorflow', name: 'TensorFlow', color: 'bg-orange-500', description: 'Machine learning framework' },
        { id: 'pytorch', name: 'PyTorch', color: 'bg-red-600', description: 'Deep learning framework' },
        { id: 'pillow', name: 'Pillow', color: 'bg-blue-500', description: 'Python Imaging Library' }
      ],
      'AI Engineering': [
        { id: 'docker', name: 'Docker', color: 'bg-blue-500', description: 'Containerization platform' },
        { id: 'kubernetes', name: 'Kubernetes', color: 'bg-purple-600', description: 'Container orchestration' },
        { id: 'mlflow', name: 'MLflow', color: 'bg-orange-500', description: 'ML lifecycle management' },
        { id: 'tensorflow-serving', name: 'TensorFlow Serving', color: 'bg-red-600', description: 'ML model serving' }
      ],
      'Frontend (React, Next.js)': [
        { id: 'react', name: 'React', color: 'bg-cyan-500', description: 'JavaScript library for UIs' },
        { id: 'nextjs', name: 'Next.js', color: 'bg-black', description: 'React framework for production' },
        { id: 'typescript', name: 'TypeScript', color: 'bg-blue-600', description: 'Typed JavaScript' },
        { id: 'tailwind', name: 'Tailwind CSS', color: 'bg-teal-500', description: 'Utility-first CSS framework' },
        { id: 'redux', name: 'Redux', color: 'bg-purple-600', description: 'State management library' }
      ],
      'Backend (Node.js, Python)': [
        { id: 'nodejs', name: 'Node.js', color: 'bg-green-600', description: 'JavaScript runtime' },
        { id: 'express', name: 'Express.js', color: 'bg-gray-800', description: 'Web framework for Node.js' },
        { id: 'python', name: 'Python', color: 'bg-blue-500', description: 'Programming language' },
        { id: 'django', name: 'Django', color: 'bg-green-800', description: 'High-level Python web framework' },
        { id: 'fastapi', name: 'FastAPI', color: 'bg-cyan-600', description: 'Modern Python web framework' }
      ],
      'Mobile Development': [
        { id: 'react-native', name: 'React Native', color: 'bg-cyan-500', description: 'Cross-platform mobile framework' },
        { id: 'flutter', name: 'Flutter', color: 'bg-blue-500', description: 'UI toolkit by Google' },
        { id: 'swift', name: 'Swift', color: 'bg-orange-500', description: 'Apple\'s programming language' },
        { id: 'kotlin', name: 'Kotlin', color: 'bg-purple-600', description: 'Modern Android development' }
      ],
      'AWS/Azure/GCP': [
        { id: 'aws', name: 'AWS', color: 'bg-orange-500', description: 'Amazon Web Services' },
        { id: 'azure', name: 'Azure', color: 'bg-blue-500', description: 'Microsoft Azure' },
        { id: 'gcp', name: 'GCP', color: 'bg-blue-600', description: 'Google Cloud Platform' },
        { id: 'terraform', name: 'Terraform', color: 'bg-purple-600', description: 'Infrastructure as code' }
      ],
      'Docker/Kubernetes': [
        { id: 'docker', name: 'Docker', color: 'bg-blue-500', description: 'Containerization platform' },
        { id: 'kubernetes', name: 'Kubernetes', color: 'bg-purple-600', description: 'Container orchestration' },
        { id: 'helm', name: 'Helm', color: 'bg-orange-500', description: 'Kubernetes package manager' },
        { id: 'prometheus', name: 'Prometheus', color: 'bg-red-600', description: 'Monitoring and alerting' }
      ],
      'CI/CD': [
        { id: 'jenkins', name: 'Jenkins', color: 'bg-red-600', description: 'Automation server' },
        { id: 'github-actions', name: 'GitHub Actions', color: 'bg-gray-900', description: 'CI/CD platform' },
        { id: 'gitlab-ci', name: 'GitLab CI', color: 'bg-orange-500', description: 'Integrated CI/CD' },
        { id: 'circleci', name: 'CircleCI', color: 'bg-blue-500', description: 'Continuous integration' }
      ],
      'Infrastructure as Code': [
        { id: 'terraform', name: 'Terraform', color: 'bg-purple-600', description: 'Infrastructure as code' },
        { id: 'cloudformation', name: 'CloudFormation', color: 'bg-orange-500', description: 'AWS infrastructure as code' },
        { id: 'ansible', name: 'Ansible', color: 'bg-red-600', description: 'Configuration management' },
        { id: 'pulumi', name: 'Pulumi', color: 'bg-blue-600', description: 'Infrastructure as code SDK' }
      ],
      'Data Analysis': [
        { id: 'python', name: 'Python', color: 'bg-blue-500', description: 'Programming language' },
        { id: 'pandas', name: 'Pandas', color: 'bg-gray-800', description: 'Data manipulation library' },
        { id: 'numpy', name: 'NumPy', color: 'bg-blue-600', description: 'Numerical computing library' },
        { id: 'matplotlib', name: 'Matplotlib', color: 'bg-orange-500', description: 'Data visualization library' }
      ],
      'Business Intelligence': [
        { id: 'tableau', name: 'Tableau', color: 'bg-blue-600', description: 'Data visualization platform' },
        { id: 'powerbi', name: 'Power BI', color: 'bg-yellow-500', description: 'Microsoft business analytics' },
        { id: 'looker', name: 'Looker', color: 'bg-purple-600', description: 'Data platform by Google' },
        { id: 'qlik', name: 'Qlik', color: 'bg-green-600', description: 'Business intelligence platform' }
      ],
      'Big Data Engineering': [
        { id: 'spark', name: 'Apache Spark', color: 'bg-red-600', description: 'Big data processing engine' },
        { id: 'hadoop', name: 'Hadoop', color: 'bg-yellow-500', description: 'Distributed storage and processing' },
        { id: 'kafka', name: 'Apache Kafka', color: 'bg-blue-600', description: 'Distributed streaming platform' },
        { id: 'flink', name: 'Apache Flink', color: 'bg-purple-600', description: 'Stream processing framework' }
      ],
      'Ethical Hacking': [
        { id: 'kali', name: 'Kali Linux', color: 'bg-blue-900', description: 'Penetration testing distribution' },
        { id: 'metasploit', name: 'Metasploit', color: 'bg-orange-500', description: 'Penetration testing framework' },
        { id: 'burp', name: 'Burp Suite', color: 'bg-purple-600', description: 'Web application security testing' },
        { id: 'nmap', name: 'Nmap', color: 'bg-red-600', description: 'Network discovery and security' }
      ],
      'Security Engineering': [
        { id: 'owasp', name: 'OWASP', color: 'bg-red-600', description: 'Web application security' },
        { id: 'snort', name: 'Snort', color: 'bg-blue-600', description: 'Network intrusion detection' },
        { id: 'splunk', name: 'Splunk', color: 'bg-orange-500', description: 'Log analysis and monitoring' },
        { id: 'vault', name: 'HashiCorp Vault', color: 'bg-purple-600', description: 'Secrets management' }
      ],
      'Cloud Security': [
        { id: 'aws-security', name: 'AWS Security', color: 'bg-orange-500', description: 'Amazon security services' },
        { id: 'azure-security', name: 'Azure Security', color: 'bg-blue-500', description: 'Microsoft security services' },
        { id: 'gcp-security', name: 'GCP Security', color: 'bg-blue-600', description: 'Google security services' },
        { id: 'cloudflare', name: 'Cloudflare', color: 'bg-orange-600', description: 'Web security and performance' }
      ],
      'Smart Contracts': [
        { id: 'solidity', name: 'Solidity', color: 'bg-purple-600', description: 'Ethereum smart contract language' },
        { id: 'hardhat', name: 'Hardhat', color: 'bg-yellow-500', description: 'Ethereum development environment' },
        { id: 'truffle', name: 'Truffle', color: 'bg-gray-800', description: 'Development framework' },
        { id: 'remix', name: 'Remix', color: 'bg-blue-500', description: 'Online IDE for Solidity' }
      ],
      'DeFi': [
        { id: 'web3js', name: 'Web3.js', color: 'bg-blue-600', description: 'Ethereum JavaScript API' },
        { id: 'ethersjs', name: 'Ethers.js', color: 'bg-cyan-500', description: 'Ethereum library for JavaScript' },
        { id: 'uniswap', name: 'Uniswap', color: 'bg-pink-500', description: 'Decentralized exchange protocol' },
        { id: 'aave', name: 'Aave', color: 'bg-blue-800', description: 'Lending protocol' }
      ],
      'NFT Development': [
        { id: 'ipfs', name: 'IPFS', color: 'bg-blue-600', description: 'InterPlanetary File System' },
        { id: 'opensea', name: 'OpenSea', color: 'bg-blue-500', description: 'NFT marketplace API' },
        { id: 'moralis', name: 'Moralis', color: 'bg-purple-600', description: 'Web3 development platform' },
        { id: 'thirdweb', name: 'thirdweb', color: 'bg-gray-900', description: 'Web3 development tools' }
      ],
      'Native (iOS/Android)': [
        { id: 'swift', name: 'Swift', color: 'bg-orange-500', description: 'Apple\'s programming language' },
        { id: 'kotlin', name: 'Kotlin', color: 'bg-purple-600', description: 'Modern Android development' },
        { id: 'java', name: 'Java', color: 'bg-red-600', description: 'Android development language' },
        { id: 'xcode', name: 'Xcode', color: 'bg-blue-600', description: 'Apple\'s IDE' }
      ],
      'Cross-platform (Flutter, React Native)': [
        { id: 'flutter', name: 'Flutter', color: 'bg-blue-500', description: 'UI toolkit by Google' },
        { id: 'react-native', name: 'React Native', color: 'bg-cyan-500', description: 'Cross-platform mobile framework' },
        { id: 'dart', name: 'Dart', color: 'bg-blue-600', description: 'Flutter programming language' },
        { id: 'expo', name: 'Expo', color: 'bg-black', description: 'React Native development tool' }
      ],
      'Unity': [
        { id: 'csharp', name: 'C#', color: 'bg-purple-600', description: 'Unity programming language' },
        { id: 'unity', name: 'Unity', color: 'bg-black', description: 'Game engine' },
        { id: 'blender', name: 'Blender', color: 'bg-orange-500', description: '3D modeling software' },
        { id: 'vuforia', name: 'Vuforia', color: 'bg-blue-600', description: 'AR development platform' }
      ],
      'Unreal Engine': [
        { id: 'cpp', name: 'C++', color: 'bg-blue-800', description: 'Unreal Engine programming language' },
        { id: 'unreal', name: 'Unreal Engine', color: 'bg-black', description: 'Game engine' },
        { id: 'blueprints', name: 'Blueprints', color: 'bg-blue-500', description: 'Visual scripting system' },
        { id: 'substance', name: 'Substance Painter', color: 'bg-orange-500', description: '3D texturing software' }
      ],
      'Game Design': [
        { id: 'figma', name: 'Figma', color: 'bg-purple-500', description: 'UI/UX design tool' },
        { id: 'photoshop', name: 'Photoshop', color: 'bg-blue-600', description: 'Image editing software' },
        { id: 'gimp', name: 'GIMP', color: 'bg-orange-500', description: 'Free image editor' },
        { id: 'aseprite', name: 'Aseprite', color: 'bg-gray-800', description: 'Pixel art editor' }
      ],
      'Design Systems': [
        { id: 'figma', name: 'Figma', color: 'bg-purple-500', description: 'UI/UX design tool' },
        { id: 'sketch', name: 'Sketch', color: 'bg-orange-500', description: 'Digital design toolkit' },
        { id: 'storybook', name: 'Storybook', color: 'bg-pink-500', description: 'UI component explorer' },
        { id: 'zeplin', name: 'Zeplin', color: 'bg-blue-600', description: 'Design handoff tool' }
      ],
      'User Research': [
        { id: 'figma', name: 'Figma', color: 'bg-purple-500', description: 'UI/UX design tool' },
        { id: 'usabilityhub', name: 'UsabilityHub', color: 'bg-blue-500', description: 'User research platform' },
        { id: 'lookback', name: 'Lookback', color: 'bg-orange-500', description: 'User testing platform' },
        { id: 'hotjar', name: 'Hotjar', color: 'bg-red-600', description: 'Behavior analytics' }
      ],
      'Interaction Design': [
        { id: 'figma', name: 'Figma', color: 'bg-purple-500', description: 'UI/UX design tool' },
        { id: 'principle', name: 'Principle', color: 'bg-black', description: 'Animation design tool' },
        { id: 'framer', name: 'Framer', color: 'bg-purple-600', description: 'Interactive design tool' },
        { id: 'after-effects', name: 'After Effects', color: 'bg-purple-800', description: 'Motion graphics software' }
      ]
    };

    // Return technologies based on specialization
    return specializationMap[data.specialization_field] || [
      { id: 'general', name: 'General Technologies', color: 'bg-gray-500', description: 'Technologies for your selected specialization' }
    ];
  };

  const technologyOptions = getTechnologyOptions();

  const handleTechnologyToggle = (technologyId) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(technologyId)) {
        return prev.filter(id => id !== technologyId);
      } else {
        return [...prev, technologyId];
      }
    });
  };

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    onUpdate({
      preferred_technologies: selectedTechnologies
    });
  }, [selectedTechnologies, onUpdate]);

  // Only update parent when value changes
  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleNext = () => {
    if (selectedTechnologies.length > 0) {
      onNext();
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
            Select the technologies you'd like to learn or improve in {data.specialization_field || 'your specialization'}
          </p>
        </div>

        {/* Technology Options */}
        <div className="space-y-6 max-w-4xl mx-auto w-full">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                Technologies for {data.specialization_field || 'Your Specialization'}
              </h4>
              <span className="text-sm text-gray-500">
                ({selectedTechnologies.length} selected)
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {technologyOptions.map((technology) => (
                <div
                  key={technology.id}
                  onClick={() => handleTechnologyToggle(technology.id)}
                  className={`cursor-pointer rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-md hover:scale-105 ${
                    selectedTechnologies.includes(technology.id)
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${technology.color}`} />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 truncate">
                        {technology.name}
                      </h5>
                      <p className="text-xs text-gray-500 truncate">
                        {technology.description}
                      </p>
                    </div>
                    {selectedTechnologies.includes(technology.id) && (
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
          disabled={selectedTechnologies.length === 0}
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