import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // TODO: Implement token validation with backend
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        email,
        password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      toast.success('Successfully signed in!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to sign in');
      return false;
    }
  };

  const signUp = async (userData) => {
    try {
      // Format the date to match LocalDate format (YYYY-MM-DD)
      const formattedData = {
        ...userData,
        dateOfBirth: userData.dateOfBirth.split('T')[0] // Remove any time component
      };
      
      console.log('Sending signup data:', formattedData); // Log the data being sent
      const response = await axios.post('http://localhost:8080/api/auth/signup', formattedData);
      toast.success('Successfully signed up! Please sign in.');
      return true;
    } catch (error) {
      console.error('Signup error details:', {
        status: error.response?.status,
        data: error.response?.data,
        validationErrors: error.response?.data?.errors,
        fullError: error
      });
      
      // Handle validation errors specifically
      if (error.response?.data?.errors) {
        const validationMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        toast.error(`Validation failed: ${validationMessages}`);
      } else {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           'Failed to sign up';
        toast.error(errorMessage);
      }
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Successfully signed out!');
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 