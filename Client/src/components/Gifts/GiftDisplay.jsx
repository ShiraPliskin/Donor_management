import React, { useState, useEffect } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GiftForm from './GiftForm';
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';

const GiftDisplay = ({ gift, index, setGiftsToDisplay, setTotal}) => {

    const [currentGift, setCurrentGift] = useState("");
    const [open, setOpen] = useState(false);
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (updateSuccessful === "success") {
            setGiftsToDisplay((prevGifts) => {
                return prevGifts.map(gift =>
                    gift.id === currentGift.id ? currentGift : gift
                );
            });
        }
    }, [updateSuccessful]);

    const getGiftDetails = async () => {
        await getByIdRequest("gifts", gift.id, setCurrentGift, setComment);
    };

    const handleClickOpen = async () => {
        await getGiftDetails();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteGift = () => {
        setOpenDeleteWarning(true);
    }

    const updateGiftRequest = () => {
        setUpdateSuccessful("");
        const updatedGift = filterEmptyValues(currentGift);
        putRequest("gifts", updatedGift, currentGift.id, setUpdateSuccessful);
    };

    return (
        <>
            <TableRow sx={{ height: '40px' }} key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{gift.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{gift.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{gift.gift_cost}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{gift.amount}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <GiftForm
                    giftDetails={currentGift}
                    setGiftDetails={setCurrentGift}
                    sendRequest={updateGiftRequest}
                    deleteGift={deleteGift}
                    open={open}
                    handleClose={handleClose}
                    setGiftsToDisplay ={setGiftsToDisplay}
                    type="display"
                />
            )}
            {openDeleteWarning &&
                <GenericDeletion
                    id={currentGift.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    table="gifts"
                    objectName="מתנה"
                    objectState={setGiftsToDisplay}
                    setTotal={setTotal}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`מתנה מספר ${currentGift.id} עוכנה בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון מתנה נכשל" type="error" />}
            <p>{comment}</p> 
        </>
    );
};

export default GiftDisplay;
