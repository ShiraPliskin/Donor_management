import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getByPostRequest, putRequest } from './Tools/APIRequests'
const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [permission, setPermission] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [status, setStatus] = useState("0");
    const [comment, setComment] = useState();
    const [btnContent, setBtnContent] = useState("");

    useEffect(() => {
        const permissionType = currentUser.permission === "secretary" ? "מזכירה" : "מנהל";
        setPermission(permissionType);
    }, [currentUser.permission]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
        setCurrentUser(null);
    };

    useEffect(() => {
        if (oldPassword != "") {
            const passwordObject = { "password": oldPassword };
            getByPostRequest(`register/${currentUser.id}`, passwordObject, setComment, setStatus);
        }
    }, [oldPassword])


    useEffect(() => {
        if (status === 200) {
            const passwordObject = { "prevPassword": oldPassword, "password": newPassword };
            putRequest("register", passwordObject, currentUser.id, setComment);
            setChangePassword(false);
            setComment("הסיסמה עודכנה בהצלחה");

        }
        else if (status === 500)
            setComment("אינך מורשה לשנות סיסמה");
    }, [status])
    return (
        <>
            <Box>
                <Typography variant="h6">שם: {currentUser.name}</Typography>
                <Typography variant="body1">מייל: {currentUser.email}</Typography>
                <Typography variant="body1">סוג הרשאה: {permission}</Typography>
               
            </Box>
            {changePassword && <TextField label="סיסמה ישנה" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />}
            {changePassword && <TextField label="סיסמה חדשה" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />}
            <Button color="inherit" onClick={() => setChangePassword(true)}>שינוי סיסמה</Button>
            <Button color="inherit" component={NavLink} onClick={handleLogout}>התנתקות</Button>

            <p>{comment}</p>
        </>
    );
};

export default UserProfile;