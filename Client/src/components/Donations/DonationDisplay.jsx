import React, { useState, useEffect } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DonationForm from './DonationForm';
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';
import moment from 'moment';

const DonationDisplay = ({ donation, index, setDonationsToDisplay, setTotal}) => {

    const [currentDonation, setCurrentDonation] = useState(donation);
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (updateSuccessful === "success") {
            setDonationsToDisplay((prevDonations) => {
                return prevDonations.map(donation =>
                    donation.id === currentDonation.id ? currentDonation : donation
                );
            });
        }
    }, [updateSuccessful]);
    
    useEffect(() => {
        setOpenDeleteWarning(false);
    }, [open]);

    const handleClickOpen = () => {
        setCurrentDonation(donation);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteDonation = () => {
        setOpenDeleteWarning(true);
    }

    const updateDonationRequest = () => {
        setUpdateSuccessful("");
        const updatedDonation = filterEmptyValues(currentDonation);
        putRequest("donations", updatedDonation, currentDonation.id, setUpdateSuccessful);
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
                <TableCell sx={{ textAlign: 'center' }}>{donation.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donation.donor_id}</TableCell>
                <TableCell sx={{ textAlign: 'center', display: { xs: 'none', sm: 'table-cell' } }}>{Number.isInteger(donation.amount) ? donation.amount : parseFloat(donation.amount).toFixed(2).replace(/\.?0+$/, '')}</TableCell>
                <TableCell sx={{ textAlign: 'center', display: { xs: 'none', sm: 'table-cell' } }}>{donation.payment_method}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{moment(donation.date).format('DD-MM-YYYY')}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <DonationForm
                    donationDetails={currentDonation}
                    setDonationDetails={setCurrentDonation}
                    sendRequest={updateDonationRequest}
                    deleteDonation={deleteDonation}
                    open={open}
                    handleClose={handleClose}
                    type="display"
                />
            )}
            {openDeleteWarning &&
                <GenericDeletion
                    id={currentDonation.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    table="donations"
                    objectName="תרומה"
                    objectState={setDonationsToDisplay}
                    setTotal={setTotal}
                    handleClose={handleClose}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`תרומה מספר ${currentDonation.id} עןדכנה בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון תרומה נכשל" type="error" />}
        </>
    );
};

export default DonationDisplay;
