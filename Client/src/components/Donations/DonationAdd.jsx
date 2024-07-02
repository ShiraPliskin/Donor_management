import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonationForm from "./DonationForm";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericMessage from "../Tools/GenericSuccessMessage";
import AddIcon from '@mui/icons-material/Add';

import "../style.css";

const DonationAdd = ({ fields }) => {
    const [donationDetails, setDonationDetails] = useState(fields);
    const [open, setOpen] = useState(false);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setDonationDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
          setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDonationDetails(fields);
    };

    const addDonationRequest = () => {
        setIsSucceed("");
        const newDonation = filterEmptyValues(donationDetails);
        postRequest("donations", newDonation, setIsSucceed, setNewID);
        handleClose();
    };

    return (
        <>
            <Button className="mainButton" variant="outlined" sx={{ marginTop: 5 }} onClick={handleClickOpen}endIcon={<AddIcon sx={{ marginRight: 1, marginLeft: -1 }} />}>הוספת תרומה</Button>
            {isSucceed === "success" && <GenericMessage message={`תרומה מספר ${newID} נוספה בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת התרומה נכשלה" type="error" />}
            <DonationForm fields={fields} donationDetails={donationDetails} setDonationDetails={setDonationDetails} sendRequest={addDonationRequest} open={open} handleClose={handleClose} type="add" />
        </>
    );
};

export default DonationAdd;