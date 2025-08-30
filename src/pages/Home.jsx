import { ArrowRight, Play, Star, Users, Award, Briefcase, BookOpen, Globe, Zap, Target, CheckCircle, Building, GraduationCap, Code, Smartphone, Cloud, Database, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Free Learning',
      description: 'Access high-quality software development courses completely free. Learn at your own pace with video tutorials and hands-on projects.'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn industry-recognized certifications that boost your resume and increase your job prospects in the tech industry.'
    },
    {
      icon: Users,
      title: 'Expert Mentors',
      description: 'Learn from industry professionals and experienced developers who guide you through your learning journey.'
    },
    {
      icon: Briefcase,
      title: 'Job Placement',
      description: 'Direct connection to companies hiring developers. Build your career with our job placement services.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with students and developers worldwide. Share knowledge and grow together.'
    },
    {
      icon: Zap,
      title: 'Skills Exchange',
      description: 'Unique platform for professionals to exchange skills and knowledge with each other.'
    }
  ];

  const userTypes = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Learn software development skills for free and get certified',
      features: ['Free courses', 'Expert mentors', 'Industry certifications', 'Job placement'],
      cta: 'Start Learning',
      link: '/register/student',
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Building,
      title: 'Companies',
      description: 'Find and hire qualified developers from our platform',
      features: ['Talent discovery', 'Verified skills', 'Direct hiring', 'Company branding'],
      cta: 'Start Hiring',
      link: '/register/company',
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: Users,
      title: 'Mentors',
      description: 'Share your expertise and help others grow',
      features: ['Build authority', 'Earn income', 'Global impact', 'Network growth'],
      cta: 'Become Mentor',
      link: '/register/mentor',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: BookOpen,
      title: 'Professionals',
      description: 'Exchange skills with other professionals',
      features: ['Skill sharing', 'Networking', 'Collaboration', 'Growth opportunities'],
      cta: 'Join Network',
      link: '/register/professional',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const learningPaths = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Frontend, Backend, Full-stack development',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases'],
      duration: '4-6 months',
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'iOS, Android, Cross-platform apps',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX'],
      duration: '4-6 months',
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'AWS, Azure, DevOps practices',
      skills: ['AWS Services', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure'],
      duration: '4-6 months',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Machine Learning, Analytics, Big Data',
      skills: ['Python', 'ML Algorithms', 'SQL', 'Data Visualization', 'Statistics'],
      duration: '4-6 months',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Students Enrolled' },
    { number: '500+', label: 'Expert Mentors' },
    { number: '200+', label: 'Partner Companies' },
    { number: '95%', label: 'Job Placement Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Software Development
            <span className="block text-blue-200">Build Your Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join EduX - The ultimate platform for learning software development, 
            connecting with mentors, and launching your tech career. Everything is completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register/student"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join EduX Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're learning, teaching, hiring, or networking - we have a place for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{type.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{type.description}</p>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={type.link}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 bg-gradient-to-r ${type.color} text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
                  >
                    {type.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Structured learning paths designed to take you from beginner to job-ready developer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{path.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{path.description}</p>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Skills you'll learn:</div>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-600 mb-2">Duration:</div>
                    <div className="font-semibold text-gray-900">{path.duration}</div>
                  </div>
                  <Link
                    to="/register/student"
                    className={`w-full inline-flex justify-center items-center px-4 py-2 bg-gradient-to-r ${path.color} text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105`}
                  >
                    Start Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduX?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in the tech industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎉 Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real people, real results. See how EduX is transforming careers and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Top Student Preview */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  🥇
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-blue-600">Full Stack Developer</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                "EduX transformed my career! I went from zero coding knowledge to landing a job at a top tech company in just 6 months."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Grade: <span className="font-bold text-blue-600">98%</span></span>
                <Link to="/students" className="text-blue-600 hover:text-blue-800 font-medium">View More →</Link>
              </div>
            </div>

            {/* Top Mentor Preview */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  👨‍🏫
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Dr. Sarah Chen</div>
                  <div className="text-sm text-orange-600">Senior Developer</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                "Teaching at EduX has been incredibly rewarding. I've helped over 500 students launch their careers in tech."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Rating: <span className="font-bold text-orange-600">4.9★</span></span>
                <Link to="/mentors" className="text-orange-600 hover:text-orange-800 font-medium">View More →</Link>
              </div>
            </div>

            {/* Top Company Preview */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  🏢
                </div>
                <div>
                  <div className="font-semibold text-gray-900">TechCorp Solutions</div>
                  <div className="text-sm text-green-600">SaaS Platform</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                "EduX has revolutionized our hiring process. We've built an exceptional development team that drives our success."
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">85 Developers Hired</span>
                <Link to="/companies" className="text-green-600 hover:text-green-800 font-medium">View More →</Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex space-x-4">
              <Link
                to="/students"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                View Top Students
              </Link>
              <Link
                to="/mentors"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200"
              >
                View Top Mentors
              </Link>
              <Link
                to="/companies"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200"
              >
                View Top Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              EduX by the Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of students and professionals who trust EduX for their learning journey.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join EduX today and take the first step towards your dream tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register/student"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/register/mentor"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
