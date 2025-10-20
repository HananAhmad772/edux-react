import { FileText, Shield, UserCheck, CheckCircle, AlertTriangle, Mail } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      description: 'By accessing or using EduX, you agree to abide by these Terms of Service and all applicable laws and regulations. If you do not agree, please discontinue use immediately.'
    },
    {
      icon: UserCheck,
      title: 'User Responsibilities',
      description: 'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      description: 'All content on EduX including courses, graphics, and branding are the intellectual property of EduX or its licensors. You may not reproduce or distribute without permission.'
    },
    {
      icon: CheckCircle,
      title: 'Prohibited Activities',
      description: 'You agree not to misuse the platform, upload malicious content, attempt unauthorized access, or use EduX for illegal purposes.'
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer of Liability',
      description: 'EduX provides educational resources “as is” without warranties of any kind. We are not responsible for any loss resulting from the use of our platform.'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'For questions about these Terms of Service, please contact us at support@edux.com.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Please read these terms carefully before using EduX. They outline your rights and responsibilities when accessing our platform.
          </p>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Terms at a Glance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These terms explain how you can use EduX and what we expect from you as a learner.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex flex-col md:flex-row md:items-start md:space-x-6"
                >
                  {/* Gradient icon background updated to match Privacy Policy */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 md:mb-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: September 2025. By continuing to use EduX, you acknowledge and agree to the latest version of our Terms of Service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
