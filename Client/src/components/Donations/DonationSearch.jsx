import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { isEmptyObject } from "../Tools/objectsOperations"

const DonationSearch = ({ fields, donationsToDisplay, setDonationsToDisplay, setQueryString, rowsPerPage, setTotalDonationsCount }) => {
    const [donationDetails, setDonationDetails] = useState({});
    const [minDonationAmount, setMinDonationAmount] = useState("");
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setDonationDetails(fields);
        displayAllDonations();
    }, []);

    useEffect(() => {
        if (donationsToDisplay.length === 0 && (!isEmptyObject(donationDetails) || minDonationAmount)) {
            setCommentArea("לא נמצאה תרומה");
        } else {
            setCommentArea("");
        }
    }, [donationsToDisplay]);

    const displayAllDonations = async () => {
        const total = await getRequest("donations", `?_limit=${rowsPerPage}`, setDonationsToDisplay, setCommentArea, "תורם");
        setTotalDonationsCount(total);
        setQueryString(`?_limit=${rowsPerPage}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDonationsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(donationDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const columnsToDisplay = "id, l_name, f_name, email, phone, address";
        const queryConditions = conditions.length > 0 ? `?fields=${columnsToDisplay}&filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryConditions) {
            const total = await getRequest("donations", queryConditions, setDonationsToDisplay, setCommentArea, "תורם");
            setTotalDonationsCount(total);
        }
        setQueryString(queryConditions);
    };

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
                        <Typography variant="h6">חיפוש תורם</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                                <TextField
                                    style={{ width: '85px' }}
                                    label="מס' תרומה"
                                    variant="outlined"
                                    name="id"
                                    value={donationDetails.id}
                                    onChange={handleChange}
                                    size="small"
                                    margin="none"
                                />
                                <TextField
                                    style={{ width: '130px' }}
                                    label="מספר תורם"
                                    variant="outlined"
                                    name="donor_id"
                                    value={donationDetails.donor_id}
                                    onChange={handleChange}
                                    size="small"
                                    margin="none"
                                />
                                <TextField
                                    style={{ width: '130px' }}
                                    label="סכום התרומה"
                                    variant="outlined"
                                    name="amount"
                                    value={donationDetails.amount}
                                    onChange={handleChange}
                                    size="small"
                                    margin="none"
                                />
                                <TextField
                                    style={{ width: '170px' }}
                                    label="תאריך התרומה"
                                    variant="outlined"
                                    name="date"
                                    value={donationDetails.date}
                                    onChange={handleChange}
                                    size="small"
                                    margin="dense"
                                />
                                <TextField
                                    style={{ width: '90px' }}
                                    label="גובה תרומה מינימלי"
                                    variant="outlined"
                                    name="minDonationAmount"
                                    value={donationDetails.minDonationAmount}
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