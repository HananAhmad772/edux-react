import { Shield, Lock, EyeOff, UserCheck, Database, Globe, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: Shield,
      title: 'Your Privacy Matters',
      description: 'At EduX, protecting your personal information is our top priority. We are committed to handling your data responsibly and transparently.'
    },
    {
      icon: UserCheck,
      title: 'Information We Collect',
      description: 'We collect information you provide when signing up (name, email, and account preferences) and data about your learning activity to improve our services.'
    },
    {
      icon: Database,
      title: 'How We Use Your Data',
      description: 'Your data is used to deliver personalized learning experiences, provide certifications, improve our platform, and connect you with job opportunities.'
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'All personal data is stored securely and encrypted where possible. We implement industry-standard security measures to protect your information from unauthorized access.'
    },
    {
      icon: EyeOff,
      title: 'Third-Party Sharing',
      description: 'We never sell your personal information. We may share limited data with trusted service providers or hiring partners only when necessary and with your consent.'
    },
    {
      icon: Globe,
      title: 'International Users',
      description: 'Your data may be processed and stored on servers located outside your home country but always in compliance with applicable privacy laws.'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description: 'If you have any questions about our Privacy Policy or how your data is handled, contact us at support@edux.com.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Learn how EduX collects, uses, and protects your personal information to keep your learning experience safe and secure.
          </p>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Privacy Commitments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparency and security are at the heart of how we handle your data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-200">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{policy.title}</h3>
                  <p className="text-gray-600">{policy.description}</p>
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
            Last updated: September 2025. EduX reserves the right to update this Privacy Policy as needed.  
            Continued use of our platform constitutes acceptance of the latest policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
