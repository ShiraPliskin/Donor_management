// import React, { useState, useEffect } from "react";
// import { useNavigate, Outlet, NavLink, useParams } from "react-router-dom";

// export default function Home() {
//   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
//   const [linkClicked, setLinkClicked] = useState(false);
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   //for paragraph in home
//   useEffect(() => {
//     const pathSegments = window.location.pathname.split('/');
//     const lastSegment = pathSegments[pathSegments.length - 1];
//     if (lastSegment !== "home") {
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

export default function Home() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [linkClicked, setLinkClicked] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  // For paragraph in home
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment !== "home") {
      setLinkClicked(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser === null || currentUser.id !== userId) {
      navigate("/");
    }
  }, [currentUser]);

  // const logout = () => {
  //   localStorage.clear();
  //   setCurrentUser(null);
  // };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {currentUser && currentUser.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={logout}>Logout</Button> */}
          <Button color="inherit" component={NavLink} to="info" onClick={() => setLinkClicked(true)}>
            Donors
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={3}>
        {!linkClicked && (
          <Typography variant="h1" align="center">
            כולל צילו של היכל
          </Typography>
        )}
        <Outlet />
      </Box>
    </Container>
  );
}

