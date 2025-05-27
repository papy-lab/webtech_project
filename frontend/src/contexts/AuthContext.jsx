import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simplified sign in that bypasses backend validation
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      // Simply authenticate without backend check
      setIsAuthenticated(true);
      toast.success('Successfully signed in');
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 