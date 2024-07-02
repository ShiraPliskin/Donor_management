import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { isEmptyObject } from "../Tools/objectsOperations"

const UserSearch = ({ fields, usersToDisplay, setUsersToDisplay, setQueryString, rowsPerPage, setTotalCount }) => {

    const [userDetails, setUserDetails] = useState({});
    const [donorId, setDonorId] = useState("");
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setUserDetails(fields);
        displayAllUsers();
    }, []);

    useEffect(() => {
        if (usersToDisplay.length === 0 && (!isEmptyObject(userDetails) || donorId)) {
            setCommentArea("לא נמצא משתמש");
        } else {
            setCommentArea("");
        }
    }, [usersToDisplay]);

    const displayAllUsers = async () => {
        const total = await getRequest("users", `?_limit=${rowsPerPage}`, setUsersToDisplay, setCommentArea, "משתמש");
        setTotalCount(total);
        setQueryString(`?_limit=${rowsPerPage}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsersToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(userDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryURL = conditions.length > 0 ? `?filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryURL) {
            const total = await getRequest("users", queryURL, setUsersToDisplay, setCommentArea, "משתמש");
            setTotalCount(total);
        }
        setQueryString(queryURL);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <><Box display="flex" alignItems="center" justifyContent="space-between">
            <Accordion sx={{ flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography variant="h6">חיפוש משתמש</Typography>
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
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '220px' }}
                                label="שם"
                                variant="outlined"
                                name="name"
                                value={userDetails.name}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
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
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '180px' }}
                                label="הרשאה"
                                variant="outlined"
                                name="permission"
                                value={userDetails.permission}
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
                <Button variant="contained" onClick={displayAllUsers} className="displayAllButton">
                    כל המשתמשים
                </Button>
            </Box>
        </Box>
            {<p>{commentArea}</p>}</>
    );
};

export default UserSearch;