import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools";
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DonorSearch = ({ fields, donorsToDisplay, setDonorsToDisplay }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");
    const [minDonationAmount, setMinDonationAmount] = useState("");

    useEffect(() => {
        setDonorDetails(fields);
    }, []);

    useEffect(() => {
        setCommentArea("");
    }, [donorsToDisplay]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDonorsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(donorDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryString = conditions.length > 0 ? `?${conditions.join('&')}` : '';
        getRequest("donors", queryString, setDonorsToDisplay, setCommentArea);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDonationAmount")
            setMinDonationAmount(value);
        else
            setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    <TextField
                        style={{ width: '100px' }}
                        label="מס' תורם"
                        variant="outlined"
                        name="id"
                        value={donorDetails.id}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="שם משפחה"
                        variant="outlined"
                        name="l_name"
                        value={donorDetails.l_name}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="שם פרטי"
                        variant="outlined"
                        name="f_name"
                        value={donorDetails.f_name}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="טלפון"
                        variant="outlined"
                        name="phone"
                        value={donorDetails.phone}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '220px' }}
                        label="כתובת מייל"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={donorDetails.email}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '200px' }}
                        label="כתובת"
                        variant="outlined"
                        name="address"
                        value={donorDetails.address}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="גובה תרומה מינימלי"
                        variant="outlined"
                        name="minDonationAmount"
                        value={minDonationAmount}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon />}>
                        חפש
                    </Button>
                </Box>
                {<p>{commentArea}</p>}
            </form>
        </>
    );
};

export default DonorSearch;