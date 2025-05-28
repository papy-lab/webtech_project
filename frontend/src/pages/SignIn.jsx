import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await signIn(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900'
        : 'bg-gradient-to-br from-gray-50 via-white to-primary-50'
    } py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300`}>
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${
          isDarkMode ? 'bg-primary-800' : 'bg-primary-100'
        } rounded-full opacity-50 blur-3xl transition-colors duration-300`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${
          isDarkMode ? 'bg-primary-900' : 'bg-primary-200'
        } rounded-full opacity-50 blur-3xl transition-colors duration-300`}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/"
            className={`inline-flex items-center text-sm font-medium ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'
            } transition-colors duration-300`}
          >
            <FiHome className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <h2 className={`mt-6 text-3xl font-extrabold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Or{' '}
            <Link to="/signup" className={`font-medium ${
              isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'
            }`}>
              create a new account
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${
            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-sm shadow-xl rounded-lg p-8 transition-colors duration-300`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md text-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isDarkMode
                    ? 'bg-primary-500 hover:bg-primary-400'
                    : 'bg-primary-600 hover:bg-primary-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform transition-all duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <motion.span
                    animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                  >
                    <FiArrowRight className={`h-5 w-5 ${
                      isDarkMode ? 'text-primary-300' : 'text-primary-500'
                    } group-hover:text-primary-400`} />
                  </motion.span>
                </span>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn; 