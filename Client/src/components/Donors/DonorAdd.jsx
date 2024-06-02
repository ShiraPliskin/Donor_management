import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonorForm from "./DonorForm";
import { postRequest } from "../Tools";

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
        console.log(donorDetails);
        // postRequest("donors", donorDetails, setCommentArea);
        handleClose();
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    // };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                הוספת תורם
            </Button>
            <DonorForm donorDetails={donorDetails} setDonorDetails={setDonorDetails} addDonor={addDonorRequest} open={open} handleClose={handleClose} />
           
            {commentArea && <p>{commentArea}</p>}
        </>
    );
};

export default DonorAdd;