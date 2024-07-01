import React, { useState } from 'react';
import { getByIdRequest, putRequest } from '../Tools/APIRequests';
import { TableCell, TableRow, IconButton} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import DonorForm from './DonorForm';
import {filterEmptyValues} from "../Tools/objectsOperations"
import { config } from "../config.jsx";
import { Image } from '@mui/icons-material';

const GiftDisplay = ({ gift, index , setGiftsToDisplay}) => {
    const [currentGift, setCurrentGift] = useState("");
    const [commentArea, setCommentArea] = useState("");
    const [open, setOpen] = useState(false);

    const getGiftDetails = async () => {
        await getByIdRequest("gifts", gift.id, setCurrentGift, setCommentArea);
    };

    const handleClickOpen = async () => {
        await getGiftDetails();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateGiftRequest = () => {
        const updatedGift = filterEmptyValues(currentGift);
        putRequest("gifts", updatedGift,currentGift.id, setCommentArea);
        setGiftsToDisplay((prevGifts) => {
            return prevGifts.map(gift => 
                gift.id === updatedGift.id ? updatedGift : gift
            );
        });
    };

    return (
        <>
            <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{gift.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{gift.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{gift.img}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
                {/* <Image src={`http://${config.SERVERPORT}/gifts`}></Image> */}
            </TableRow>
            {/* {open && (
                <GiftForm giftDetails={currentGift} setGiftDetails={setCurrentGift} sendRequest={updateGiftRequest} open={open} handleClose={handleClose} type="display"/>
            )} */}
            <p>{commentArea}</p>
        </>
    );
};

export default GiftDisplay;
