import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { React,useState, useEffect } from 'react';
import NotFound from "./NotFound"
import Login from "./Login/Login"
import Register from "./Register/Register"
import Donors from "./Donors/Donors";
import Gifts from "./Gifts/Gifts";
import Contacts from "./Contacts/Contacts";
import Layout from "./Layout";
import Home from "./Home";
const Routing = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    return (
      <>
        <Router>
            <Routes>
              <Route path='/' element={<Navigate to={currentUser != null ? "/users/:userId/home" : "/Login"} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route element={<Layout />}>
                  <Route path='/users/:userId'>
                    <Route path='home' element={<Home />} />
                    <Route path='donors' element={<Donors />} />
                    <Route path='contacts' element={<Contacts />} />
                    <Route path='gifts' element={<Gifts />} />
                  </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    </>
  )
}
export default Routing