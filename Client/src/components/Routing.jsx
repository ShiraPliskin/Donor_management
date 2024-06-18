import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Donors from "./Donors/Donors";

const Routing = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [currentPage, setCurrentPage] = useState(currentUser ? `/users/${currentUser.id}/home` : "/login");

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        setCurrentPage(currentUser ? `/users/${currentUser.id}/home` : "/login");
    }, []);

    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={currentPage} />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route exact path="users/:userId/home" element={<Home />} >
                    <Route path="donors" element={<Donors />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>)
}
export default Routing;