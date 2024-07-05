import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box, Menu, MenuItem, Typography } from '@mui/material';
import { config } from "./config.jsx";

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
                    backgroundColor: activeButton === "userProfile" ? "#ffffff" : "transparent",
                    color:"black",
                    "&:hover": {
                      backgroundColor: activeButton === "userProfile" ? "#ffffff" : "#73b6f9",
                    },
                  }}
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
                    פרטים אישיים
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    התנתקות
                  </MenuItem>
                </Menu>
              </Box>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/home`}
                onClick={() => handleButtonClick("home")}
                sx={{
                  backgroundColor: activeButton === "home" ? "#ffffff" : "transparent",
                  color:"black",
                  "&:hover": {
                    backgroundColor: activeButton === "home" ? "#ffffff" : "#73b6f9",
                  },
                }}
              >
                דף הבית
              </Button>
              {currentUser.permission === config.HIGH_PERMISSION && (
                <Button
                  color="inherit"
                  component={NavLink}
                  to={`users/${currentUser.id}/userManagement`}
                  onClick={() => handleButtonClick("userManagement")}
                  sx={{
                    backgroundColor: activeButton === "userManagement" ? "#ffffff" : "transparent",
                    color:"black",
                    "&:hover": {
                      backgroundColor: activeButton === "userManagement" ? "#ffffff" : "#73b6f9",
                    },
                  }}
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
                  backgroundColor: activeButton === "donors" ? "#ffffff" : "transparent",
                  color:"black",
                  "&:hover": {
                    backgroundColor: activeButton === "donors" ? "#ffffff" : "#73b6f9",
                  },
                }}
              >
                תורמים
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/donations`}
                onClick={() => handleButtonClick("donations")}
                sx={{
                  backgroundColor: activeButton === "donations" ? "#ffffff" : "transparent",
                  color:"black",
                  "&:hover": {
                    backgroundColor: activeButton === "donations" ? "#ffffff" : "#73b6f9",
                  },
                }}
              >
                תרומות
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/contacts`}
                onClick={() => handleButtonClick("contacts")}
                sx={{
                  backgroundColor: activeButton === "contacts" ? "#ffffff" : "transparent",
                  color:"black",
                  "&:hover": {
                    backgroundColor: activeButton === "contacts" ? "#ffffff" : "#73b6f9",
                  },
                }}
              >
                אנשי קשר
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to={`users/${currentUser.id}/gifts`}
                onClick={() => handleButtonClick("gifts")}
                sx={{
                  backgroundColor: activeButton === "gifts" ? "#ffffff" : "transparent",
                  color:"black",
                  "&:hover": {
                    backgroundColor: activeButton === "gifts" ? "#ffffff" : "#73b6f9",
                  },
                }}
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

