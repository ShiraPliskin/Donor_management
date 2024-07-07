// import React, { useState, useEffect } from "react";
// import { useNavigate, Outlet, NavLink, useParams, Link as RouterLink } from "react-router-dom";
// import { AppBar, Toolbar, Button, Container, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
// import { config } from "./config.jsx";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import LockPersonIcon from '@mui/icons-material/LockPerson';
// import RedeemIcon from '@mui/icons-material/Redeem';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
// import GroupIcon from '@mui/icons-material/Group';
// import Person4Icon from '@mui/icons-material/Person4';
// import logo from '../images/icon.jpg'; 

// const Layout = () => {
//   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeButton, setActiveButton] = useState(null);
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   useEffect(() => {
//     const path = window.location.pathname;
//     const segments = path.split('/').filter(segment => segment.trim() !== ''); 
//     const lastSegment = segments[segments.length - 1];
//     setActiveButton(lastSegment);
//   }, [])

//   useEffect(() => {
//     if (currentUser === null || currentUser.id !== Number(userId)) {
//       navigate("/login");
//     }
//   }, [currentUser]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//     setCurrentUser(null);
//   };

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

//   return (
//     <>
//       {currentUser && (
//         <Container>
//           <AppBar position="fixed">
//             <Toolbar>
//               <Box
//                 onMouseEnter={handleMenuOpen}
//                 onMouseLeave={handleMenuClose}
//               >
//                 <Button
//                   color="inherit"
//                   variant="outlined"
//                   sx={{
//                     backgroundColor: activeButton === "userProfile" ? "#ffffff" : "transparent",
//                     color:"black",
//                     "&:hover": {
//                       backgroundColor: activeButton === "userProfile" ? "#ffffff" : "#73b6f9",
//                     },
//                     height: "40px",
//                     marginLeft: "20px",
//                     width: '100px'
//                   }}
//                   startIcon={<AccountCircleIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//                 >
//                   {currentUser && currentUser.name}
//                 </Button>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                 >
//                   <MenuItem component={RouterLink} to={`users/${currentUser.id}/userProfile`} onClick={() => handleButtonClick("userProfile")}
//                   >
//                      <ListItemIcon>
//                        <LockPersonIcon fontSize="small" /> 
//                      </ListItemIcon>
//                     פרטים אישיים
//                   </MenuItem>
//                   <MenuItem onClick={handleLogout} >
//                      <ListItemIcon>
//                        <ExitToAppIcon fontSize="small" /> 
//                      </ListItemIcon>
//                     התנתקות
//                   </MenuItem>
//                 </Menu>
//               </Box>
//               <Button
//                 color="inherit"
//                 component={NavLink}
//                 to={`users/${currentUser.id}/home`}
//                 onClick={() => handleButtonClick("home")}
//                 sx={{
//                   backgroundColor: activeButton === "home" ? "#ffffff" : "transparent",
//                   color:"black",
//                   "&:hover": {
//                     backgroundColor: activeButton === "home" ? "#ffffff" : "#73b6f9",
//                   },
//                   padding: "1.5rem",
//                   height: "70px",
//                   width: '140px'
//                 }}
//               >
//                 דף הבית
//               </Button>
//               {currentUser.permission === config.HIGH_PERMISSION && (
//                 <Button
//                   color="inherit"
//                   component={NavLink}
//                   to={`users/${currentUser.id}/userManagement`}
//                   onClick={() => handleButtonClick("userManagement")}
//                   sx={{
//                     backgroundColor: activeButton === "userManagement" ? "#ffffff" : "transparent",
//                     color:"black",
//                     "&:hover": {
//                       backgroundColor: activeButton === "userManagement" ? "#ffffff" : "#73b6f9",
//                     },
//                     padding: "1.5rem",
//                     height: "70px",
//                     width: '140px'
//                   }}
//                   startIcon={<GroupIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//                 >
//                   ניהול משתמשים
//                 </Button>
//               )}
//               <Button
//                 color="inherit"
//                 component={NavLink}
//                 to={`users/${currentUser.id}/donors`}
//                 onClick={() => handleButtonClick("donors")}
//                 sx={{
//                   backgroundColor: activeButton === "donors" ? "#ffffff" : "transparent",
//                   color:"black",
//                   "&:hover": {
//                     backgroundColor: activeButton === "donors" ? "#ffffff" : "#73b6f9",
//                   },
//                   padding: "1.5rem",
//                   height: "70px",
//                   width: '140px'
//                 }}
//                 startIcon={<Person4Icon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//               >
//                 תורמים
//               </Button>
//               <Button
//                 color="inherit"
//                 component={NavLink}
//                 to={`users/${currentUser.id}/donations`}
//                 onClick={() => handleButtonClick("donations")}
//                 sx={{
//                   backgroundColor: activeButton === "donations" ? "#ffffff" : "transparent",
//                   color:"black",
//                   "&:hover": {
//                     backgroundColor: activeButton === "donations" ? "#ffffff" : "#73b6f9",
//                   },
//                   padding: "1.5rem",
//                   height: "70px",
//                   width: '140px'
//                 }}
//                 startIcon={<AttachMoneyIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//               >
//                 תרומות
//               </Button>
//               <Button
//                 color="inherit"
//                 component={NavLink}
//                 to={`users/${currentUser.id}/contacts`}
//                 onClick={() => handleButtonClick("contacts")}
//                 sx={{
//                   backgroundColor: activeButton === "contacts" ? "#ffffff" : "transparent",
//                   color:"black",
//                   "&:hover": {
//                     backgroundColor: activeButton === "contacts" ? "#ffffff" : "#73b6f9",
//                   },
//                   padding: "1.5rem",
//                   height: "70px",
//                   width: '140px'
//                 }}
//                 startIcon={<PermContactCalendarIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//               >
//                 אנשי קשר
//               </Button>
//               <Button
//                 color="inherit"
//                 component={NavLink}
//                 to={`users/${currentUser.id}/gifts`}
//                 onClick={() => handleButtonClick("gifts")}
//                 sx={{
//                   backgroundColor: activeButton === "gifts" ? "#ffffff" : "transparent",
//                   color:"black",
//                   "&:hover": {
//                     backgroundColor: activeButton === "gifts" ? "#ffffff" : "#73b6f9",
//                   },
//                   padding: "1.5rem",
//                   height: "70px",
//                   width: '140px'
//                 }}
//                 startIcon={<RedeemIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
//               >
//                 מתנות
//               </Button>
//               <Box component={RouterLink} to={`users/${currentUser.id}/home`} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
//                 <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '450px' }} />
//               </Box>
//             </Toolbar>
//           </AppBar>
//           <Box mt={3}>
//             <Outlet />
//           </Box>
//         </Container>
//       )}
//     </>
//   );
// }

// export default Layout;

import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box, Menu, MenuItem, ListItemIcon, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { config } from "./config.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import RedeemIcon from '@mui/icons-material/Redeem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupIcon from '@mui/icons-material/Group';
import Person4Icon from '@mui/icons-material/Person4';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/icon.jpg'; // Make sure to provide the correct path to your logo image
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Function to define button styles
const buttonStyles = (isActive, hoverColor, activeColor) => ({
  backgroundColor: isActive ? "#ffffff" : "transparent",
  color: isActive ? "black" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "#ffffff" : hoverColor,
  },
  "&.active": {
    backgroundColor: activeColor,
    color: "black",
  },
  padding: "1.5rem",
  height: "70px",
  width: '140px'
});

const Layout = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for mobile drawer

  const navigate = useNavigate();
  const { userId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if screen is small

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment.trim() !== ''); 
    const lastSegment = segments[segments.length - 1];
    setActiveButton(lastSegment);
  }, [])

  useEffect(() => {
    if (currentUser === null || currentUser.id !== Number(userId)) {
      navigate("/login");
    }
  }, [currentUser]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    setCurrentUser(null);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setDrawerOpen(false); // Close drawer on button click in mobile view
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = (
    <>
      <MenuItem component={RouterLink} to={`users/${currentUser.id}/userProfile`} onClick={() => handleButtonClick("userProfile")}>
        <ListItemIcon>
          <LockPersonIcon fontSize="small" /> 
        </ListItemIcon>
        פרטים אישיים
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" /> 
        </ListItemIcon>
        התנתקות
      </MenuItem>
    </>
  );

  return (
    <>
      {currentUser && (
        <Container>
          <AppBar position="fixed">
            <Toolbar>
              {isMobile ? (
                <>
                  <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                    <MenuIcon />
                  </IconButton>
                  <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <List>
                      <ListItem component={NavLink} to={`users/${currentUser.id}/home`} onClick={() => handleButtonClick("home")}>
                        <ListItemText primary="דף הבית" />
                      </ListItem>
                      {currentUser.permission === config.HIGH_PERMISSION && (
                        <ListItem component={NavLink} to={`users/${currentUser.id}/userManagement`} onClick={() => handleButtonClick("userManagement")}>
                          <ListItemText primary="ניהול משתמשים" />
                        </ListItem>
                      )}
                      <ListItem component={NavLink} to={`users/${currentUser.id}/donors`} onClick={() => handleButtonClick("donors")}>
                        <ListItemText primary="תורמים" />
                      </ListItem>
                      <ListItem component={NavLink} to={`users/${currentUser.id}/donations`} onClick={() => handleButtonClick("donations")}>
                        <ListItemText primary="תרומות" />
                      </ListItem>
                      <ListItem component={NavLink} to={`users/${currentUser.id}/contacts`} onClick={() => handleButtonClick("contacts")}>
                        <ListItemText primary="אנשי קשר" />
                      </ListItem>
                      <ListItem component={NavLink} to={`users/${currentUser.id}/gifts`} onClick={() => handleButtonClick("gifts")}>
                        <ListItemText primary="מתנות" />
                      </ListItem>
                    </List>
                  </Drawer>
                  <Box component={RouterLink} to={`users/${currentUser.id}/home`} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}>
                    <img src={logo} alt="Logo" style={{ height: '70px' }} />
                  </Box>
                </>
              ) : (
                <>
                  <Box onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                    <Button
                      color="inherit"
                      variant="outlined"
                      className={activeButton === "userProfile" ? "active" : ""}
                      sx={buttonStyles(activeButton === "userProfile", "#73b6f9", "#ffffff")}
                      startIcon={<AccountCircleIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                    >
                      {currentUser && currentUser.name}
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      {menuItems}
                    </Menu>
                  </Box>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to={`users/${currentUser.id}/home`}
                    onClick={() => handleButtonClick("home")}
                    className={activeButton === "home" ? "active" : ""}
                    sx={buttonStyles(activeButton === "home", "#73b6f9", "#ffffff")}
                  >
                    דף הבית
                  </Button>
                  {currentUser.permission === config.HIGH_PERMISSION && (
                    <Button
                      color="inherit"
                      component={NavLink}
                      to={`users/${currentUser.id}/userManagement`}
                      onClick={() => handleButtonClick("userManagement")}
                      className={activeButton === "userManagement" ? "active" : ""}
                      sx={buttonStyles(activeButton === "userManagement", "#73b6f9", "#ffffff")}
                      startIcon={<GroupIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                    >
                      ניהול משתמשים
                    </Button>
                  )}
                  <Button
                    color="inherit"
                    component={NavLink}
                    to={`users/${currentUser.id}/donors`}
                    onClick={() => handleButtonClick("donors")}
                    className={activeButton === "donors" ? "active" : ""}
                    sx={buttonStyles(activeButton === "donors", "#73b6f9", "#ffffff")}
                    startIcon={<Person4Icon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                  >
                    תורמים
                  </Button>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to={`users/${currentUser.id}/donations`}
                    onClick={() => handleButtonClick("donations")}
                    className={activeButton === "donations" ? "active" : ""}
                    sx={buttonStyles(activeButton === "donations", "#73b6f9", "#ffffff")}
                    startIcon={<AttachMoneyIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                  >
                    תרומות
                  </Button>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to={`users/${currentUser.id}/contacts`}
                    onClick={() => handleButtonClick("contacts")}
                    className={activeButton === "contacts" ? "active" : ""}
                    sx={buttonStyles(activeButton === "contacts", "#73b6f9", "#ffffff")}
                    startIcon={<PermContactCalendarIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                  >
                    אנשי קשר
                  </Button>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to={`users/${currentUser.id}/gifts`}
                    onClick={() => handleButtonClick("gifts")}
                    className={activeButton === "gifts" ? "active" : ""}
                    sx={buttonStyles(activeButton === "gifts", "#73b6f9", "#ffffff")}
                    startIcon={<RedeemIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                  >
                    מתנות
                  </Button>
                  <Box component={RouterLink} to={`users/${currentUser.id}/home`} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}>
                    <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '380px' }} />
                  </Box>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Box mt={3}>
            <Outlet />
          </Box>
        </Container>
      )}
    </>
  );
}

export default Layout;
