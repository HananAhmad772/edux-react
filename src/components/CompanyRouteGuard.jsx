import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const CompanyRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkProfileStatus();
  }, []); // Remove location.pathname dependency to prevent multiple API calls

  const checkProfileStatus = async () => {
    try {
      setIsChecking(true);
      
      // Get token
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Set auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Check profile by calling the profile endpoint
      const profileResponse = await api.get('/auth/profile');
      
      if (profileResponse.data.status) {
        const user = profileResponse.data.data;

        // If user is a company
        if (user.user_type === 'company') {
          // Allow access to company dashboard
          setIsAuthorized(true);
        } else {
          // Not a company - redirect to appropriate dashboard or login
          if (user.user_type === 'student') {
            navigate('/student/dashboard');
          } else if (user.user_type === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/login');
          }
        }
      } else {
        // Profile check failed
        navigate('/login');
      }
    } catch (error) {
      console.error('Profile check error:', error);
      
      if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        navigate('/login');
        return;
      }
      
      // For other errors, redirect to login
      navigate('/login');
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Checking profile status...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect
  }

  return children;
};

export default CompanyRouteGuard;