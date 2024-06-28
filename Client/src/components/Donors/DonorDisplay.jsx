import React, { useState } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonorForm from './DonorForm';
import { filterEmptyValues } from "../Tools/Validation"
import DonorDelete from './DonorDelete';

const DonorDisplay = ({ donor, index, setDonorsToDisplay }) => {
    const [currentDonor, setCurrentDonor] = useState("");
    const [commentArea, setCommentArea] = useState("");
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

    const getDonorDetails = async () => {
        await getByIdRequest("donors", donor.id, setCurrentDonor, setCommentArea);
    };

    const handleClickOpen = async () => {
        await getDonorDetails();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateDonorRequest = () => {
        const updatedDonor = filterEmptyValues(currentDonor);
        putRequest("donors", updatedDonor, setCommentArea);
        setDonorsToDisplay((prevDonors) => {
            return prevDonors.map(donor =>
                donor.id === updatedDonor.id ? updatedDonor : donor
            );
        });
    };

    const deleteDonor = () => {
        setOpenDeleteWarning(true);
    }

    return (
        <>
            <TableRow key={index}>
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
                <DonorDelete
                    id={currentDonor.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    closeForm={handleClose}
                />
            }
            <p>{commentArea}</p>
        </>
    );
};

export default DonorDisplay;
