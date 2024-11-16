import { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to fetch user data
const GET_USER_PROFILE = gql`
  query GetUserProfile($id: Float!) {
    user(id: $id) {
      firstName
      familyName
    }
  }
`;

const Employees = ({ activeTab, setActiveTab, userId }) => {
  // State to store the photo URL
  const [photo, setPhoto] = useState('https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'); // Default photo

  // Function to handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the photo state with the uploaded image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Fetch user data from the GraphQL API
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId },
  });

  // Render loading state or error state
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extract the user's first and family name from the fetched data
  const firstName = data?.user?.firstName || 'John';
  const familyName = data?.user?.familyName || 'Smith';

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-4">Employee Management</h2>

      {/* Photo, Name, and Position */}
      <div className="flex flex-col items-center mb-6">
        {/* Avatar with Camera Icon */}
        <div className="relative mb-4">
          <Avatar
            alt={`${firstName} ${familyName}`} // Dynamically use the first and last name
            src={photo} // Dynamically set the photo URL
            sx={{ width: 80, height: 80, borderRadius: '50%' }} // Ensure it's circular
          />
          <IconButton
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md"
            style={{ padding: '10px' }}
            aria-label="upload picture"
            component="label"
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload} // Trigger the photo upload handler
            />
            <CameraAlt sx={{ color: '#007BFF' }} />
          </IconButton>
        </div>

        {/* Name and Position */}
        <div className="text-center">
          <h3 className="text-xl font-semibold">{`${firstName} ${familyName}`}</h3>
          <p className="text-sm text-gray-500">Senior Product Manager</p>
        </div>
      </div>

      {/* Tabs - Vertical layout */}
      <div className="flex flex-col space-y-4">
        <button
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg focus:outline-none ${
            activeTab === 'personal' 
              ? 'text-blue-500'  // Active tab: blue background & font
              : 'bg-gray-100 text-gray-600'  // Non-active tab: gray background & font
          } hover:bg-[#F4F8FE] hover:text-[#007BFF]`} // Hover effect on all tabs
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg focus:outline-none ${
            activeTab === 'financial' 
              ? 'text-blue-500'  // Active tab: blue background & font
              : ' text-gray-600'  // Non-active tab: gray background & font
          } hover:bg-[#F4F8FE] hover:text-[#007BFF]`} // Hover effect on all tabs
          onClick={() => setActiveTab('financial')}
        >
          Financial Information
        </button>
      </div>
    </div>
  );
};

export default Employees;
