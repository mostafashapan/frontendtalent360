import { Outlet } from 'react-router-dom'; // Outlet to render nested routes
import SideBar from './shared/SideBar';  // Sidebar
import Header from './shared/Header';  // Header

const App = () => {
  return (
    <div className="flex h-screen bg-[#ECEEF1] overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-1 flex flex-col relative overflow-auto">
        {/* Header */}
        <Header userId={1} /> {/* Dynamic userId can be passed here if needed */}

        {/* Main Content Area - This is where nested routes will render */}
        <Outlet />  {/* This renders the page based on the active route */}
      </div>
    </div>
  );
};

export default App;
