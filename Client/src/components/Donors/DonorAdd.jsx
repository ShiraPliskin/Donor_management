import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonorForm from "./DonorForm";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericMessage from "../Tools/GenericSuccessMessage";

const DonorAdd = ({ fields }) => {
    const [donorDetails, setDonorDetails] = useState(fields);
    const [open, setOpen] = useState(false);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setDonorDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
          setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDonorDetails(fields);
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
            <DonorForm fields={fields} donorDetails={donorDetails} setDonorDetails={setDonorDetails} sendRequest={addDonorRequest} open={open} handleClose={handleClose} type="add" />
        </>
    );
};

export default DonorAdd;