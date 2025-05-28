import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    joinDate: ''
  });

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data with the logged-in user's email
    const mockUserData = {
      firstName: user?.email?.split('@')[0] || 'John',
      lastName: 'Doe',
      email: user?.email || 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      joinDate: '2024-01-01'
    };
    setProfile(mockUserData);
    setLoading(false);
  }, [user]);

  const handleSave = async () => {
    try {
      // In a real app, this would be an API call to update the profile
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Update the profile in state
      setProfile(currentProfile => ({
        ...currentProfile,
        // Ensure email matches the logged-in user's email
        email: user?.email || currentProfile.email
      }));
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
            isDarkMode ? 'border-primary-400' : 'border-primary-600'
          }`}></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow rounded-lg transition-colors duration-300`}>
          {/* Profile Header */}
          <div className={`px-6 py-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } flex justify-between items-center`}>
            <h2 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>Profile Information</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isDarkMode
                  ? 'bg-primary-500 hover:bg-primary-400'
                  : 'bg-primary-600 hover:bg-primary-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
            >
              {isEditing ? (
                <>
                  <FiSave className="mr-2 -ml-1 h-5 w-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <FiEdit2 className="mr-2 -ml-1 h-5 w-5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled={true} // Email should always be disabled as it's tied to authentication
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-600 text-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-500'
                  } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                />
                <p className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Email cannot be changed as it's used for authentication.</p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  } focus:border-primary-500 focus:ring-primary-500 transition-colors duration-300`}
                />
              </div>
            </div>

            <div className={`pt-6 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Member since {new Date(profile.joinDate).toLocaleDateString()}
              </p>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                    isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md ${
                    isDarkMode
                      ? 'bg-primary-500 hover:bg-primary-400'
                      : 'bg-primary-600 hover:bg-primary-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300`}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 