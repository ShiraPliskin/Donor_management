import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const GiftSearch = ({ fields, giftsToDisplay, setGiftsToDisplay }) => {

    const [giftDetails, setGiftDetails] = useState({});
    const [donorId, setDonorId] = useState("");
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setGiftDetails(fields);
    }, []);

    useEffect(() => {
            setCommentArea("");
    }, [giftsToDisplay]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setGiftsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(giftDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const columnsToDisplay = "id, description, img";
        const queryString = conditions.length > 0 ? `?fields=${columnsToDisplay}&filter=${conditions.join(',')}` : "";
        if (queryString) {
            getRequest("gifts", queryString, setGiftsToDisplay, setCommentArea, "מתנה");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "donorId")
            setDonorId(value);
        else
            setGiftDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    <TextField
                        style={{ width: '100px' }}
                        label="מס' מתנה"
                        variant="outlined"
                        name="id"
                        value={giftDetails.id}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '200px' }}
                        label="תיאור המתנה"
                        variant="outlined"
                        name="description"
                        value={giftDetails.description}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="מס' תורם"
                        variant="outlined"
                        name="donorId"
                        value={donorId}
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

export default GiftSearch;