import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { isEmptyObject } from "../Tools/objectsOperations"

const GiftSearch = ({ fields, giftsToDisplay, setGiftsToDisplay, setQueryString, rowsPerPage, setTotalGiftsCount }) => {
    const [giftDetails, setGiftDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setGiftDetails(fields);
        displayAllGifts();
    }, []);

    useEffect(() => {
        if (giftsToDisplay.length === 0 && !isEmptyObject(giftDetails)) {
            setCommentArea("לא נמצאה מתנה ");
        } else {
            setCommentArea("");
        }
    }, [giftsToDisplay]);

    const displayAllGifts = async () => {
        const total = await getRequest("gifts", `?_limit=${rowsPerPage}`, setGiftsToDisplay, setCommentArea, "מתנה");
        setTotalGiftsCount(total);
        setQueryString(`?_limit=${rowsPerPage}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGiftsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(giftDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const columnsToDisplay = "id, description, gift_cost, amount";
        const queryConditions = conditions.length > 0 ? `?fields=${columnsToDisplay}&filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryConditions) {
            const total = await getRequest("gifts", queryConditions, setGiftsToDisplay, setCommentArea, "מתנה");
            setTotalGiftsCount(total);
        }
        setQueryString(queryConditions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGiftDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (<>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש מתנה</Typography>
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
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '300px' }}
                                label="תיאור המתנה"
                                variant="outlined"
                                name="description"
                                value={giftDetails.description}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
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