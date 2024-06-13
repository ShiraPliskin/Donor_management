import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonorForm from "./DonorForm";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/Validation"
import GenericMessage from "../Tools/GenericMessage";

const DonorAdd = ({ fields }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [open, setOpen] = useState(false);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setDonorDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
        setDonorDetails({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addDonorRequest = () => {
        setIsSucceed("");
        const newDonor = filterEmptyValues(donorDetails);
        postRequest("donors", newDonor, setIsSucceed, setNewID);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>הוספת תורם</Button>
            {isSucceed === "success" && <GenericMessage message={`תורם מספר ${newID} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת תורם נכשלה" type="error" />}
            <DonorForm donorDetails={donorDetails} setDonorDetails={setDonorDetails} sendRequest={addDonorRequest} open={open} handleClose={handleClose} type="add" />
        </>
    );
};

export default DonorAdd;