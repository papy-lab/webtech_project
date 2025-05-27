import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Loans from './pages/Loans';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Initialize mock data globally
window.mockAccounts = [
  { accountId: 1, accountType: 'SAVINGS', balance: 15000.00, createdAt: '2024-01-15' },
  { accountId: 2, accountType: 'CHECKING', balance: 8500.00, createdAt: '2024-02-01' },
  { accountId: 3, accountType: 'SAVINGS', balance: 1500.00, createdAt: '2024-03-01' }
];

window.mockTransactions = [
  { transactionId: 1, date: '2024-03-10', transactionType: 'DEPOSIT', amount: 1000, accountId: 1, status: 'Completed' },
  { transactionId: 2, date: '2024-03-09', transactionType: 'WITHDRAWAL', amount: 500, accountId: 2, status: 'Completed' },
  { transactionId: 3, date: '2024-03-08', transactionType: 'TRANSFER', amount: 750, accountId: 1, status: 'Completed' }
];

window.mockLoans = [
  { loanId: 1, amount: 50000, interestRate: 5.5, status: 'APPROVED', purpose: 'Home Renovation', branchId: 1 },
  { loanId: 2, amount: 25000, interestRate: 6.0, status: 'PENDING', purpose: 'Business Expansion', branchId: 2 },
  { loanId: 3, amount: 10000, interestRate: 7.5, status: 'APPROVED', purpose: 'Education', branchId: 1 }
];

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <PrivateRoute>
                  <Accounts />
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <PrivateRoute>
                  <Loans />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
