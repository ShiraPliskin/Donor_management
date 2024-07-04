import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, IconButton, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, Typography, Box, Button } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DonorDisplay from './DonorDisplay';

const DonorsDisplay = ({ donorsToDisplay, setDonorsToDisplay, queryString, rowsPerPage, totalDonorsCount, setTotalDonorsCount, selectedDonorId, setSelectedDonorId, type }) => {
    const [page, setPage] = useState(0);
    const [moreDonors, setMoreDonors] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreDonors.length > 0) {
            setDonorsToDisplay((prevData) => [...prevData, ...moreDonors]);
            setDisabledShowMore((page + 1) * rowsPerPage >= totalDonorsCount);
        }
    }, [moreDonors]);

    useEffect(() => {
        setDisabledShowMore((page + 1) * rowsPerPage >= totalDonorsCount);
    }, [page, totalDonorsCount]);

    const selectAllDonors = () => {
        setSelectedDonorId(donorsToDisplay.map(donor => donor.id));
    }

    const clearAllDonors = () => {
        setSelectedDonorId([]);
    }

    const handleFetchData = async () => {
        const queryConditions = `${queryString}&page=${page + 2}&sortby=${sortKey}`;
        const total = await getRequest("donors", queryConditions, setMoreDonors, setCommentArea, "תורם");
        setTotalDonorsCount(total);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if ((page + 1) * rowsPerPage === donorsToDisplay.length) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = async (e) => {
        setSortKey(e.target.value);
        setPage(0);
        const total = await getRequest("donors", `${queryString}&page=${1}&sortby=${e.target.value}`, setDonorsToDisplay, setCommentArea, "תורם")
        setTotalDonorsCount(total);
    };

    return (
        <>
            {donorsToDisplay.length > 0 && (
                <Box sx={{ minWidth: 650 }} maxWidth={"xl"}>
                    <FormControl sx={{ marginTop: 2, marginLeft: 2, textAlign: 'right' }}>
                        <InputLabel>מיין לפי</InputLabel>
                        <Select
                            value={sortKey}
                            onChange={handleChangeSortKey}
                            label="מיין לפי"
                            sx={{ height: 40, minWidth: 150 }}
                        >
                            <MenuItem value="id">מספר תורם</MenuItem>
                            <MenuItem value="f_name">שם פרטי</MenuItem>
                            <MenuItem value="l_name">שם משפחה</MenuItem>
                            <MenuItem value="email">כתובת מייל</MenuItem>
                            <MenuItem value="address">כתובת</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table sx={{ minWidth: 650 }} size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תורם</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם משפחה</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם פרטי</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת מייל</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>טלפון</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {type === "gifts" &&
                                            <Box>
                                                <Button onClick={selectAllDonors} variant="contained" endIcon={<TouchAppIcon sx={{ marginRight: 0.5, marginLeft: -1 }} />} sx={{ mt: 2 }}>
                                                    בחר הכל
                                                </Button>
                                                <IconButton style={{ marginTop: 15 }} disabled={selectedDonorId.length === 0} onClick={clearAllDonors}>
                                                    <HighlightOffIcon style={{ fontSize: 35 }}/>
                                                </IconButton>
                                            </Box>}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {donorsToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donor, index) => (
                                    <DonorDisplay
                                        key={index}
                                        donor={donor}
                                        index={index}
                                        setDonorsToDisplay={setDonorsToDisplay}
                                        setTotal={setTotalDonorsCount}
                                        selectedDonorId={selectedDonorId}
                                        setSelectedDonorId={setSelectedDonorId}
                                        type={type}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        {donorsToDisplay.length >= rowsPerPage &&
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                                <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                                <p>{`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage <= totalDonorsCount ? (page + 1) * rowsPerPage : totalDonorsCount} מתוך ${totalDonorsCount}`}</p>
                            </div>}
                    </TableContainer>
                </Box>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default DonorsDisplay;
