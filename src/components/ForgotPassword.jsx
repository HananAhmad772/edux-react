import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import AuthLayout from './AuthLayout';

const ForgotPassword = () => {
  const [verificationMethod, setVerificationMethod] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleMethodSelect = (method) => {
    setVerificationMethod(method);
    setEmail('');
    setPhone('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Verification Code Sent!
          </h2>
          <p className="text-gray-600 mb-6">
            {verificationMethod === 'email' 
              ? `We've sent a verification code to ${email}. Please check your email and enter the code below.`
              : `We've sent a verification code via WhatsApp to ${phone}. Please check your WhatsApp and enter the code below.`
            }
          </p>
          <Link
            to="/verify-otp"
            className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Verify Code
          </Link>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-primary hover:text-primary/80 font-medium"
          >
            Back to forgot password
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Don't worry! It happens. Please select a method to reset your password.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleMethodSelect('email')}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              verificationMethod === 'email'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                verificationMethod === 'email' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Email Verification</div>
                <div className="text-sm text-gray-500">Receive code via email</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleMethodSelect('whatsapp')}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              verificationMethod === 'whatsapp'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                verificationMethod === 'whatsapp' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">WhatsApp Verification</div>
                <div className="text-sm text-gray-500">Receive code via WhatsApp</div>
              </div>
            </div>
          </button>
        </div>

        {verificationMethod && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {verificationMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your phone number"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Make sure this number is registered with WhatsApp
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !(verificationMethod === 'email' ? email : phone)}
              className="w-full px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
