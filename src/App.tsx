import { useState } from 'react';
import Employees from './pages/Employees';
import Header from './shared/Header';
import SideBar from './shared/SideBar'; // Main sidebar
import BasicInfo from './modules/personal-info/components/BasicInfo';
import ContactInfo from './modules/personal-info/components/ContactInfo';
import DrivingLicense from './modules/personal-info/components/DrivingLicense';
import BankInfo from './modules/financial-info/components/BankInfo'; // Assuming this is the content for the 'financial' tab
import EmergencyInfo from './modules/personal-info/components/EmergencyInfo';
import MilitaryStatus from './modules/personal-info/components/MilitaryStatus';
import AddressDetails from './modules/personal-info/components/AddressDetails';

type Tab = 'personal' | 'financial'; // Explicit tab types to avoid magic strings

const App = () => {
  // Manage the activeTab state in the App component
  const [activeTab, setActiveTab] = useState<Tab>('personal'); // Default to 'personal'
  const [userId, setUserId] = useState<number>(1); // Default to user ID 1

  // Handle employee selection change
  const handleEmployeeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value)); // Update userId with selected value
  };

  return (
    <div className="flex h-screen bg-[#ECEEF1] overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-1 flex flex-col relative overflow-auto">
        {/* Header */}
        <Header userId={userId} />

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Sidebar on large screens, hidden on small screens */}
          <div className="lg:w-1/4 lg:block hidden p-4 bg-[#ECEEF1] border-l shadow-md rounded-lg">
            <div className="bg-white p-4 shadow-md rounded-lg">
              {/* Pass activeTab and setActiveTab to Employees component */}
              <Employees userId={userId} activeTab={activeTab} setActiveTab={setActiveTab} />
              
              {/* Employee Selection Dropdown */}
              <div className="mt-4">
                <label htmlFor="employee-select" className="block text-sm font-semibold mb-2">
                  Select Employee:
                </label>
                <select
                  id="employee-select"
                  value={userId}
                  onChange={handleEmployeeSelect}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm"
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      Employee {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="content-area flex-1 p-4 bg-[#ECEEF1] overflow-auto">
            {/* Conditionally render content based on activeTab */}
            {activeTab === 'personal' ? (
              <>
                <BasicInfo userId={userId} />
                <ContactInfo />
                <EmergencyInfo />
                <AddressDetails />
                <DrivingLicense />
                <MilitaryStatus />
              </>
            ) : (
              <BankInfo />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
