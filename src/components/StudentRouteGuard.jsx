import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

const StudentRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkProfileStatus();
  }, []);

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

      // COMMENTED OUT: Profile fetching logic since it's already handled by the dashboard
      // Check profile by calling the profile endpoint
      // const profileResponse = await api.get('/auth/profile');
      
      // if (profileResponse.data.status) {
      //   const user = profileResponse.data.data;

      //   // If user is a student
      //   if (user.user_type === 'student') {
      //     // Get student profile (support both snake_case and camelCase)
      //     const studentProfile = user.student_profile || user.studentProfile;
          
      //     // Check if profile exists and has required fields
      //     if (!studentProfile) {
      //       // No profile - redirect to setup
      //       if (location.pathname !== '/student/profile-setup') {
      //         navigate('/student/profile-setup');
      //         return;
      //       }
      //       setIsAuthorized(true);
      //       return;
      //     }

      //     // Check required fields
      //     const requiredFields = ['major_subject', 'current_skill_level', 'main_goal'];
      //     const hasRequiredFields = requiredFields.every(field => 
      //       studentProfile[field] && studentProfile[field].trim() !== ''
      //     );

      //     if (!hasRequiredFields) {
      //       // Profile incomplete - redirect to setup
      //       if (location.pathname !== '/student/profile-setup') {
      //         navigate('/student/profile-setup');
      //         return;
      //       }
      //       setIsAuthorized(true);
      //       return;
      //     }

      //     // Profile is complete - allow access
      //     setIsAuthorized(true);
      //   } else {
      //     // Not a student - redirect to appropriate dashboard or login
      //     if (user.user_type === 'company') {
      //       navigate('/company/dashboard');
      //     } else if (user.user_type === 'admin') {
      //       navigate('/admin/dashboard');
      //     } else {
      //       navigate('/login');
      //     }
      //   }
      // } else {
      //   // Profile check failed
      //   navigate('/login');
      // }
      
      // Since the profile check is handled by the dashboard, we'll just allow access
      setIsAuthorized(true);
    } catch (error) {
      console.error('Profile check error:', error);
      
      // If 403 and profile_incomplete, redirect to setup
      if (error.response?.status === 403 && error.response?.data?.profile_incomplete) {
        if (location.pathname !== '/student/profile-setup') {
          navigate('/student/profile-setup');
          return;
        }
      } else if (error.response?.status === 401) {
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

export default StudentRouteGuard;