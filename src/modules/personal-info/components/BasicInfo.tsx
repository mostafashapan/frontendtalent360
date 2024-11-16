import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL query to fetch user data
const GET_USER = gql`
  query getUser($id: Float!) {
    user(id: $id) {
      id
      firstName
      fatherName
      grandfatherName
      familyName
      localizedFirstName
      localizedFatherName
      localizedGrandfatherName
      localizedFamilyName
      nationalIdNumber
      nationalIdExpiryDate
      title
      nationalities
      maritalStatusId
      maritalStatusName
      dependants
      passportNumber
      passportIssueDate
      passportExpiryDate
    }
  }
`;

// GraphQL mutation to update user data
const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      firstName
      fatherName
      grandfatherName
      familyName
      localizedFirstName
      localizedFatherName
      localizedGrandfatherName
      localizedFamilyName
      title
      nationalIdNumber
      nationalIdExpiryDate
      nationalities
      maritalStatusId
      maritalStatusName
      dependants
      passportNumber
      passportIssueDate
      passportExpiryDate
    }
  }
`;

interface User {
  id: number;
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  familyName: string;
  localizedFirstName: string;
  localizedFatherName: string;
  localizedGrandfatherName: string;
  localizedFamilyName: string;
  nationalIdNumber: string;
  nationalIdExpiryDate: string;
  title: string;
  nationalities: string[];
  maritalStatusId: number;
  maritalStatusName: string;
  dependants: number;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
}

interface UpdateUserInput {
  id: number;
  firstName: string;
  fatherName: string;
  grandfatherName: string;
  familyName: string;
  localizedFirstName: string;
  localizedFatherName: string;
  localizedGrandfatherName: string;
  localizedFamilyName: string;
  nationalIdNumber: string;
  nationalIdExpiryDate: string;
  title: string;
  nationalities: string[];
  maritalStatusId: number;
  maritalStatusName: string;
  dependants: number;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
}

interface BasicInfoProps {
  userId: number;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<UpdateUserInput | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize form values with current user data when editing starts
    if (data?.user) {
      setFormValues({ ...data.user });
    }
  };

  const handleSaveChanges = async () => {
    if (formValues) {
      // Remove the __typename field from the form values
      const { __typename, ...updateUserInput } = formValues;

      try {
        // Call the updateUser mutation with the cleaned-up input
        const response = await updateUser({
          variables: { updateUserInput },
        });
        console.log('User updated successfully:', response.data.updateUser);
        setIsEditing(false); // Turn off edit mode after saving
      } catch (err) {
        console.error('Error updating user:', err);
      }
    }
  };

  const handleInputChange = (field: keyof UpdateUserInput, value: string) => {
    if (formValues) {
      setFormValues((prevValues) => {
        if (field === 'nationalities') {
          return { ...prevValues, [field]: value.split(',').map(item => item.trim()) };
        }
        if (field === 'dependants') {
          return { ...prevValues, [field]: parseInt(value, 10) };
        }
        return { ...prevValues, [field]: value };
      });
    }
  };

  // Loading and Error handling for the user query
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Handle mutation loading or error
  if (mutationLoading) return <div>Saving changes...</div>;
  if (mutationError) return <div>Error saving changes: {mutationError.message}</div>;

  const userData = data?.user;
  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="p-6 mb-6 border rounded-lg shadow-xl bg-white">
      <div className="relative mb-6">
        <button
          className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-black">Basic Information</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 text-black">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {['firstName', 'fatherName', 'grandfatherName', 'familyName', 'nationalIdNumber', 'nationalIdExpiryDate', 'nationalities', 'maritalStatusName', 'dependants', 'passportNumber', 'passportIssueDate', 'passportExpiryDate'].map((field) => (
              <div key={field} className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={field === 'nationalIdExpiryDate' || field === 'passportIssueDate' || field === 'passportExpiryDate' ? 'date' : field === 'dependants' ? 'number' : 'text'}
                  value={formValues?.[field as keyof UpdateUserInput] || ''}
                  onChange={(e) => handleInputChange(field as keyof UpdateUserInput, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              onClick={handleSaveChanges}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-1">
                <label className="font-semibold text-gray-700">National ID Number</label>
                <p>{userData.nationalIdNumber}</p>
              </div>
              <div className="flex flex-col space-x-2 r-5">
                <label className="font-semibold text-gray-700 ">National ID Expiry Date</label>
                <p>{userData.nationalIdExpiryDate || 'Not available'}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Title</label>
                <p>{userData.title}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">First Name</label>
                <p>{userData.firstName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Father's Name</label>
                <p>{userData.fatherName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Grandfather's Name</label>
                <p>{userData.grandfatherName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Family Name</label>
                <p>{userData.familyName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">الأسم الأول</label>
                <p>{userData.localizedFirstName}</p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">اسم الأب</label>
                <p>{userData.localizedFatherName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">اسم الجد</label>
                <p>{userData.localizedGrandfatherName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">اللقب / اسم العائلة</label>
                <p>{userData.localizedFamilyName}</p>
              </div>

             

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Nationalities</label>
                <p>{userData.nationalities?.length ? userData.nationalities.join(', ') : 'Not provided'}</p>
              </div>

             

              {/* New Fields Added Below */}
              
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Passport Number</label>
                <p>{userData.passportNumber}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Passport Issue Date</label>
                <p>{userData.passportIssueDate || 'Not provided'}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Passport Expiry Date</label>
                <p>{userData.passportExpiryDate || 'Not provided'}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Marital Status</label>
                <p>{userData.maritalStatusName}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-gray-700">Dependants</label>
                <p>{userData.dependants !== undefined ? userData.dependants : 'Not provided'}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
