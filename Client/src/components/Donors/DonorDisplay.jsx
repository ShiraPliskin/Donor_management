import React, { useState, useEffect } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonorForm from './DonorForm';
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';

const DonorDisplay = ({ donor, index, setDonorsToDisplay, setTotal}) => {

    const [currentDonor, setCurrentDonor] = useState("");
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (updateSuccessful === "success") {
            setDonorsToDisplay((prevDonors) => {
                return prevDonors.map(donor =>
                    donor.id === currentDonor.id ? currentDonor : donor
                );
            });
        }
    }, [updateSuccessful]);

    const getDonorDetails = async () => {
        await getByIdRequest("donors", donor.id, setCurrentDonor, setComment);
    };

    const handleClickOpen = async () => {
        await getDonorDetails();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteDonor = () => {
        setOpenDeleteWarning(true);
    }

    const updateDonorRequest = () => {
        setUpdateSuccessful("");
        const updatedDonor = filterEmptyValues(currentDonor);
        putRequest("donors", updatedDonor, currentDonor.id, setUpdateSuccessful);
    };

    return (
        <>
            <TableRow sx={{ height: '40px' }} key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{donor.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.l_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.f_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <DonorForm
                    donorDetails={currentDonor}
                    setDonorDetails={setCurrentDonor}
                    sendRequest={updateDonorRequest}
                    deleteDonor={deleteDonor}
                    open={open}
                    handleClose={handleClose}
                    type="display"
                />
            )}
            {openDeleteWarning &&
                <GenericDeletion
                    id={currentDonor.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    table="donors"
                    objectName="תורם"
                    objectState={setDonorsToDisplay}
                    formOpen={setOpen}
                    setTotal={setTotal}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`תורם מספר ${currentDonor.id} עודכן בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון תורם נכשל" type="error" />}
            <p>{comment}</p> 
        </>
    );
};

export default DonorDisplay;
