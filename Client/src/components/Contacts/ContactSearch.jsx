import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const ContactSearch = ({ fields, setContactsToDisplay, setQueryString, rowsPerPage, setTotalCount }) => {
    const [contactDetails, setContactDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setContactDetails(fields);
        displayAllContacts();
    }, []);

    const displayAllContacts = async () => {
        const total = await getRequest("contacts", `?_limit=${rowsPerPage}`, setContactsToDisplay, setCommentArea, "איש קשר");
        setTotalCount(total);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setContactsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(contactDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryURL = conditions.length > 0 ? `&filter=${conditions.join(',')}` : '';
        const total = await getRequest("contacts", `?_limit=${rowsPerPage}${queryURL}`, setContactsToDisplay, setCommentArea, "איש קשר");
        setTotalCount(total);
        setQueryString(queryURL);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <><Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש איש קשר</Typography>
                    <SearchIcon style={{ marginTop: '0.3rem',marginRight: 3 }} /> 
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                            <TextField
                                style={{ width: '150px' }}
                                label="מס' איש קשר"
                                variant="outlined"
                                name="id"
                                value={contactDetails.id}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '200px' }}
                                label="שם"
                                variant="outlined"
                                name="name"
                                value={contactDetails.name}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '210px' }}
                                label="טלפון"
                                variant="outlined"
                                name="phone"
                                value={contactDetails.phone}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{ width: '230px' }}
                                label="כתובת מייל"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={contactDetails.email}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
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
                <Button variant="contained" onClick={displayAllContacts} className="displayAllButton">
                    כל אנשי הקשר
                </Button>
            </Box>
        </Box>
        {<p>{commentArea}</p>}</>
    );
};

export default ContactSearch;