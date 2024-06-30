// import React, { useState, useEffect } from "react";
// import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

// export default function Layout() {
//   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
//   const [linkClicked, setLinkClicked] = useState(false);
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   //for paragraph in Layout
//   useEffect(() => {
//     const pathSegments = window.location.pathname.split('/');
//     const lastSegment = pathSegments[pathSegments.length - 1];
//     if (lastSegment !== "Layout") {
//       setLinkClicked(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (currentUser === null || currentUser.id != userId) {
//       navigate("/");
//     }
//   }, [currentUser]);

// //   const logout = () => {
// //     localStorage.clear();
// //     setCurrentUser(null);
// //   };

//   return (
//     <>
//       <div>
//         <h3>{currentUser && currentUser.name}</h3>
//         <div className="links">
//           {/* <NavLink className="link" onClick={() => logout()}>Logout</NavLink> */}
//           <NavLink className="link" to="info" onClick={() => setLinkClicked(true)}>Donors</NavLink>
//         </div>
//       </div>
//       <div className="content">
//         {!linkClicked && (
//           <h1>כולל צילו של היכל</h1>
//         )}
//         <Outlet />
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function Layout() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    console.log("currentUser ", currentUser);
    if (currentUser === null || currentUser.id !== userId) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <>
      {currentUser &&
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                {currentUser && currentUser.name}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/userManagement`}>ניהול משתמשים</Button>
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/donors`}>תורמים</Button>
              <Button color="inherit" component={NavLink} to={`users/${currentUser.id}/contacts`}>אנשי קשר</Button>
            </Toolbar>
          </AppBar>
          <Box mt={3}>
            <Outlet />
          </Box>
        </Container>}
    </>
  );
}

