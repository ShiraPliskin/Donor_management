import React, { useState, useEffect } from 'react';
import { putRequest } from '../Tools/APIRequests';
import { filterEmptyValues } from "../Tools/objectsOperations"
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';
import UserForm from './UserForm';

const UserDisplay = ({ user, index, setUsersToDisplay, setTotal }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (updateSuccessful === "success") {
            setUsersToDisplay((prevUsers) => {
                return prevUsers.map(user =>
                    user.id === currentUser.id ? currentUser : user
                );
            });
        }
    }, [updateSuccessful]);

    const handleViewUser = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUser = () => {
        setOpenDeleteWarning(true);
    }

    const updateUserRequest = () => {
        setUpdateSuccessful("");
        const updatedUser = filterEmptyValues(currentUser);
        putRequest("users", updatedUser, currentUser.id, setUpdateSuccessful);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <TableRow
                sx={{
                    height: '40px',
                    backgroundColor: isHovered ? '#f5f5f5' : 'inherit',
                    transition: 'background-color 0.3s ease',
                }}
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >                <TableCell sx={{ textAlign: 'center' }}>{user.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{user.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{user.permission}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleViewUser}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <UserForm
                    userDetails={currentUser}
                    setUserDetails={setCurrentUser}
                    sendRequest={updateUserRequest}
                    deleteUser={deleteUser}
                    open={open}
                    handleClose={handleClose}
                    type="display"
                    useType="administration"
                />
            )}
            {openDeleteWarning &&
                <GenericDeletion
                    id={currentUser.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    table="users"
                    objectName="משתמש"
                    objectState={setUsersToDisplay}
                    setTotal={setTotal}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`משתמש מספר ${currentUser.id} עודכן בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון משתמש נכשל" type="error" />}
        </>
    );
};

export default UserDisplay;
