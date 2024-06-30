import React, { useState, useEffect } from "react";
import { getRequest } from "../Tools/APIRequests";
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { isEmptyObject } from "../Tools/objectsOperations"
import { config } from "../config.jsx";

const DonorSearch = ({ fields, donorsToDisplay, setDonorsToDisplay, setQueryString, rowsPerPage }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [minDonationAmount, setMinDonationAmount] = useState("");
    const [commentArea, setCommentArea] = useState("");
    const [currentPermission, setCurrentPermission] = useState("")

    useEffect(() => {
        setDonorDetails(fields);
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentPermission(currentUser.permission);
    }, []);

    useEffect(() => {
        if (donorsToDisplay.length === 0 && (!isEmptyObject(donorDetails) || minDonationAmount)) {
            setCommentArea("לא נמצא תורם");
        } else {
            setCommentArea("");
        }
    }, [donorsToDisplay]);

    const displayAllDonors = () => {
        getRequest("donors", `?_limit=${rowsPerPage}`, setDonorsToDisplay, setCommentArea, "תורם");
        setQueryString(`?_limit=${rowsPerPage}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDonorsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(donorDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const columnsToDisplay = "id, l_name, f_name, email, phone, address";
        const queryConditions = conditions.length > 0 ? `?fields=${columnsToDisplay}&filter=${conditions.join(',')}&_limit=${rowsPerPage}` : "";
        if (queryConditions) {
            getRequest("donors", queryConditions, setDonorsToDisplay, setCommentArea, "תורם");
        }
        setQueryString(queryConditions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDonationAmount")
            setMinDonationAmount(value);
        else
            setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            {currentPermission === config.HIGH_PERMISSION && <Button className="mainButton" variant="contained" onClick={displayAllDonors}>כל התורמים</Button>}
                    <h3>חיפוש תורם</h3>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                            <TextField
                                style={{ width: '100px' }}
                                label="מס' תורם"
                                variant="outlined"
                                name="id"
                                value={donorDetails.id}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '150px' }}
                                label="שם משפחה"
                                variant="outlined"
                                name="l_name"
                                value={donorDetails.l_name}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '140px' }}
                                label="שם פרטי"
                                variant="outlined"
                                name="f_name"
                                value={donorDetails.f_name}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '130px' }}
                                label="טלפון"
                                variant="outlined"
                                name="phone"
                                value={donorDetails.phone}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '210px' }}
                                label="כתובת מייל"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={donorDetails.email}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '190px' }}
                                label="כתובת"
                                variant="outlined"
                                name="address"
                                value={donorDetails.address}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <TextField
                                style={{ width: '150px' }}
                                label="גובה תרומה מינימלי"
                                variant="outlined"
                                name="minDonationAmount"
                                value={minDonationAmount}
                                onChange={handleChange}
                                size="small"
                                margin="dense"
                            />
                            <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon sx={{ marginLeft: 1 }} />}>
                                חפש
                            </Button>
                        </Box>
                        {<p>{commentArea}</p>}
                    </form>
        </>
    );
};

export default DonorSearch;