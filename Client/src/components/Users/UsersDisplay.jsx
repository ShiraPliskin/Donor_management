import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import UserDisplay from './UserDisplay';

const UsersDisplay = ({ usersToDisplay, setUsersToDisplay, queryString, rowsPerPage, totalCount, setTotalCount }) => {
    const [page, setPage] = useState(0);
    const [moreUsers, setMoreUsers] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreUsers.length > 0) {
            setUsersToDisplay((prevData) => [...prevData, ...moreUsers]);
            setDisabledShowMore((page + 1) * rowsPerPage >= totalCount);
        }
    }, [moreUsers]);

    useEffect(() => {
        setDisabledShowMore((page + 1) * rowsPerPage >= totalCount);
    }, [page, totalCount]);

    const handleFetchData = async () => {
        const queryConditions = `${queryString}&page=${page + 2}&sortby=${sortKey}`;
        const total = await getRequest("users", queryConditions, setMoreUsers, setCommentArea, "משתמש");
        setTotalCount(total);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if ((page + 1) * rowsPerPage === usersToDisplay.length) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = async (e) => {
        setSortKey(e.target.value);
        setPage(0);
        const total = await getRequest("users", `${queryString}&page=${1}&sortby=${e.target.value}`, setUsersToDisplay, setCommentArea, "משתמש")
        setTotalCount(total);
    };

    return (
        <>
            {usersToDisplay.length > 0 && (
                <Box sx={{ minWidth: 650 }} maxWidth={"xl"} >
                    <FormControl sx={{ marginTop: 2, marginLeft: 2, textAlign: 'right' }}>
                        <InputLabel>מיין לפי</InputLabel>
                        <Select
                            value={sortKey}
                            onChange={handleChangeSortKey}
                            label="מיין לפי"
                            sx={{ height: 40, minWidth: 150 }}
                        >
                            <MenuItem value="id">מספר משתמש</MenuItem>
                            <MenuItem value="name">שם</MenuItem>
                            <MenuItem value="email">כתובת מייל</MenuItem>
                            <MenuItem value="permission">הרשאה</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' משתמש</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת מייל</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>הרשאה</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                                    <UserDisplay key={index} user={user} index={index} setUsersToDisplay={setUsersToDisplay} setTotal={setTotalCount} />
                                ))}
                            </TableBody>
                        </Table>
                        {usersToDisplay.length >= rowsPerPage &&
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                                <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                                <p>{`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage <= totalCount ? (page + 1) * rowsPerPage : totalCount} מתוך ${totalCount}`}</p>
                            </div>}
                    </TableContainer>
                </Box>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default UsersDisplay;
