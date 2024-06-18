import React, { useState } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
// import DonorForm from './DonorForm';
import { filterEmptyValues } from "../Tools/Validation"

const ContactDisplay = ({ contact, index, setContactsToDisplay }) => {

    // const [currentContact, setCurrentContact] = useState("");
    // const [commentArea, setCommentArea] = useState("");
    // const [open, setOpen] = useState(false);

    // const getGiftDetails = async () => {
    //     await getByIdRequest("contacts", gift.id, setCurrentGift, setCommentArea);
    // };

    // const handleClickOpen = async () => {
    //     await getGiftDetails();
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const updateGiftRequest = () => {
    //     const updatedGift = filterEmptyValues(currentGift);
    //     putRequest("gifts", updatedGift, setCommentArea);
    //     setGiftsToDisplay((prevGifts) => {
    //         return prevGifts.map(gift =>
    //             gift.id === updatedGift.id ? updatedGift : gift
    //         );
    //     });
    // };

    const handleClickChoose = () => {
         
    }

    return (
        <>
            <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{contact.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickChoose}>
                        <Checkbox checkedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>}
                            inputProps={{ 'aria-label': 'Checkbox' }}
                        />                    </IconButton>
                </TableCell>
            </TableRow>
            {/* {open && (
                <GiftForm giftDetails={currentGift} setGiftDetails={setCurrentGift} sendRequest={updateGiftRequest} open={open} handleClose={handleClose} type="display"/>
            )} */}
            <p>{commentArea}</p>
        </>
    );
};

export default ContactDisplay;
