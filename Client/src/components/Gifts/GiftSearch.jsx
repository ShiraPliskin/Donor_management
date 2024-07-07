import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const GiftSearch = ({ fields, setGiftsToDisplay, setQueryString, rowsPerPage, setTotalGiftsCount, addedAnItem }) => {
    const [giftDetails, setGiftDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");
    const columnsToDisplay = "id, description, gift_cost, amount";

    useEffect(() => {
        setGiftDetails(fields);
        displayAllGifts();
    }, []);

    useEffect(() => {
        if (addedAnItem)
            sendRequest();
    }, [addedAnItem]);

    const displayAllGifts = async () => {
        const total = await getRequest("gifts", `?feilds=${columnsToDisplay}&_limit=${rowsPerPage}`, setGiftsToDisplay, setCommentArea, "מתנה");
        setTotalGiftsCount(total);
    }

    const sendRequest = async () => {
        setGiftsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(giftDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryConditions = conditions.length > 0 ? `&filter=${conditions.join(',')}` : "";
        const total = await getRequest("gifts", `?feilds=${columnsToDisplay}&_limit=${rowsPerPage}${queryConditions}`, setGiftsToDisplay, setCommentArea, "מתנה");
        setTotalGiftsCount(total);
        setQueryString(queryConditions);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGiftDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (<>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש מתנה</Typography>
                    <SearchIcon style={{ marginTop: '0.3rem',marginRight: 3 }} /> 
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                            <TextField
                                style={{ width: '110px' }}
                                label="מס' מתנה"
                                variant="outlined"
                                name="id"
                                value={giftDetails.id}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '300px' }}
                                label="תיאור המתנה"
                                variant="outlined"
                                name="description"
                                value={giftDetails.description}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon sx={{ marginRight: 1, marginLeft: -1 }} />}>
                                חפש
                            </Button>
                        </Box>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Box display="flex" alignItems="center" margin={'4px'}>
                <Button variant="contained" onClick={displayAllGifts} className="displayAllButton">
                    כל המתנות
                </Button>
            </Box>
        </Box>
        {<p>{commentArea}</p>}</>
    );
};

export default GiftSearch;