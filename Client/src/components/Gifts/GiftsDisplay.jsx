import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import GiftDisplay from './GiftDisplay';

const GiftsDisplay = ({ giftsToDisplay, setGiftsToDisplay, queryString, rowsPerPage, totalGiftsCount, setTotalGiftsCount }) => {
    const [page, setPage] = useState(0);
    const [moreGifts, setMoreGifts] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreGifts.length > 0) {
            setGiftsToDisplay((prevData) => [...prevData, ...moreGifts]);
            setDisabledShowMore((page + 1) * rowsPerPage >= totalGiftsCount);
        }
    }, [moreGifts]);

    useEffect(() => {
        setDisabledShowMore((page + 1) * rowsPerPage >= totalGiftsCount);
    }, [page, totalGiftsCount]);

    const handleFetchData = async () => {
        const queryConditions = `${queryString}&page=${page + 2}&sortby=${sortKey}`;
        const total = await getRequest("gifts", queryConditions, setMoreGifts, setCommentArea, "מתנה");
        setTotalGiftsCount(total);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if ((page + 1) * rowsPerPage === giftsToDisplay.length) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = async (e) => {
        setSortKey(e.target.value);
        setPage(0);
        const total = await getRequest("gifts", `${queryString}&page=${1}&sortby=${e.target.value}`, setGiftsToDisplay, setCommentArea, "מתנה")
        setTotalGiftsCount(total);
    };

    return (
        <>
           {giftsToDisplay.length > 0 && (
           <Box sx={{ minWidth: 650 }} maxWidth={"xl"} >
                <TableContainer component={Paper} sx={{marginTop: 5 }}>
                    <Table sx={{ minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' מתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תיאור המתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>עלות המתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כמות במלאי</TableCell>
                                <TableCell>
                                    <FormControl fullWidth>
                                        <InputLabel>מיון לפי</InputLabel>
                                        <Select
                                            value={sortKey}
                                            onChange={handleChangeSortKey}
                                            label="מיון לפי"
                                        >
                                            <MenuItem value="id">מספר מתנה</MenuItem>
                                            <MenuItem value="f_name">תיאור</MenuItem>
                                            <MenuItem value="l_name">עלות המתנה</MenuItem>
                                            <MenuItem value="email">כמות במלאי</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {giftsToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((gift, index) => (
                                <GiftDisplay key={index} gift={gift} index={index} setGiftsToDisplay={setGiftsToDisplay} setTotal={setTotalGiftsCount}/>
                            ))}
                        </TableBody>
                    </Table>
                    {giftsToDisplay.length >= rowsPerPage &&
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                            <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                            <p>{`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage <= totalGiftsCount ? (page + 1) * rowsPerPage : totalGiftsCount} מתוך ${totalGiftsCount}`}</p>
                        </div>}
                </TableContainer>
                </Box>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default GiftsDisplay;

