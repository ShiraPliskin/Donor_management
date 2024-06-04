import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonorForm from "./DonorForm";
import { postRequest } from "../Tools/APIRequests";
import {filterEmptyValues} from "../Tools/Validation"

const DonorAdd = ({ fields }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [open, setOpen] = useState(false);
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setDonorDetails(fields);
    }, [fields, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addDonorRequest = () => {
        const newDonor = filterEmptyValues(donorDetails);
        postRequest("donors", newDonor, setCommentArea);
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                הוספת תורם
            </Button>
            <DonorForm donorDetails={donorDetails} setDonorDetails={setDonorDetails} sendRequest={addDonorRequest} open={open} handleClose={handleClose} type="add"/>
            {commentArea && <p>{commentArea}</p>}
        </>
    );
};

export default DonorAdd;