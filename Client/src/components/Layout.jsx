import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { config } from "./config.jsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import RedeemIcon from '@mui/icons-material/Redeem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupIcon from '@mui/icons-material/Group';
import Person4Icon from '@mui/icons-material/Person4';

const Layout = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

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
  };

  return (
    <>
      {currentUser && (
        <Container>
          <AppBar position="fixed">
            <Toolbar>
              <Box
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
              >
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{
                    backgroundColor: activeButton === "userProfile" ? "#f50057" : "transparent",
                    "&:hover": {
                      backgroundColor: activeButton === "userProfile" ? "#f50057" : "#f44336",
                    },
                    height: "40px",
                    marginLeft: "20px",
                    width: '100px'
                  }}
                  startIcon={<AccountCircleIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
                >
                  {currentUser && currentUser.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={RouterLink} to={`users/${currentUser.id}/userProfile`} onClick={() => handleButtonClick("userProfile")}
                  >
                     <ListItemIcon>
                       <LockPersonIcon fontSize="small" /> 
                     </ListItemIcon>
                    פרטים אישיים
                  </MenuItem>
                  <MenuItem onClick={handleLogout} >
                     <ListItemIcon>
                       <ExitToAppIcon fontSize="small" /> 
                     </ListItemIcon>
                    התנתקות
                  </MenuItem>
                </Menu>
              </Box>
              {currentUser.permission === config.HIGH_PERMISSION && (
                <Button
                  color="inherit"
                  component={NavLink}
                  to={`users/${currentUser.id}/userManagement`}
                  onClick={() => handleButtonClick("userManagement")}
                  sx={{
                    backgroundColor: activeButton === "userManagement" ? "#f50057" : "transparent",
                    "&:hover": {
                      backgroundColor: activeButton === "userManagement" ? "#f50057" : "#f44336",
                    },
                    padding: "1.5rem",
                    height: "70px",
                    width: '140px'
                  }}
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
                sx={{
                  backgroundColor: activeButton === "donors" ? "#f50057" : "transparent",
                  "&:hover": {
                    backgroundColor: activeButton === "donors" ? "#f50057" : "#f44336",
                  },
                  padding: "1.5rem",
                  height: "70px",
                  width: '140px'
                }}
                startIcon={<Person4Icon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
              >
                תורמים
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/donations`}
                onClick={() => handleButtonClick("donations")}
                sx={{
                  backgroundColor: activeButton === "donations" ? "#f50057" : "transparent",
                  "&:hover": {
                    backgroundColor: activeButton === "donations" ? "#f50057" : "#f44336",
                  },
                  padding: "1.5rem",
                  height: "70px",
                  width: '140px'
                }}
                startIcon={<AttachMoneyIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
              >
                תרומות
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/contacts`}
                onClick={() => handleButtonClick("contacts")}
                sx={{
                  backgroundColor: activeButton === "contacts" ? "#f50057" : "transparent",
                  "&:hover": {
                    backgroundColor: activeButton === "contacts" ? "#f50057" : "#f44336",
                  },
                  padding: "1.5rem",
                  height: "70px",
                  width: '140px'
                }}
                startIcon={<PermContactCalendarIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
              >
                אנשי קשר
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/gifts`}
                onClick={() => handleButtonClick("gifts")}
                sx={{
                  backgroundColor: activeButton === "gifts" ? "#f50057" : "transparent",
                  "&:hover": {
                    backgroundColor: activeButton === "gifts" ? "#f50057" : "#f44336",
                  },
                  padding: "1.5rem",
                  height: "70px",
                  width: '140px'
                }}
                startIcon={<RedeemIcon sx={{ marginLeft: 1.5, marginRight: -1.5 }} />}
              >
                מתנות
              </Button>
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

