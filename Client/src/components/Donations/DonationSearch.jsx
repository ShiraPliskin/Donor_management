import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const DonationSearch = ({ fields, setDonationsToDisplay, setQueryString, rowsPerPage, setTotalDonationsCount, addedAnItem }) => {
    const [donationDetails, setDonationDetails] = useState({});
    const [minDonationAmount, setMinDonationAmount] = useState("");
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setDonationDetails(fields);
        displayAllDonations();
    }, []);

    useEffect(() => {
        if (addedAnItem)
            sendRequest();
    }, [addedAnItem]);

    const displayAllDonations = async () => {
        const total = await getRequest("donations", `?_limit=${rowsPerPage}`, setDonationsToDisplay, setCommentArea, "תרומה");
        setTotalDonationsCount(total);
    }
    
    const sendRequest = async () => {
        setDonationsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(donationDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryConditions = conditions.length > 0 ? `&filter=${conditions.join(',')}` : "";
        const total = await getRequest("donations", `?_limit=${rowsPerPage}${queryConditions}`, setDonationsToDisplay, setCommentArea, "תרומה");
        setTotalDonationsCount(total);
        setQueryString(queryConditions);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDonationAmount")
            setMinDonationAmount(value);
        else
            setDonationDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Accordion sx={{ flexGrow: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography variant="h6">חיפוש תרומה</Typography>
                        <SearchIcon style={{ marginTop: '0.3rem', marginRight: 3 }} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                                <TextField
                                    style={{ width: '100px' }}
                                    label="מס' תרומה"
                                    variant="outlined"
                                    name="id"
                                    value={donationDetails.id}
                                    onChange={handleChange}
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    style={{ width: '100px' }}
                                    label="מספר תורם"
                                    variant="outlined"
                                    name="donor_id"
                                    value={donationDetails.donor_id}
                                    onChange={handleChange}
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    style={{ width: '140px' }}
                                    label="סכום התרומה"
                                    variant="outlined"
                                    name="amount"
                                    value={donationDetails.amount}
                                    onChange={handleChange}
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    style={{ width: '190px' }}
                                    label="תאריך"
                                    variant="outlined"
                                    name="date"
                                    type="date"
                                    onChange={handleChange}
                                    size="small"
                                    value={donationDetails.date ? dayjs(updateDonation.date).format('YYYY-MM-DD') : ''}
                                    InputProps={{
                                        inputProps: {
                                            max: dayjs().format('YYYY-MM-DD')
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    style={{ width: '140px' }}
                                    label="גובה תרומה מינימלי"
                                    variant="outlined"
                                    name="minDonationAmount"
                                    value={minDonationAmount}
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
                    <Button variant="contained" onClick={displayAllDonations} className="displayAllButton">
                        כל התרומות
                    </Button>
                </Box>
            </Box>
            {<p>{commentArea}</p>}
        </>
    );
};

export default DonationSearch;