import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/Validation"
import GenericMessage from "../Tools/GenericSuccessMessage";
import GiftForm from "./GiftForm";

const GiftAdd = ({ fields }) => {
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
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>הוספת מתנה</Button>
            {isSucceed === "success" && <GenericMessage message={`מתנה מספר ${newID} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת מתנה נכשלה" type="error" />}
            <GiftForm fields={fields} giftDetails={giftDetails} setGiftDetails={setGiftDetails} sendRequest={addGiftRequest} open={open} handleClose={handleClose} type="add" />
        </>
    );
};

export default GiftAdd;