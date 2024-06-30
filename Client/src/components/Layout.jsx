import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { config } from "./config.jsx";

const Layout = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    console.log("currentUser ", currentUser);
    if (currentUser === null || currentUser.id != userId) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <>
      {currentUser &&
        <Container>
          <AppBar position="fixed">
            <Toolbar>
              <Link component={RouterLink} style={{ color: 'white' }} to={`users/${currentUser.id}/userProfile`}>{currentUser && currentUser.name}</Link>
              {currentUser.permission === config.HIGH_PERMISSION && <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/userManagement`}>ניהול משתמשים</Button>}
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/donors`}>תורמים</Button>
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/contacts`}>אנשי קשר</Button>
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/gifts`}>מתנות</Button>
            </Toolbar>
          </AppBar>
          <Box mt={3}>
            <Outlet />
          </Box>
        </Container>}
    </>
  );
}

export default Layout;
