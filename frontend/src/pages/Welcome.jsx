import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiSmartphone, FiCreditCard, FiPieChart, FiArrowRight, FiCheck, FiArrowDown, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Welcome = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const features = [
    {
      icon: FiShield,
      title: 'Secure Banking',
      description: 'Bank with confidence using our state-of-the-art security measures'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Banking',
      description: 'Access your accounts anytime, anywhere with our mobile banking'
    },
    {
      icon: FiCreditCard,
      title: 'Smart Cards',
      description: 'Manage your cards and make secure payments worldwide'
    },
    {
      icon: FiPieChart,
      title: 'Financial Insights',
      description: 'Get detailed analytics and insights about your spending'
    }
  ];

  const benefits = [
    'No minimum balance requirements',
    'Zero maintenance fees',
    '24/7 customer support',
    'Free online & mobile banking',
    'Nationwide ATM network',
    'Competitive interest rates'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'} overflow-hidden transition-colors duration-300`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm sticky top-0 z-50 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className={`text-2xl font-bold ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} flex items-center transition-colors duration-300`}>
                <FiCreditCard className="h-8 w-8 mr-2" />
                BankPortal
              </Link>
            </motion.div>
            <div className="flex space-x-4 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-all duration-300`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signin"
                  className={`inline-flex items-center px-4 py-2 border-2 ${
                    isDarkMode
                      ? 'border-primary-400 text-primary-400 hover:bg-gray-700'
                      : 'border-primary-600 text-primary-600 hover:bg-primary-50'
                  } text-sm font-medium rounded-md bg-transparent transition-colors duration-300`}
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    isDarkMode ? 'bg-primary-500 hover:bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
                  } transition-colors duration-300`}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDarkMode ? 'bg-primary-900' : 'bg-primary-100'} rounded-full opacity-50 blur-3xl transition-colors duration-300`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDarkMode ? 'bg-primary-800' : 'bg-primary-200'} rounded-full opacity-50 blur-3xl transition-colors duration-300`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-4xl tracking-tight font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl transition-colors duration-300`}>
              <span className="block">Modern Banking for a</span>
              <span className={`block ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} transition-colors duration-300`}>Better Future</span>
            </h1>
            <p className={`mt-3 max-w-md mx-auto text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} sm:text-lg md:mt-5 md:text-xl md:max-w-3xl transition-colors duration-300`}>
              Experience the next generation of banking with our cutting-edge digital platform.
              Secure, simple, and designed for you.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Open an Account
                <FiArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowDown className="h-6 w-6 text-primary-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Banking Made Simple
            </h2>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors duration-300`}>
              Everything you need to manage your money, all in one place
            </p>
          </motion.div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                      isDarkMode ? 'from-primary-500 to-primary-300' : 'from-primary-600 to-primary-400'
                    } rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
                    <div className={`relative p-6 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-sm hover:shadow-xl transition-all duration-300`}>
                      <div className={`p-3 rounded-full ${
                        isDarkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-primary-50 group-hover:bg-primary-100'
                      } inline-block transition-colors`}>
                        <Icon className={`h-6 w-6 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                      </div>
                      <h3 className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                      <p className={`mt-2 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Why Choose Us?
            </h2>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors duration-300`}>
              Enjoy premium banking benefits without premium fees
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-start ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex-shrink-0">
                    <div className={`p-2 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-primary-100'
                    } rounded-full transition-colors duration-300`}>
                      <FiCheck className={`h-5 w-5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                  </div>
                  <p className={`ml-3 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`${isDarkMode ? 'bg-primary-900' : 'bg-primary-600'} relative overflow-hidden transition-colors duration-300`}
      >
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${
            isDarkMode 
              ? 'from-primary-800 to-primary-900 opacity-90' 
              : 'from-primary-500 to-primary-700 opacity-90'
          } transition-colors duration-300`}></div>
          <div className={`absolute -top-40 -right-40 w-80 h-80 ${
            isDarkMode ? 'bg-primary-700' : 'bg-primary-400'
          } rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${
            isDarkMode ? 'bg-primary-950' : 'bg-primary-800'
          } rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-primary-200">Join thousands of satisfied customers.</span>
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Open an account in minutes and experience modern banking at its finest.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signin"
                className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 transition-all duration-200"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6 md:order-2"
            >
              <motion.p
                whileHover={{ scale: 1.05 }}
                className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
              >
                © 2024 BankPortal. All rights reserved.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome; 