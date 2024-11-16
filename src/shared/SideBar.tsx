import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';  // Import PieChartOutlineRoundedIcon
import { useState } from 'react';  // Import useState from React
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  // Material UI Menu icon
import DescriptionIcon from '@mui/icons-material/Description';  // Material UI Document Icon
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AppsIcon from '@mui/icons-material/Apps';  // Material UI Grid (Four Squares) Icon
import PeopleIcon from '@mui/icons-material/People';  // Material UI People Icon (Two Friends)
import logo from '../assets/images/logo.png';  // Your logo image

export default function SideBar() {
  const [open, setOpen] = useState(true);  // State to manage sidebar open/close
  const [showIconsOnly, setShowIconsOnly] = useState(false);  // State to control icon-only mode

  // Toggle sidebar open/close
  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  // Toggle between showing only icons or both icons and text
  const handleToggleIconsOnly = () => {
    setShowIconsOnly(!showIconsOnly);
  };

  return (
    <div>
      {/* Hamburger menu button to toggle sidebar */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleToggleSidebar}
        sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }} // Ensure menu button is visible
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for sidebar */}
      <Drawer
        sx={{
          width: showIconsOnly ? '4rem' : '15rem',  // Width changes based on showIconsOnly state
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: showIconsOnly ? '4rem' : '15rem',  // Same for the drawer paper (actual sidebar)
            backgroundColor: '#FFFFFF',  // Set background color to white
            color: 'black',  // Set text color to black for visibility
            boxSizing: 'border-box',
            transition: 'width 0.3s',  // Smooth transition for the width change
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* Logo to toggle sidebar between icon-only and full mode */}
        <div
          className="p-4 text-center cursor-pointer"
          onClick={handleToggleIconsOnly} // Toggle between icons and full sidebar when logo is clicked
        >
          <img src={logo} alt="Logo" className="w-10 h-auto" />
        </div>
        <Divider className="border-gray-700" />

        {/* Sidebar Menu */}
        <List>
          {/* Apps Menu Item */}
          <ListItem component={Link} to="/" className="hover:bg-[#003FAD]">
            <ListItemIcon className="text-black">
              <AppsIcon />
            </ListItemIcon>
            {/* Conditionally render the text label only when not in icon-only mode */}
            {!showIconsOnly && <ListItemText primary="Apps" />}
          </ListItem>

          {/* Cube Menu Item (Replaced with PieChartOutlineRoundedIcon) */}
          <ListItem component={Link} to="/cube" className="hover:bg-[#003FAD]">
            <ListItemIcon className="text-black">
              <PieChartOutlineRoundedIcon /> {/* Replaced with PieChartOutlineRoundedIcon */}
            </ListItemIcon>
            {!showIconsOnly && <ListItemText primary="Cube" />}
          </ListItem>

          {/* Document Menu Item */}
          <ListItem component={Link} to="/document" className="hover:bg-[#003FAD]">
            <ListItemIcon className="text-black">
              <DescriptionIcon />
            </ListItemIcon>
            {!showIconsOnly && <ListItemText primary="Document" />}
          </ListItem>

          {/* About Menu Item */}
          <ListItem component={Link} to="/about" className="hover:bg-[#003FAD]">
            <ListItemIcon className="text-black">
              <PeopleIcon />
            </ListItemIcon>
            {!showIconsOnly && <ListItemText primary="About" />}
          </ListItem>

          {/* Calendar Menu Item */}
          <ListItem component={Link} to="/calendar" className="hover:bg-[#003FAD]">
            <ListItemIcon className="text-black">
              <ViewInArIcon />
            </ListItemIcon>
            {!showIconsOnly && <ListItemText primary="Calendar" />}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
