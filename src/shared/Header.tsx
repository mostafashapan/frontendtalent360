import React from 'react';
import { NotificationsNone, Settings, Email } from '@mui/icons-material';
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

interface HeaderProps {
  userId: number;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  // Fetch user data from the GraphQL API
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId },
  });

  // Render loading state or error state
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Fallback to default name if data is not available
  const firstName = data?.user?.firstName || 'John';
  const familyName = data?.user?.familyName || 'Smith';

  return (
    <div className="w-full h-[10vh] sticky top-0 z-50" style={{ backgroundColor: '#ECEEF1' }}>
      <div className="flex justify-between items-center px-4 h-full">
        {/* Left side */}
        <div className="w-full sm:w-[70%] lg:w-[60%] flex flex-col justify-center">
          {/* Profile name above breadcrumb */}
          <div className="text-3xl font-bold text-black mb-2">
            {firstName} {familyName} Profile
          </div>

          {/* Breadcrumb navigation */}
          <div className="text-sm text-black-100">
            <span className="font-bold text-gray-500">Dashboard</span>
            <span className="font-bold text-[#459AFF]"> &gt; </span>
            <span className="font-bold text-gray-500">HR Manage</span>
            <span className="font-bold text-[#459AFF]"> &gt; </span>
            <span className="font-bold text-gray-500">Employees</span>
            <span className="font-semibold text-[#459AFF]"> &gt; </span>
            <span className="font-semibold text-[#459AFF]">{firstName} {familyName} Profile</span>
          </div>
        </div>

        {/* Right side (icons and profile image) */}
        <div className="flex items-center space-x-4 z-50">
          <div className="relative">
            <NotificationsNone className="text-dodgerblue" />
            {/* Red dot on bell icon */}
            <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-2 h-2 text-xs flex items-center justify-center -mt-2 -mr-2" />
          </div>

          <div className="relative">
            <Email className="text-dodgerblue" />
          </div>

          <div className="relative">
            <Settings className="text-dodgerblue" />
          </div>

          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            className="w-10 h-10 rounded-full mb-4 sm:mb-0"
            alt="admin"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
