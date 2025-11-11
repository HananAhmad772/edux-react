import { useState, useEffect, useCallback } from 'react';
import { Monitor, Server, Layers, ArrowRight, ArrowLeft, Cpu, Database, Smartphone, Gamepad2, Lock, Blocks, Palette, Cloud, Brain } from 'lucide-react';

const SpecializationStep = ({ data, onUpdate, onNext, onBack, currentQuestion, canGoBack }) => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(data.specialization_field || '');

  // Define specializations based on field of interest
  const getSpecializationOptions = () => {
    switch (data.major_subject) {
      case 'Artificial Intelligence & Machine Learning':
        return [
          {
            id: 'Deep Learning',
            title: 'Deep Learning',
            description: 'Neural networks and deep learning architectures',
            icon: Brain,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Neural Networks',
              'Convolutional Neural Networks',
              'Recurrent Neural Networks',
              'Transformers'
            ]
          },
          {
            id: 'NLP',
            title: 'NLP',
            description: 'Natural Language Processing and understanding',
            icon: Layers,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Text Processing',
              'Language Models',
              'Sentiment Analysis',
              'Chatbots'
            ]
          },
          {
            id: 'Computer Vision',
            title: 'Computer Vision',
            description: 'Image and video analysis systems',
            icon: Monitor,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Image Recognition',
              'Object Detection',
              'Image Segmentation',
              'Video Analysis'
            ]
          },
          {
            id: 'AI Engineering',
            title: 'AI Engineering',
            description: 'Deployment and production of AI systems',
            icon: Cpu,
            color: 'from-orange-500 to-red-500',
            details: [
              'Model Deployment',
              'MLOps',
              'AI Infrastructure',
              'Performance Optimization'
            ]
          }
        ];
      
      case 'Full-Stack Development':
        return [
          {
            id: 'Frontend (React, Next.js)',
            title: 'Frontend (React, Next.js)',
            description: 'User interfaces with modern JavaScript frameworks',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'React.js',
              'Next.js',
              'State Management',
              'Component Architecture'
            ]
          },
          {
            id: 'Backend (Node.js, Python)',
            title: 'Backend (Node.js, Python)',
            description: 'Server-side development and APIs',
            icon: Server,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Node.js/Express',
              'Python/Django',
              'RESTful APIs',
              'Database Integration'
            ]
          },
          {
            id: 'Mobile Development',
            title: 'Mobile Development',
            description: 'Cross-platform mobile applications',
            icon: Smartphone,
            color: 'from-teal-500 to-green-500',
            details: [
              'React Native',
              'Flutter',
              'iOS Development',
              'Android Development'
            ]
          }
        ];

      case 'Cloud Computing & DevOps':
        return [
          {
            id: 'AWS/Azure/GCP',
            title: 'AWS/Azure/GCP',
            description: 'Cloud platforms and services',
            icon: Cloud,
            color: 'from-orange-500 to-red-500',
            details: [
              'Cloud Architecture',
              'Compute Services',
              'Storage Solutions',
              'Networking'
            ]
          },
          {
            id: 'Docker/Kubernetes',
            title: 'Docker/Kubernetes',
            description: 'Containerization and orchestration',
            icon: Layers,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Container Management',
              'Orchestration',
              'Microservices',
              'Service Mesh'
            ]
          },
          {
            id: 'CI/CD',
            title: 'CI/CD',
            description: 'Continuous Integration and Deployment',
            icon: Cpu,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Automated Testing',
              'Pipeline Setup',
              'Deployment Strategies',
              'Version Control'
            ]
          },
          {
            id: 'Infrastructure as Code',
            title: 'Infrastructure as Code',
            description: 'Managing infrastructure through code',
            icon: Server,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Terraform',
              'CloudFormation',
              'Ansible',
              'Automation Scripts'
            ]
          }
        ];

      case 'Data Science & Analytics':
        return [
          {
            id: 'Data Analysis',
            title: 'Data Analysis',
            description: 'Analyzing and interpreting complex data',
            icon: Database,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Data Cleaning',
              'Statistical Analysis',
              'Data Visualization',
              'Reporting'
            ]
          },
          {
            id: 'Business Intelligence',
            title: 'Business Intelligence',
            description: 'Transforming data into business insights',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Dashboard Creation',
              'KPI Tracking',
              'Data Warehousing',
              'ETL Processes'
            ]
          },
          {
            id: 'Big Data Engineering',
            title: 'Big Data Engineering',
            description: 'Processing and managing large datasets',
            icon: Server,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Hadoop/Spark',
              'Data Pipelines',
              'Stream Processing',
              'Distributed Systems'
            ]
          }
        ];

      case 'Cybersecurity':
        return [
          {
            id: 'Ethical Hacking',
            title: 'Ethical Hacking',
            description: 'Identifying vulnerabilities and security weaknesses',
            icon: Lock,
            color: 'from-red-500 to-orange-500',
            details: [
              'Penetration Testing',
              'Vulnerability Assessment',
              'Network Security',
              'Exploitation Techniques'
            ]
          },
          {
            id: 'Security Engineering',
            title: 'Security Engineering',
            description: 'Designing secure systems and applications',
            icon: Server,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Secure Architecture',
              'Encryption',
              'Access Control',
              'Security Protocols'
            ]
          },
          {
            id: 'Cloud Security',
            title: 'Cloud Security',
            description: 'Protecting cloud-based systems and data',
            icon: Cloud,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Identity Management',
              'Compliance',
              'Data Protection',
              'Threat Monitoring'
            ]
          }
        ];

      case 'Blockchain & Web3 Development':
        return [
          {
            id: 'Smart Contracts',
            title: 'Smart Contracts',
            description: 'Self-executing contracts with blockchain',
            icon: Blocks,
            color: 'from-indigo-500 to-purple-500',
            details: [
              'Solidity',
              'Contract Development',
              'Testing',
              'Deployment'
            ]
          },
          {
            id: 'DeFi',
            title: 'DeFi',
            description: 'Decentralized Finance applications',
            icon: Layers,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Token Creation',
              'Lending Protocols',
              'DEX Development',
              'Yield Farming'
            ]
          },
          {
            id: 'NFT Development',
            title: 'NFT Development',
            description: 'Non-Fungible Token creation and management',
            icon: Palette,
            color: 'from-pink-500 to-rose-500',
            details: [
              'NFT Standards',
              'Marketplace Creation',
              'Digital Art',
              'Metadata Management'
            ]
          }
        ];

      case 'Mobile App Development':
        return [
          {
            id: 'Native (iOS/Android)',
            title: 'Native (iOS/Android)',
            description: 'Platform-specific mobile development',
            icon: Smartphone,
            color: 'from-teal-500 to-green-500',
            details: [
              'Swift/Kotlin',
              'Native APIs',
              'App Store Guidelines',
              'Performance Optimization'
            ]
          },
          {
            id: 'Cross-platform (Flutter, React Native)',
            title: 'Cross-platform (Flutter, React Native)',
            description: 'Single codebase for multiple platforms',
            icon: Layers,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'Flutter/Dart',
              'React Native',
              'Shared Logic',
              'Platform Integration'
            ]
          }
        ];

      case 'Game Development':
        return [
          {
            id: 'Unity',
            title: 'Unity',
            description: 'Cross-platform game engine development',
            icon: Gamepad2,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'C# Programming',
              '3D Graphics',
              'Physics Engine',
              'Multiplatform Deployment'
            ]
          },
          {
            id: 'Unreal Engine',
            title: 'Unreal Engine',
            description: 'High-fidelity game engine development',
            icon: Cpu,
            color: 'from-purple-500 to-pink-500',
            details: [
              'Blueprints',
              'C++ Programming',
              'Real-time Rendering',
              'VR/AR Development'
            ]
          },
          {
            id: 'Game Design',
            title: 'Game Design',
            description: 'Game mechanics and user experience design',
            icon: Palette,
            color: 'from-orange-500 to-red-500',
            details: [
              'Game Mechanics',
              'Level Design',
              'User Experience',
              'Narrative Design'
            ]
          }
        ];

      case 'UI/UX Design & Frontend Engineering':
        return [
          {
            id: 'Design Systems',
            title: 'Design Systems',
            description: 'Creating consistent design languages',
            icon: Palette,
            color: 'from-pink-500 to-rose-500',
            details: [
              'Component Libraries',
              'Style Guides',
              'Design Tokens',
              'Consistency Standards'
            ]
          },
          {
            id: 'User Research',
            title: 'User Research',
            description: 'Understanding user needs and behaviors',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: [
              'User Interviews',
              'Usability Testing',
              'Analytics',
              'Persona Development'
            ]
          },
          {
            id: 'Interaction Design',
            title: 'Interaction Design',
            description: 'Designing engaging user interactions',
            icon: Layers,
            color: 'from-green-500 to-emerald-500',
            details: [
              'Prototyping',
              'Microinteractions',
              'Animation',
              'Accessibility'
            ]
          }
        ];

      default:
        return [
          {
            id: 'General Focus',
            title: 'General Focus',
            description: 'Broad skill development across your selected field',
            icon: Monitor,
            color: 'from-blue-500 to-cyan-500',
            details: ['Foundational Skills', 'Best Practices']
          }
        ];
    }
  };

  const specializationOptions = getSpecializationOptions();

  // Use useCallback to prevent function recreation on each render
  const handleUpdate = useCallback(() => {
    if (selectedSpecialization) {
      onUpdate({
        specialization_field: selectedSpecialization
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
    return data.major_subject || 'your selected field';
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