import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import DonorDisplay from './DonorDisplay';

const DonorsDisplay = ({ donorsToDisplay, setDonorsToDisplay, queryString, rowsPerPage }) => {
    const [page, setPage] = useState(0);
    const [moreDonors, setMoreDonors] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreDonors.length > 0) {
            setDonorsToDisplay((prevData) => [...prevData, ...moreDonors]);
            setDisabledShowMore(moreDonors.length < rowsPerPage);
        }
    }, [moreDonors]);

    useEffect(() => {
        if (page !== 0) {
            setDisabledShowMore((page * rowsPerPage + rowsPerPage) > donorsToDisplay.length);
        }
    }, [page, donorsToDisplay]);

    const handleFetchData = async () => {
        const queryConditions = `${queryString}&page=${page + 2}&sortby=${sortKey}`;
        await getRequest("donors", queryConditions, setMoreDonors, setCommentArea, "תורם");
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if (donorsToDisplay.length === (page + 1) * rowsPerPage) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = (e) => {
        setSortKey(e.target.value);
        setPage(0);
        getRequest("donors", `${queryString}&page=${1}&sortby=${e.target.value}`, setDonorsToDisplay, setCommentArea, "תורם");
    };

    return (
        <>
            {donorsToDisplay.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תורם</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם משפחה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם פרטי</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת מייל</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>טלפון</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>מיון לפי</InputLabel>
                                        <Select
                                            value={sortKey}
                                            onChange={handleChangeSortKey}
                                            label="מיון לפי"
                                        >
                                            <MenuItem value="id">מספר תורם</MenuItem>
                                            <MenuItem value="f_name">שם פרטי</MenuItem>
                                            <MenuItem value="l_name">שם משפחה</MenuItem>
                                            <MenuItem value="email">כתובת מייל</MenuItem>
                                            <MenuItem value="address">כתובת</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donorsToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donor, index) => (
                                <DonorDisplay key={index} donor={donor} index={index} setDonorsToDisplay={setDonorsToDisplay} />
                            ))}
                        </TableBody>
                    </Table>
                    {donorsToDisplay.length >= rowsPerPage &&
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                            <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                            <p>{`${page * rowsPerPage + 1}-${(page * rowsPerPage + rowsPerPage) <= donorsToDisplay.length ? (page * rowsPerPage + rowsPerPage) : (page * rowsPerPage + moreDonors.length)} מתוך ${donorsToDisplay.length}`}</p>
                        </div>}
                </TableContainer>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default DonorsDisplay;
