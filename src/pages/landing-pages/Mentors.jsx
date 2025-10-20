// Imports stay the same (icons reused)

import { ArrowRight, Award, Briefcase, Calendar, CheckCircle, Globe, Lightbulb, Target, TrendingUp, Users, Zap } from "lucide-react";

const JobSeekers = () => {
  const seekerBenefits = [
    {
      icon: Briefcase,
      title: 'Discover Opportunities',
      description: 'Access thousands of internships, remote roles, and full-time jobs worldwide.'
    },
    {
      icon: Users,
      title: 'Expand Your Network',
      description: 'Connect with recruiters, hiring managers, and like-minded professionals.'
    },
    {
      icon: TrendingUp,
      title: 'Boost Your Career',
      description: 'Get personalized career advice, resume tips, and interview preparation.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Apply for positions from top companies across the globe.'
    },
    {
      icon: Zap,
      title: 'Upskill Yourself',
      description: 'Learn new skills and get certifications to stand out in the job market.'
    },
    {
      icon: Lightbulb,
      title: 'Career Guidance',
      description: 'Receive mentorship and resources tailored to your goals.'
    }
  ];

  const jobTypes = [
    {
      icon: Briefcase,
      title: 'Full-Time Roles',
      description: 'Find stable, long-term positions across industries.',
      requirements: ['Updated Resume', 'Relevant Skills', 'Professional References'],
      compensation: 'Salary varies by role',
      timeCommitment: '40+ hours per week'
    },
    {
      icon: Calendar,
      title: 'Internships',
      description: 'Gain experience and build your portfolio through internships.',
      requirements: ['Student or Recent Graduate', 'Willingness to Learn', 'Basic Skills in Field'],
      compensation: 'Stipend or unpaid',
      timeCommitment: '10-30 hours per week'
    },
    {
      icon: Target,
      title: 'Freelance Projects',
      description: 'Work flexibly on short-term projects with companies worldwide.',
      requirements: ['Portfolio of Work', 'Time Management Skills', 'Communication Skills'],
      compensation: 'Project-based payments',
      timeCommitment: 'Flexible'
    }
  ];

  const seekerRequirements = [
    {
      title: 'Professional Resume',
      description: 'An up-to-date resume that highlights your skills and achievements.',
      icon: CheckCircle
    },
    {
      title: 'Portfolio / Projects',
      description: 'Showcase of your work or academic projects to stand out.',
      icon: Award
    },
    {
      title: 'Willingness to Learn',
      description: 'Openness to feedback and skill improvement.',
      icon: Lightbulb
    },
    {
      title: 'Active Profile',
      description: 'Keep your profile updated for recruiters to reach you.',
      icon: Users
    }
  ];

  const applicationSteps = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and complete your professional profile.'
    },
    {
      step: '02',
      title: 'Upload Resume',
      description: 'Add your CV and portfolio to showcase your strengths.'
    },
    {
      step: '03',
      title: 'Apply for Jobs',
      description: 'Browse jobs and send tailored applications directly.'
    },
    {
      step: '04',
      title: 'Get Hired',
      description: 'Receive interview invites and job offers from top companies.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Dream Job</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Join our platform and unlock thousands of career opportunities, build your network, and land your next job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all">
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Join as a Job Seeker?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the benefits of starting your job search with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seekerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
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

      {/* Job Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore different job types that match your career goals.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jobTypes.map((job, index) => {
              const Icon = job.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{job.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{job.description}</p>
                  {/* requirements & details */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements + Steps sections reused with seekerRequirements and applicationSteps */}
    </div>
  );
};

export default JobSeekers;
