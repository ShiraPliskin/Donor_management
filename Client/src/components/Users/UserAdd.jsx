import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import UserForm from "./UserForm";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericMessage from "../Tools/GenericSuccessMessage";
import AddIcon from '@mui/icons-material/Add';
import "../style.css";

const UserAdd = ({ fields }) => {
    const [userDetails, setUserDetails] = useState(fields);
    const [open, setOpen] = useState(false);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setUserDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserDetails(fields);
    };

    const addUserRequest = () => {
        setIsSucceed("");
        const newUser = filterEmptyValues(userDetails);
        postRequest("users", newUser, setIsSucceed, setNewID);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ marginTop: 5 }} endIcon={<AddIcon sx={{ marginRight: 1 , marginLeft: -1}}/>}>
            הוספת משתמש
            </Button>
            {isSucceed === "success" && <GenericMessage message={`תורם מספר ${newID} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת תורם נכשלה" type="error" />}
            <UserForm fields={fields} userDetails={userDetails} setUserDetails={setUserDetails} sendRequest={addUserRequest} open={open} handleClose={handleClose} type="add" useType="administration"/>
        </>
    );
};

export default UserAdd;