import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import { useTheme } from '../contexts/ThemeContext';

const Loans = () => {
  const { isDarkMode } = useTheme();
  // Mock data
  const [loans, setLoans] = useState([
    { loanId: 1, amount: 50000, interestRate: 5.5, status: 'APPROVED', purpose: 'Home Renovation', branchId: 1 },
    { loanId: 2, amount: 25000, interestRate: 6.0, status: 'PENDING', purpose: 'Business Expansion', branchId: 2 },
    { loanId: 3, amount: 10000, interestRate: 7.5, status: 'APPROVED', purpose: 'Education', branchId: 1 }
  ]);

  const branches = [
    { branchId: 1, name: 'Main Branch' },
    { branchId: 2, name: 'Downtown Branch' },
    { branchId: 3, name: 'West Side Branch' }
  ];

  const [showNewLoanModal, setShowNewLoanModal] = useState(false);
  const [newLoan, setNewLoan] = useState({
    amount: '',
    branchId: '',
    purpose: ''
  });

  const handleApplyLoan = (e) => {
    e.preventDefault();
    const loanId = loans.length + 1;
    const newLoanData = {
      loanId,
      amount: parseFloat(newLoan.amount),
      interestRate: 5 + Math.random() * 5, // Random interest rate between 5% and 10%
      status: 'PENDING',
      purpose: newLoan.purpose,
      branchId: parseInt(newLoan.branchId)
    };
    
    setLoans([...loans, newLoanData]);
    setShowNewLoanModal(false);
    setNewLoan({ amount: '', branchId: '', purpose: '' });
    toast.success('Loan application submitted successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Loans</h1>
          <button
            onClick={() => setShowNewLoanModal(true)}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isDarkMode
                ? 'bg-primary-500 hover:bg-primary-400'
                : 'bg-primary-600 hover:bg-primary-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
          >
            <FiPlus className="mr-2 -ml-1 h-5 w-5" />
            Apply for Loan
          </button>
        </div>

        {/* Active Loans */}
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm overflow-hidden transition-colors duration-300`}>
          <div className={`px-6 py-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Active Loans</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Loan ID
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Amount
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Interest Rate
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Branch
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  } uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {loans.map((loan) => (
                  <tr key={loan.loanId} className={
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      #{loan.loanId}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      ${loan.amount.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {loan.interestRate.toFixed(1)}%
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {branches.find(b => b.branchId === loan.branchId)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        loan.status === 'APPROVED'
                          ? isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : loan.status === 'PENDING'
                            ? isDarkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                            : isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {loans.length === 0 && (
                  <tr>
                    <td colSpan="5" className={`px-6 py-4 text-center text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No active loans found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Loan Modal */}
        {showNewLoanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg max-w-md w-full p-6 transition-colors duration-300`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Apply for Loan</h2>
              <form onSubmit={handleApplyLoan} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newLoan.amount}
                    onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'border-gray-300 text-gray-900'
                    } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                    placeholder="Enter loan amount"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Branch
                  </label>
                  <select
                    value={newLoan.branchId}
                    onChange={(e) => setNewLoan({ ...newLoan, branchId: e.target.value })}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'border-gray-300 text-gray-900'
                    } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch.branchId} value={branch.branchId}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Purpose
                  </label>
                  <textarea
                    value={newLoan.purpose}
                    onChange={(e) => setNewLoan({ ...newLoan, purpose: e.target.value })}
                    rows={3}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'border-gray-300 text-gray-900'
                    } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                    placeholder="Describe the purpose of the loan"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewLoanModal(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-300`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
                      isDarkMode
                        ? 'bg-primary-500 hover:bg-primary-400'
                        : 'bg-primary-600 hover:bg-primary-700'
                    } transition-colors duration-300`}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Loans; 