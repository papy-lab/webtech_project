import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isDarkMode } = useTheme();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t sm:px-6 transition-colors duration-300`}>
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
            isDarkMode
              ? 'text-gray-300 bg-gray-800 border-gray-600 hover:bg-gray-700'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          } border rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium ${
            isDarkMode
              ? 'text-gray-300 bg-gray-800 border-gray-600 hover:bg-gray-700'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          } border rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                isDarkMode
                  ? 'text-gray-400 bg-gray-800 border-gray-600 hover:bg-gray-700'
                  : 'text-gray-400 bg-white border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  currentPage === page
                    ? isDarkMode
                      ? 'z-10 bg-primary-900 border-primary-500 text-primary-400'
                      : 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } transition-colors duration-300`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                isDarkMode
                  ? 'text-gray-400 bg-gray-800 border-gray-600 hover:bg-gray-700'
                  : 'text-gray-400 bg-white border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination; 