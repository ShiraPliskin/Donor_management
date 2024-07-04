import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

const DonorSearch = ({ fields, setDonorsToDisplay, setQueryString, rowsPerPage, setTotalDonorsCount }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");
    const [inactiveFromDate, setInactiveFromDate] = useState("");

    useEffect(() => {
        setDonorDetails(fields);
        displayAllDonors();
    }, []);

    const displayAllDonors = async () => {
        const columnsToDisplay = "id, l_name, f_name, email, phone, address";
        const total = await getRequest("donors", `?_limit=${rowsPerPage}`, setDonorsToDisplay, setCommentArea, "תורם");
        setTotalDonorsCount(total);
        setQueryString(`?fields=${columnsToDisplay}&_limit=${rowsPerPage}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDonorsToDisplay([]);
        let conditions = [];
        if (inactiveFromDate) {
            conditions = [`inactiveFromDate=${inactiveFromDate}`];
        }
        else {
            for (const [key, value] of Object.entries(donorDetails)) {
                if (value) {
                    conditions.push(`${key}=${value}`);
                }
            }
        }
        
        const columnsToDisplay = "id, l_name, f_name, email, phone, address";
        const queryConditions = conditions.length > 0 ? `?fields=${columnsToDisplay}&filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryConditions) {
            const total = await getRequest("donors", queryConditions, setDonorsToDisplay, setCommentArea, "תורם");
            setTotalDonorsCount(total);
        }
        setQueryString(queryConditions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "inactiveFromDate") {
            setInactiveFromDate(value);
        }
        else {
            setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    return (
        <><Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש תורם</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                            <TextField
                                style={{ width: '85px' }}
                                label="מס' תורם"
                                variant="outlined"
                                name="id"
                                value={donorDetails.id}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '130px' }}
                                label="שם משפחה"
                                variant="outlined"
                                name="l_name"
                                value={donorDetails.l_name}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '130px' }}
                                label="שם פרטי"
                                variant="outlined"
                                name="f_name"
                                value={donorDetails.f_name}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '150px' }}
                                label="טלפון"
                                variant="outlined"
                                name="phone"
                                value={donorDetails.phone}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '170px' }}
                                label="כתובת מייל"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={donorDetails.email}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '160px' }}
                                label="כתובת"
                                variant="outlined"
                                name="address"
                                value={donorDetails.address}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '150px' }}
                                label="לא פעיל החל מתאריך"
                                variant="outlined"
                                type="date"
                                name="inactiveFromDate"
                                onChange={handleChange}
                                size="small"
                                value={inactiveFromDate ? dayjs(updateDonation.date).format('YYYY-MM-DD') : ''}
                                InputProps={{
                                    inputProps: { 
                                        max: dayjs().format('YYYY-MM-DD') 
                                    }
                                }}
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
                <Button variant="contained" onClick={displayAllDonors} className="displayAllButton">
                    כל התורמים
                </Button>
            </Box>
        </Box>
        {<p>{commentArea}</p>}</>
    );
};

export default DonorSearch;