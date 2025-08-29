import { ArrowRight, Building, Users, Briefcase, Search, Target, CheckCircle, Globe, Award, TrendingUp, MessageCircle, FileText, Calendar, MapPin, DollarSign } from 'lucide-react';

const Companies = () => {
  const services = [
    {
      icon: Search,
      title: 'Talent Discovery',
      description: 'Find qualified developers from our pool of certified students and professionals',
      features: ['Advanced filtering', 'Skill matching', 'Portfolio review', 'Background verification']
    },
    {
      icon: Users,
      title: 'Direct Recruitment',
      description: 'Connect directly with candidates through our streamlined hiring process',
      features: ['Direct messaging', 'Interview scheduling', 'Candidate tracking', 'Hiring analytics']
    },
    {
      icon: Building,
      title: 'Company Branding',
      description: 'Build your company profile and attract top talent to your organization',
      features: ['Company profiles', 'Job postings', 'Brand showcase', 'Employee testimonials']
    }
  ];

  const hiringProcess = [
    {
      step: '01',
      title: 'Post Job Opening',
      description: 'Create detailed job descriptions with requirements and benefits'
    },
    {
      step: '02',
      title: 'Review Candidates',
      description: 'Browse through qualified candidates with verified skills and certifications'
    },
    {
      step: '03',
      title: 'Connect & Interview',
      description: 'Schedule interviews and communicate directly with potential hires'
    },
    {
      step: '04',
      title: 'Hire & Onboard',
      description: 'Complete the hiring process and welcome new team members'
    }
  ];

  const jobCategories = [
    {
      title: 'Frontend Development',
      positions: 45,
      avgSalary: '$75K - $120K',
      skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'CSS3']
    },
    {
      title: 'Backend Development',
      positions: 38,
      avgSalary: '$80K - $130K',
      skills: ['Node.js', 'Python', 'Java', 'C#', 'PostgreSQL']
    },
    {
      title: 'Mobile Development',
      positions: 32,
      avgSalary: '$70K - $110K',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Kotlin']
    },
    {
      title: 'DevOps & Cloud',
      positions: 28,
      avgSalary: '$85K - $140K',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins']
    },
    {
      title: 'Data Science',
      positions: 25,
      avgSalary: '$90K - $150K',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'R']
    },
    {
      title: 'QA & Testing',
      positions: 20,
      avgSalary: '$65K - $100K',
      skills: ['Selenium', 'Jest', 'Cypress', 'Postman', 'JIRA']
    }
  ];

  const successStories = [
    {
      company: 'TechCorp Solutions',
      logo: 'TC',
      industry: 'SaaS Platform',
      story: 'Hired 15 developers through EduX, reducing our hiring time by 60% and improving team quality.',
      hires: '15 developers',
      timeReduction: '60%',
      color: 'from-blue-600 to-purple-600'
    },
    {
      company: 'InnovateMobile',
      logo: 'IM',
      industry: 'Mobile Apps',
      story: 'Found exceptional React Native developers who helped us launch our app ahead of schedule.',
      hires: '8 developers',
      timeReduction: '40%',
      color: 'from-green-600 to-teal-600'
    },
    {
      company: 'CloudFirst Systems',
      logo: 'CF',
      industry: 'Cloud Infrastructure',
      story: 'Recruited AWS experts who transformed our infrastructure and reduced costs by 30%.',
      hires: '12 developers',
      timeReduction: '50%',
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next Tech Talent
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
            Access a pool of certified developers, connect directly with candidates, 
            and build your dream team through our comprehensive hiring platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Post a Job
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200">
              Browse Talent
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Hiring Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find, evaluate, and hire the best tech talent for your company.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Hiring Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes hiring tech talent faster and more efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hiringProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find candidates across all major tech domains with verified skills and experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Open Positions:</span>
                    <span className="font-semibold text-green-600">{category.positions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Salary:</span>
                    <span className="font-semibold text-gray-900">{category.avgSalary}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Key Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200">
                  View Candidates
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how companies are transforming their teams with EduX talent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${story.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4`}>
                    {story.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.company}</div>
                    <div className="text-sm text-gray-600">{story.industry}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{story.story}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hires:</span>
                    <span className="font-medium text-gray-900">{story.hires}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Reduction:</span>
                    <span className="font-medium text-gray-900">{story.timeReduction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Dream Team?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of companies who are already hiring top tech talent through EduX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              Start Hiring Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Companies;
