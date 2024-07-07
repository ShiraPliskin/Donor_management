import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import DonationDisplay from './DonationDisplay';

const DonationsDisplay = ({ donationsToDisplay, setDonationsToDisplay, queryString, rowsPerPage, totalDonationsCount, setTotalDonationsCount }) => {
    const [page, setPage] = useState(0);
    const [moreDonations, setMoreDonations] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreDonations.length > 0) {
            setDonationsToDisplay((prevData) => [...prevData, ...moreDonations]);
            setDisabledShowMore((page + 1) * rowsPerPage >= totalDonationsCount);
        }
    }, [moreDonations]);

    useEffect(() => {
        setDisabledShowMore((page + 1) * rowsPerPage >= totalDonationsCount);
    }, [page, totalDonationsCount]);

    const handleFetchData = async () => {
        const queryConditions = `?_limit=${rowsPerPage}${queryString}&page=${page + 2}&sortby=${sortKey}`;
        const total = await getRequest("donations", queryConditions, setMoreDonations, setCommentArea, "תורם");
        setTotalDonationsCount(total);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if ((page + 1) * rowsPerPage === donationsToDisplay.length) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = async (e) => {
        setSortKey(e.target.value);
        setPage(0);
        const total = await getRequest("donations", `?_limit=${rowsPerPage}${queryString}&page=${1}&sortby=${e.target.value}`, setDonationsToDisplay, setCommentArea, "תורם")
        setTotalDonationsCount(total);
    };

    return (
        <>
            {donationsToDisplay.length > 0 && (
                <Box sx={{ minWidth: 650 }} maxWidth={"xl"} >
                    <FormControl sx={{ marginTop: 2, marginLeft: 2, textAlign: 'right' }}>
                        <InputLabel>מיין לפי</InputLabel>
                        <Select
                            value={sortKey}
                            onChange={handleChangeSortKey}
                            label="מיין לפי"
                            sx={{ height: 40, minWidth: 150 }}
                        >
                            <MenuItem value="id">מס' תרומה</MenuItem>
                            <MenuItem value="donor_id">מס' תורם</MenuItem>
                            <MenuItem value="amount">סכום התרומה</MenuItem>
                            <MenuItem value="payment_method">שיטת התשלום</MenuItem>
                            <MenuItem value="date">תאריך התרומה</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                        <Table sx={{ minWidth: 650 }} size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תרומה</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תורם</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>סכום התרומה</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שיטת התשלום</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תאריך התרומה</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {donationsToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donation, index) => (
                                    <DonationDisplay key={index} donation={donation} index={index} setDonationsToDisplay={setDonationsToDisplay} setTotal={setTotalDonationsCount} />
                                ))}
                            </TableBody>
                        </Table>
                        {donationsToDisplay.length >= rowsPerPage &&
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                                <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                            </div>}
                            <p>{`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage <= totalDonationsCount ? (page + 1) * rowsPerPage : totalDonationsCount} מתוך ${totalDonationsCount}`}</p>
                    </TableContainer>
                </Box>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default DonationsDisplay;
