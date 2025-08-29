import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Users, Building, BookOpen, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoinAsDropdownOpen, setIsJoinAsDropdownOpen] = useState(false);
  const [isGetStartedDropdownOpen, setIsGetStartedDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: GraduationCap },
    { name: 'About', path: '/about', icon: Users },
    { name: 'Skills Exchange', path: '/skills-exchange', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Building },
  ];

  const userTypeItems = [
    { name: 'Students', path: '/students', icon: GraduationCap },
    { name: 'Companies', path: '/companies', icon: Building },
    { name: 'Mentors', path: '/mentors', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduX
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* User Types Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsJoinAsDropdownOpen(!isJoinAsDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <Users className="w-4 h-4" />
                <span>Join As</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isJoinAsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {userTypeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsJoinAsDropdownOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
            >
              Sign In
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsGetStartedDropdownOpen(!isGetStartedDropdownOpen)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </button>
              
              {isGetStartedDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/register/student"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsGetStartedDropdownOpen(false)}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                  </Link>
                  <Link
                    to="/register/mentor"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsGetStartedDropdownOpen(false)}
                  >
                    <Users className="w-4 h-4" />
                    <span>Mentor</span>
                  </Link>
                  <Link
                    to="/register/company"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsGetStartedDropdownOpen(false)}
                  >
                    <Building className="w-4 h-4" />
                    <span>Company</span>
                  </Link>
                  <Link
                    to="/register/professional"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsGetStartedDropdownOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Professional</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Types */}
              <div className="pt-4 border-t border-gray-200">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">Join As:</div>
                {userTypeItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 text-center block"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/register/student"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Student
                  </Link>
                  <Link
                    to="/register/mentor"
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Mentor
                  </Link>
                  <Link
                    to="/register/company"
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Company
                  </Link>
                  <Link
                    to="/register/professional"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Professional
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
