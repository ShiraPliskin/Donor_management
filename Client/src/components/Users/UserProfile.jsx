import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { AppBar, Toolbar, Container, Box, Menu, IconButton, MenuItem, List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { putRequest } from '../Tools/APIRequests'
import { filterEmptyValues } from "../Tools/objectsOperations"
import UserForm from './UserForm';
import GenericMessage from '../Tools/GenericSuccessMessage';
import UserUpdatePassword from './UserUpdatePassword';

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
    const [openEditForm, setOpenEditForm] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [openUpdatePWForm, setOpenUpdatePWForm] = useState(false);

    // useEffect(() => {
    //     const permissionType = currentUser.permission === "secretary" ? "מזכירה" : "מנהל";
    //     setPermission(permissionType);
    // }, [currentUser.permission]);

    // useEffect(() => {
    //     if (oldPassword != "") {
    //         const passwordObject = { "password": oldPassword };
    //         getByPostRequest(`register/${currentUser.id}`, passwordObject, setComment, setStatus);
    //     }
    // }, [oldPassword])

    // useEffect(() => {
    //     if (status === 200) {
    //         const passwordObject = { "prevPassword": oldPassword, "password": newPassword };
    //         putRequest("register", passwordObject, currentUser.id, setComment);
    //         setChangePassword(false);
    //         setComment("הסיסמה עודכנה בהצלחה");

    //     }
    //     else if (status === 500)
    //         setComment("אינך מורשה לשנות סיסמה");
    // }, [status])

    const handleClosePW = () => {
        setOpenUpdatePWForm(false);
    };

    const updateUserRequest = () => {
        setUpdateSuccessful("");
        const updatedUser = filterEmptyValues(currentUser);
        putRequest("users", updatedUser, currentUser.id, setUpdateSuccessful);
    };

    return (
        <>
            <Box mt={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <List sx={{ border: '1px solid #ccc', borderRadius: '8px', width: '80%', padding: '20px', backgroundColor: '#f9f9f9' }}>
                    <Typography variant="h5" sx={{ textAlign: 'right' }} gutterBottom>
                        פרטים אישיים
                    </Typography>
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="שם" secondary={currentUser.name} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} secondaryTypographyProps={{ fontSize: '1rem' }} />
                    </ListItem>
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="כתובת מייל" secondary={currentUser.email} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} secondaryTypographyProps={{ fontSize: '1rem' }} />
                    </ListItem>
                    <ListItem sx={{ textAlign: 'right' }}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="סוג הרשאה" secondary={currentUser.permission} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }} secondaryTypographyProps={{ fontSize: '1rem' }} />
                    </ListItem>
                    <Button onClick={() => setOpenEditForm(true)} endIcon={<EditIcon sx={{ marginRight: 1, marginLeft: -1 }} />}>עריכה</Button>
                </List>
                <Box sx={{ mt: 2, width: '93%' }}>
                    <Button onClick={() => setOpenUpdatePWForm(true)} fullWidth variant="outlined">שינוי סיסמה</Button>
                </Box>
            </Box>
            {openUpdatePWForm && <UserUpdatePassword open={openUpdatePWForm} handleClose={handleClosePW} id={currentUser.id} formType="update" useType="userProfile" />}
            {openEditForm &&
                <UserForm
                    userDetails={currentUser}
                    setUserDetails={setCurrentUser}
                    sendRequest={updateUserRequest}
                    open={openEditForm}
                    handleClose={() => setOpenEditForm(false)}
                    type="edit"
                    useType="userProfile"
                />}
            {updateSuccessful === "success" && <GenericMessage message={`פרטייך עודכנו בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="העדכון נכשל" type="error" />}
        </>
    );
};

export default UserProfile;