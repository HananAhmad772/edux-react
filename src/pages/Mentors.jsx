import { ArrowRight, Users, BookOpen, Award, Briefcase, Globe, Zap, Target, CheckCircle, MessageCircle, Video, Calendar, Star, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';

const Mentors = () => {
  const mentorBenefits = [
    {
      icon: Users,
      title: 'Build Your Network',
      description: 'Connect with students and professionals worldwide, expanding your professional reach'
    },
    {
      icon: Award,
      title: 'Establish Authority',
      description: 'Position yourself as an industry expert and thought leader in your field'
    },
    {
      icon: DollarSign,
      title: 'Earn Income',
      description: 'Generate revenue through teaching, consulting, and premium content creation'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Make a difference in students\' lives across the world'
    },
    {
      icon: Zap,
      title: 'Stay Updated',
      description: 'Keep your skills current while teaching the latest technologies'
    },
    {
      icon: Lightbulb,
      title: 'Personal Growth',
      description: 'Develop leadership and communication skills through mentoring'
    }
  ];

  const teachingAreas = [
    {
      icon: BookOpen,
      title: 'Course Creation',
      description: 'Design and deliver comprehensive courses in your area of expertise',
      requirements: ['5+ years experience', 'Strong communication skills', 'Portfolio of work'],
      compensation: '$500 - $2000 per course',
      timeCommitment: '20-40 hours per month'
    },
    {
      icon: MessageCircle,
      title: '1-on-1 Mentoring',
      description: 'Provide personalized guidance to individual students',
      requirements: ['3+ years experience', 'Patience and empathy', 'Problem-solving skills'],
      compensation: '$50 - $150 per hour',
      timeCommitment: '5-15 hours per month'
    },
    {
      icon: Video,
      title: 'Live Workshops',
      description: 'Conduct interactive live sessions and hands-on workshops',
      requirements: ['4+ years experience', 'Public speaking ability', 'Technical expertise'],
      compensation: '$200 - $500 per session',
      timeCommitment: '10-20 hours per month'
    }
  ];

  const mentorRequirements = [
    {
      title: 'Technical Expertise',
      description: 'Minimum 3+ years of professional experience in your field',
      icon: Target
    },
    {
      title: 'Communication Skills',
      description: 'Ability to explain complex concepts in simple terms',
      icon: MessageCircle
    },
    {
      title: 'Passion for Teaching',
      description: 'Genuine interest in helping others learn and grow',
      icon: Lightbulb
    },
    {
      title: 'Portfolio',
      description: 'Showcase of your work and achievements in the industry',
      icon: Award
    }
  ];

  const successStories = [
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'Google',
      story: 'Started mentoring 2 years ago, now teaches 50+ students monthly and earns $3K+ extra income.',
      students: '50+ monthly',
      income: '$3K+ monthly',
      color: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Mike Rodriguez',
      role: 'DevOps Engineer',
      company: 'Amazon',
      story: 'Created AWS courses that helped 200+ students get cloud certifications and better jobs.',
      students: '200+ total',
      income: '$5K+ monthly',
      color: 'from-green-600 to-teal-600'
    },
    {
      name: 'Emily Watson',
      role: 'Mobile Developer',
      company: 'Apple',
      story: 'Specializes in iOS development mentoring, helping students build successful app careers.',
      students: '30+ monthly',
      income: '$2.5K+ monthly',
      color: 'from-orange-600 to-red-600'
    }
  ];

  const applicationSteps = [
    {
      step: '01',
      title: 'Submit Application',
      description: 'Fill out our mentor application with your experience and expertise'
    },
    {
      step: '02',
      title: 'Portfolio Review',
      description: 'Our team reviews your work and verifies your qualifications'
    },
    {
      step: '03',
      title: 'Interview & Demo',
      description: 'Complete a brief interview and teaching demonstration'
    },
    {
      step: '04',
      title: 'Onboarding',
      description: 'Get trained on our platform and start mentoring students'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your Expertise
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Become a mentor and help shape the next generation of developers. 
            Share your knowledge, build your network, and earn income while making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Apply as Mentor
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Become a Mentor?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the many benefits of joining our mentor community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center mb-4">
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

      {/* Teaching Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How You Can Teach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from multiple teaching formats that match your expertise and schedule.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {teachingAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{area.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Requirements:</div>
                      <ul className="space-y-1">
                        {area.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Compensation:</div>
                        <div className="text-lg font-semibold text-orange-600">{area.compensation}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Time:</div>
                        <div className="text-sm text-gray-600">{area.timeCommitment}</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200">
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Look For
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential qualities and qualifications for becoming an EduX mentor.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorRequirements.map((requirement, index) => {
              const Icon = requirement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{requirement.title}</h3>
                  <p className="text-gray-600">{requirement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 4-step process to start your mentoring journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mentor Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our mentors are making an impact and building successful careers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${story.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4`}>
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.role}</div>
                    <div className="text-xs text-gray-500">{story.company}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{story.story}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium text-gray-900">{story.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income:</span>
                    <span className="font-medium text-gray-900">{story.income}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Top Teachers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Top Performing Teachers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our exceptional mentors who are transforming lives through outstanding teaching and mentorship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Top Teacher 1 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                  {/* <div className="text-6xl">👨‍🏫</div>   */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Dr. Sarah Chen"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Sarah Chen</h3>
                  <p className="text-orange-600 font-medium">Senior Frontend Developer</p>
                  <p className="text-sm text-gray-500">Google</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students Taught:</span>
                    <span className="font-bold text-orange-600">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-red-600">4.9</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Courses Created:</span>
                    <span className="font-bold text-amber-600">12</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "Teaching at EduX has been incredibly rewarding. I've helped over 500 students launch their careers in tech while earning a great income."
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">React</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">JavaScript</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">Node.js</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">Monthly Income:</div>
                  <div className="text-2xl font-bold text-orange-600">$3,200</div>
                </div>
              </div>
            </div>

            {/* Top Teacher 2 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
                  {/* <div className="text-6xl">👩‍💼</div> */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Prof. Mike Rodriguez"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Prof. Mike Rodriguez</h3>
                  <p className="text-orange-600 font-medium">DevOps Engineer</p>
                  <p className="text-sm text-gray-500">Amazon</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students Taught:</span>
                    <span className="font-bold text-orange-600">750+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-red-600">4.8</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Courses Created:</span>
                    <span className="font-bold text-amber-600">8</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "EduX has given me the platform to share my AWS expertise with hundreds of students. The impact on their careers is incredibly satisfying."
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">AWS</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Docker</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">Kubernetes</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">Monthly Income:</div>
                  <div className="text-2xl font-bold text-orange-600">$4,800</div>
                </div>
              </div>
            </div>

            {/* Top Teacher 3 */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  {/* <div className="text-6xl">👩‍🏫</div> */}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Dr. Emily Watson"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. Emily Watson</h3>
                  <p className="text-orange-600 font-medium">Mobile Developer</p>
                  <p className="text-sm text-gray-500">Apple</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Students Taught:</span>
                    <span className="font-bold text-orange-600">420+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-red-600">4.9</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Courses Created:</span>
                    <span className="font-bold text-amber-600">6</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    "Mentoring iOS development has been my passion. Seeing students build successful apps and get hired by top companies is the ultimate reward."
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">iOS</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Swift</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">React Native</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">Monthly Income:</div>
                  <div className="text-2xl font-bold text-orange-600">$3,600</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              View All Top Teachers
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Mentoring?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our community of expert mentors and help shape the future of tech education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mentors;
