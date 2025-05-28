import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiDollarSign, FiCreditCard, FiList, FiUser, FiLogOut, FiSearch } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useSearch } from '../contexts/SearchContext';
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  const { searchQuery, searchResults, handleSearch } = useSearch();
  const { isDarkMode } = useTheme();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/accounts', icon: FiCreditCard, label: 'Accounts' },
    { path: '/transactions', icon: FiList, label: 'Transactions' },
    { path: '/loans', icon: FiDollarSign, label: 'Loans' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}>
              Bank Portal
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <svg
                className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen ? 'M11 19l-7-7 7-7m8 14l-7-7 7-7' : 'M13 5l7 7-7 7M5 5l7 7-7 7'}
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? isDarkMode 
                            ? 'bg-primary-900/50 text-primary-400'
                            : 'bg-primary-50 text-primary-600'
                          : isDarkMode
                            ? 'text-gray-400 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      {isSidebarOpen && (
                        <span className="ml-3 font-medium">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={signOut}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiLogOut className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3 font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Search Bar */}
        <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-1 flex items-center">
                <div className="w-full max-w-2xl">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        handleSearch(e.target.value);
                        setShowSearchResults(!!e.target.value);
                      }}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500'
                          : 'bg-white border-gray-300 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500'
                      } focus:outline-none focus:placeholder-gray-400 sm:text-sm transition-colors duration-300`}
                      placeholder="Search accounts, transactions, or loans..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery && (
            <div className={`absolute mt-1 w-full max-w-2xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg rounded-md py-1 z-10 transition-colors duration-300`}>
              {Object.entries(searchResults).map(([category, results]) => (
                results.length > 0 && (
                  <div key={`category-${category}`} className="px-4 py-2">
                    <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {category}
                    </h3>
                    <div className="mt-2 space-y-1">
                      {results.slice(0, 3).map((result) => {
                        const resultId = result.id || result.accountId || result.loanId || result.transactionId;
                        return (
                          <Link
                            key={`${category}-${resultId}`}
                            to={`/${category}/${resultId}`}
                            className={`block px-4 py-2 text-sm rounded-md ${
                              isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setShowSearchResults(false)}
                          >
                            {category === 'accounts' ? `${result.accountType} Account #${result.accountId}` :
                             category === 'transactions' ? `${result.transactionType} - $${result.amount}` :
                             `Loan #${result.loanId} - ${result.purpose}`}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              ))}
              {Object.values(searchResults).every(results => results.length === 0) && (
                <div className={`px-4 py-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 