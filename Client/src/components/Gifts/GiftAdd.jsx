import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericMessage from "../Tools/GenericSuccessMessage";
import GiftForm from "./GiftForm";
import AddIcon from '@mui/icons-material/Add';

const GiftAdd = ({ fields, setAddedAnItem }) => {
    const [giftDetails, setGiftDetails] = useState(fields);
    const [open, setOpen] = useState(false);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setGiftDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGiftDetails(fields);
    };

    const addGiftRequest = () => {
        setIsSucceed("");
        const newGift = filterEmptyValues(giftDetails);
        postRequest("gifts", newGift, setIsSucceed, setNewID);
        setAddedAnItem(true);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ marginTop: 5 }} endIcon={<AddIcon sx={{ marginRight: 1, marginLeft: -1 }} />}>
                הוספת מתנה
            </Button>
            {isSucceed === "success" && <GenericMessage message={`מתנה מספר ${newID} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת מתנה נכשלה" type="error" />}
            <GiftForm fields={fields} giftDetails={giftDetails} setGiftDetails={setGiftDetails} sendRequest={addGiftRequest} open={open} handleClose={handleClose} type="add" />
        </>
    );
};

export default GiftAdd;