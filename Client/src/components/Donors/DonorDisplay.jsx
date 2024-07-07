import React, { useState, useEffect } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonorForm from './DonorForm';
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';
import Checkbox from "@mui/material/Checkbox";

const DonorDisplay = ({ donor, index, setDonorsToDisplay, setTotal, selectedDonorId, setSelectedDonorId, type }) => {

    const [currentDonor, setCurrentDonor] = useState("");
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [comment, setComment] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (updateSuccessful === "success") {
            setDonorsToDisplay((prevDonors) => {
                return prevDonors.map(donor =>
                    donor.id === currentDonor.id ? currentDonor : donor
                );
            });
        }
    }, [updateSuccessful]);

    useEffect(() => {
        setOpenDeleteWarning(false);
    }, [open]);

    const getDonorDetails = async () => {
        await getByIdRequest("donors", donor.id, setCurrentDonor, setComment);
    };

    const handleClickChoose = () => {
        if (type === "donations")
            setSelectedDonorId((prevId) => (prevId[0] === donor.id ? [] : [donor.id]));
        if (type === "gifts")
            setSelectedDonorId((prevId) => prevId.includes(donor.id) ? (prevId.filter(donorId => donorId !== donor.id)) : [...prevId, donor.id]);
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
            >
                <TableCell sx={{ textAlign: 'center' }}>{donor.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.l_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.f_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    {type === "donors" ?
                        <IconButton onClick={handleClickOpen}>
                            <VisibilityIcon />
                        </IconButton>
                        :
                        <IconButton onClick={handleClickChoose}>
                            <Checkbox
                                checked={selectedDonorId.includes(donor.id)}
                                checkedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>}
                                inputProps={{ 'aria-label': 'Checkbox' }}
                            />
                        </IconButton>
                    }
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
                    setTotal={setTotal}
                    handleClose={handleClose}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`תורם מספר ${currentDonor.id} עודכן בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון תורם נכשל" type="error" />}
            <p>{comment}</p>
        </>
    );
};

export default DonorDisplay;
