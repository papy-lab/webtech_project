import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await signUp(formData);
    if (success) {
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  const inputFields = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: FiUser
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: FiMail
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      icon: FiLock
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      icon: FiPhone
    }
  ];

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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center relative"
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
            Create Your Account
          </h2>
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Join us and experience modern banking
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${
            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-sm shadow-xl rounded-lg p-8 transition-colors duration-300`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {inputFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.id}>
                  <label htmlFor={field.id} className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {field.label}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon className={`h-5 w-5 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.id}
                      required
                      value={formData[field.id]}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md text-sm ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-300`}
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              );
            })}

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
                {isLoading ? 'Creating account...' : 'Sign up'}
              </motion.button>
            </div>

            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Already have an account?{' '}
                <Link to="/signin" className={`font-medium ${
                  isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'
                }`}>
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp; 