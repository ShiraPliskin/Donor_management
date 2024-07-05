import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NotFound from "./NotFound";
import Login from "./Login/Login";
import Donors from "./Donors/Donors";
import Gifts from "./Gifts/Gifts";
import Contacts from "./Contacts/Contacts";
import Layout from "./Layout";
import Home from "./Home";
import UserProfile from "./Users/UserProfile";
import Users from "./Users/Users";
import Donations from "./Donations/Donations";
import ForgotPassword from "./Login/ForgotPassword";

const Routing = () => {
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setRedirect(`/users/${user.id}/home`);
    } else {
      setRedirect('/login');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={redirect && redirect} replace />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route element={<Layout />}>
          <Route path='/users/:userId'>
            <Route path='home' element={<Home />} />
            <Route path='donations' element={<Donations />} />
            <Route path='userManagement' element={<Users />} />
            <Route path='donors' element={<Donors type="donors"/>} />
            <Route path='contacts' element={<Contacts type="contacts"/>} />
            <Route path='gifts' element={<Gifts />} />
            <Route path='userProfile' element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
