import { ArrowRight, BookOpen, Award, Users, Briefcase, Clock, CheckCircle, Play, Star, Code, Smartphone, Cloud, Database, Globe, Zap, Target } from 'lucide-react';

const Students = () => {
  const courses = [
    {
      category: 'Web Development',
      icon: Code,
      courses: [
        {
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the basics of web markup and styling',
          duration: '4 weeks',
          level: 'Beginner',
          rating: 4.8,
          students: '2.5K',
          free: true
        },
        {
          title: 'JavaScript Mastery',
          description: 'Master modern JavaScript ES6+ and DOM manipulation',
          duration: '6 weeks',
          level: 'Intermediate',
          rating: 4.9,
          students: '3.2K',
          free: true
        },
        {
          title: 'React.js Complete Course',
          description: 'Build modern web applications with React',
          duration: '8 weeks',
          level: 'Intermediate',
          rating: 4.9,
          students: '4.1K',
          free: true
        }
      ]
    },
    {
      category: 'Mobile Development',
      icon: Smartphone,
      courses: [
        {
          title: 'React Native Basics',
          description: 'Create cross-platform mobile apps with React Native',
          duration: '8 weeks',
          level: 'Intermediate',
          rating: 4.7,
          students: '1.8K',
          free: true
        },
        {
          title: 'Flutter Development',
          description: 'Build beautiful apps with Google\'s Flutter framework',
          duration: '10 weeks',
          level: 'Intermediate',
          rating: 4.8,
          students: '1.5K',
          free: true
        }
      ]
    },
    {
      category: 'Cloud Computing',
      icon: Cloud,
      courses: [
        {
          title: 'AWS Fundamentals',
          description: 'Learn Amazon Web Services from scratch',
          duration: '6 weeks',
          level: 'Intermediate',
          rating: 4.9,
          students: '2.1K',
          free: true
        },
        {
          title: 'Docker & Kubernetes',
          description: 'Master containerization and orchestration',
          duration: '8 weeks',
          level: 'Advanced',
          rating: 4.8,
          students: '1.2K',
          free: true
        }
      ]
    },
    {
      category: 'Data Science',
      icon: Database,
      courses: [
        {
          title: 'Python for Data Science',
          description: 'Learn Python programming for data analysis and machine learning',
          duration: '6 weeks',
          level: 'Beginner',
          rating: 4.9,
          students: '2.8K',
          free: true
        },
        {
          title: 'Machine Learning Fundamentals',
          description: 'Introduction to ML algorithms and data preprocessing',
          duration: '8 weeks',
          level: 'Intermediate',
          rating: 4.8,
          students: '1.9K',
          free: true
        },
        {
          title: 'Data Visualization with Python',
          description: 'Create compelling charts and interactive dashboards',
          duration: '4 weeks',
          level: 'Intermediate',
          rating: 4.7,
          students: '1.6K',
          free: true
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: 'Free Access',
      description: 'All courses, materials, and resources are completely free'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Earn recognized certificates that boost your resume'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals and experienced developers'
    },
    {
      icon: Briefcase,
      title: 'Job Placement',
      description: 'Direct connection to companies hiring developers'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with students and developers worldwide'
    },
    {
      icon: Zap,
      title: 'Hands-on Projects',
      description: 'Build real-world projects for your portfolio'
    }
  ];

  const learningPath = [
    {
      step: '01',
      title: 'Choose Your Path',
      description: 'Select from web development, mobile apps, cloud computing, or data science'
    },
    {
      step: '02',
      title: 'Start Learning',
      description: 'Begin with fundamentals and progress through structured courses'
    },
    {
      step: '03',
      title: 'Build Projects',
      description: 'Apply your knowledge by building real-world applications'
    },
    {
      step: '04',
      title: 'Get Certified',
      description: 'Complete assessments and earn industry-recognized certifications'
    },
    {
      step: '05',
      title: 'Land Your Job',
      description: 'Use our job placement services to find your dream tech position'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Start Your Tech Career
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Access world-class software development education completely free. 
            Learn from experts, build real projects, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Browse Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              <Play className="mr-2 w-5 h-5" />
              Watch Intro Video
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduX for Learning?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in the tech industry, completely free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow our proven 5-step process to become a job-ready developer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {learningPath.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive course catalog covering all major tech skills.
            </p>
          </div>
          
          {courses.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="mb-16">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {course.level}
                          </span>
                          {course.free && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                              FREE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{course.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students} students</span>
                        </span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Students Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Top Performing Students
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our outstanding students who have achieved exceptional results and are leading the way in their tech careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Top Student 1 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  {/* <div className="text-6xl">🥇</div>  */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Sarah Johnson"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Sarah Johnson</h3>
                  <p className="text-blue-600 font-medium">Full Stack Developer</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Grade:</span>
                    <span className="font-bold text-blue-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Completed:</span>
                    <span className="font-bold text-purple-600">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Certifications:</span>
                    <span className="font-bold text-indigo-600">8</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "EduX transformed my career! I went from zero coding knowledge to landing a job at a top tech company in just 6 months."
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Node.js</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">AWS</span>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-medium">Python</span>
                </div>
              </div>
            </div>

            {/* Top Student 2 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                  {/* <div className="text-6xl">🥈</div> */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Marcus Chen"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Marcus Chen</h3>
                  <p className="text-blue-600 font-medium">Data Scientist</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Grade:</span>
                    <span className="font-bold text-blue-600">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Completed:</span>
                    <span className="font-bold text-purple-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Certifications:</span>
                    <span className="font-bold text-indigo-600">7</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "The data science track at EduX is incredible. The hands-on projects and mentor support helped me master complex algorithms."
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Python</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">ML</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">TensorFlow</span>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-medium">SQL</span>
                </div>
              </div>
            </div>

            {/* Top Student 3 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-indigo-400 to-violet-500 flex items-center justify-center">
                  {/* <div className="text-6xl">🥉</div>  */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Priya Patel"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Priya Patel</h3>
                  <p className="text-blue-600 font-medium">Mobile Developer</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Grade:</span>
                    <span className="font-bold text-blue-600">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects Completed:</span>
                    <span className="font-bold text-purple-600">11</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Certifications:</span>
                    <span className="font-bold text-indigo-600">6</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "EduX gave me the confidence to pursue mobile development. Now I'm building apps that thousands of users love!"
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">React Native</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Flutter</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">iOS</span>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-medium">Android</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              View All Top Students
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who are already building their tech careers with EduX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              View All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Students;
