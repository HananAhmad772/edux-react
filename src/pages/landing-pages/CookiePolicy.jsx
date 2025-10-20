import { Cookie, Shield, Eye, Settings, AlertCircle, Mail } from 'lucide-react';

const CookiePolicy = () => {
  const cookies = [
    {
      icon: Cookie,
      title: 'What Are Cookies?',
      description:
        'Cookies are small text files stored on your device to help us provide a better user experience and improve our services.'
    },
    {
      icon: Shield,
      title: 'How We Use Cookies',
      description:
        'We use cookies to remember your preferences, personalize your learning experience, and improve platform functionality.'
    },
    {
      icon: Eye,
      title: 'Third-Party Cookies',
      description:
        'Some cookies may come from trusted third-party services we use for analytics, authentication, or marketing purposes.'
    },
    {
      icon: Settings,
      title: 'Managing Cookies',
      description:
        'You can control or disable cookies through your browser settings. However, some features of EduX may not work properly without them.'
    },
    {
      icon: AlertCircle,
      title: 'Consent',
      description:
        'By continuing to use EduX, you consent to our use of cookies as described in this policy.'
    },
    {
      icon: Mail,
      title: 'Contact Us',
      description:
        'If you have any questions about our Cookie Policy, reach out to us at support@edux.com.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Learn how EduX uses cookies to enhance your learning experience and keep our platform secure.
          </p>
        </div>
      </section>

      {/* Cookies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Handle Cookies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our cookies ensure a smoother, safer, and more personalized experience for every learner.
            </p>
          </div>

          {/* Slightly changed template: 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
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
            Last updated: September 2025. By using EduX, you acknowledge and accept our use of cookies as described in this Cookie Policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
