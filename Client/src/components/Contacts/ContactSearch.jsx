import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { isEmptyObject } from "../Tools/objectsOperations"
import { config } from "../config.jsx";

const ContactSearch = ({ fields, contactsToDisplay, setContactsToDisplay, setQueryString, rowsPerPage }) => {

    const [contactDetails, setContactDetails] = useState({});
    const [donorId, setDonorId] = useState("");
    const [commentArea, setCommentArea] = useState("");
    const [currentPermission, setCurrentPermission] = useState("")

    useEffect(() => {
        setContactDetails(fields);
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentPermission(currentUser.permission);
    }, []);

    useEffect(() => {
        if (contactsToDisplay.length === 0 && (!isEmptyObject(contactDetails) || donorId)) {
            setCommentArea("לא נמצא איש קשר");
        } else {
            setCommentArea("");
        }
    }, [contactsToDisplay]);

    const displayAllContacts = () => {
        getRequest("contacts", `?_limit=${rowsPerPage}`, setContactsToDisplay, setCommentArea, "איש קשר");
        setQueryString(`?_limit=${rowsPerPage}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setContactsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(contactDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryURL = conditions.length > 0 ? `?filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryURL) {
            getRequest("contacts", queryString, setContactsToDisplay, setCommentArea, "איש קשר");
        }
        setQueryString(queryURL);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "donorId")
            setDonorId(value);
        else
            setContactDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            {currentPermission === config.HIGH_PERMISSION && <Button variant="outlined" onClick={displayAllContacts}>כל אנשי הקשר</Button>}
            <h3>חיפוש איש קשר</h3>
            <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    <TextField
                        style={{ width: '150px' }}
                        label="מס' איש קשר"
                        variant="outlined"
                        name="id"
                        value={contactDetails.id}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
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
                    />
                     <TextField
                        style={{ width: '150px' }}
                        label="טלפון"
                        variant="outlined"
                        name="phone"
                        value={contactDetails.phone}
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
                        value={contactDetails.email}
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
                    <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon sx={{ marginLeft: 1 }}/>}>
                        חפש
                    </Button>
                </Box>
                {<p>{commentArea}</p>}
            </form>
        </>
    );
};

export default ContactSearch;