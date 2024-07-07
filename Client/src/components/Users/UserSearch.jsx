import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const UserSearch = ({ fields, setUsersToDisplay, setQueryString, rowsPerPage, setTotalCount, addedAnItem }) => {
    const [userDetails, setUserDetails] = useState({});
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setUserDetails(fields);
        displayAllUsers();
    }, []);

    useEffect(() => {
        if (addedAnItem)
            sendRequest();
    }, [addedAnItem]);

    const displayAllUsers = async () => {
        const total = await getRequest("users", `?_limit=${rowsPerPage}`, setUsersToDisplay, setCommentArea, "משתמש");
        setTotalCount(total);
    }

    const sendRequest = async () => {
        setUsersToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(userDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryURL = conditions.length > 0 ? `&filter=${conditions.join(',')}` : "";
        const total = await getRequest("users", `?_limit=${rowsPerPage}${queryURL}`, setUsersToDisplay, setCommentArea, "משתמש");
        setTotalCount(total);
        setQueryString(queryURL);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <><Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש משתמש</Typography>
                    <SearchIcon style={{ marginTop: '0.3rem',marginRight: 3 }} /> 
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.5}>
                            <TextField
                                style={{ width: '150px' }}
                                label="מס' משתמש"
                                variant="outlined"
                                name="id"
                                value={userDetails.id}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                style={{ width: '220px' }}
                                label="שם"
                                variant="outlined"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                style={{ width: '250px' }}
                                label="כתובת מייל"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                size="small"
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <FormControl style={{ width: '150px' }} size="small" >
                                <InputLabel id="permission-label" shrink>
                                    הרשאה
                                </InputLabel>
                                <Select
                                    labelId="permission-label"
                                    id="permission"
                                    name="permission"
                                    label="הרשאה"
                                    size="small"
                                    onChange={handleChange}
                                    notched
                                >
                                    <MenuItem value="מזכיר">מזכיר</MenuItem>
                                    <MenuItem value="מנהל">מנהל</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon sx={{ marginRight: 1, marginLeft: -1 }} />}>
                                חפש
                            </Button>
                        </Box>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Box display="flex" alignItems="center" margin={'4px'}>
                <Button variant="contained" onClick={displayAllUsers} className="displayAllButton">
                    כל המשתמשים
                </Button>
            </Box>
        </Box>
            {<p>{commentArea}</p>}</>
    );
};

export default UserSearch;