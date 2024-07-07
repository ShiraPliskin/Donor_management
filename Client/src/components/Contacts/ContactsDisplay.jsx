import React, { useState, useEffect } from 'react';
import { Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import ContactDisplay from './ContactDisplay';

const ContactsDisplay = ({ fields, contactsToDisplay, setContactsToDisplay, selectedContactId, setSelectedContactId, type, queryString, rowsPerPage, totalCount, setTotalCount }) => {

    const [page, setPage] = useState(0);
    const [moreContacts, setMoreContacts] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [disabledShowMore, setDisabledShowMore] = useState(false);
    const [sortKey, setSortKey] = useState("id");

    useEffect(() => {
        if (moreContacts.length > 0) {
            setContactsToDisplay((prevData) => [...prevData, ...moreContacts]);
            setDisabledShowMore(moreContacts.length >= totalCount);
        }
    }, [moreContacts]);

    useEffect(() => {
        setDisabledShowMore((page + 1) * rowsPerPage >= totalCount);
    }, [page, totalCount]);

    const handleFetchData = async () => {
        const queryConditions = `?_limit=${rowsPerPage}${queryString}&page=${page + 2}&sortby=${sortKey}`;
        const total = await getRequest("contacts", queryConditions, setMoreContacts, setCommentArea, "איש קשר");
        setTotalCount(total);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        setDisabledShowMore(false);
    };

    const handleNextPage = async () => {
        if ((page + 1) * rowsPerPage === contactsToDisplay.length) {
            await handleFetchData();
        }
        setPage((prevPage) => prevPage + 1);
    };

    const handleChangeSortKey = async (e) => {
        setSortKey(e.target.value);
        setPage(0);
        const total = await getRequest("contacts", `?_limit=${rowsPerPage}${queryString}&page=${1}&sortby=${e.target.value}`, setContactsToDisplay, setCommentArea, "איש קשר");
        setTotalCount(total);
    };

    return (
        <>
            {contactsToDisplay.length > 0 && (<>
                <Box sx={{ minWidth: 650 }} maxWidth={type === "contacts" ? "xl" : "lg"} >
                    <FormControl sx={{ marginTop: 2, marginLeft: 2, textAlign: 'right' }}>
                        <InputLabel>מיין לפי</InputLabel>
                        <Select
                            value={sortKey}
                            onChange={handleChangeSortKey}
                            label="מיין לפי"
                            sx={{ height: 40, minWidth: 150 }}
                        >
                            <MenuItem value="id">מספר איש קשר</MenuItem>
                            <MenuItem value="name">שם</MenuItem>
                            <MenuItem value="email">כתובת מייל</MenuItem>
                            <MenuItem value="address">כתובת</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper} sx={{ width: '100%', height: '100%', marginTop: 5 }}>
                        <Table sx={{ width: '100%', height: '100%' }} size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' איש קשר</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת מייל</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>טלפון</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contactsToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact, index) => (
                                    <ContactDisplay
                                        fields={fields}
                                        contact={contact}
                                        index={index}
                                        key={index}
                                        selectedContactId={selectedContactId}
                                        setSelectedContactId={setSelectedContactId}
                                        setContactsToDisplay={setContactsToDisplay}
                                        type={type}
                                        setTotal={setTotalCount}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        {contactsToDisplay.length >= rowsPerPage &&
                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <button onClick={handlePrevPage} disabled={page === 0}>{'<'}</button>
                                <button onClick={handleNextPage} disabled={disabledShowMore}>{'>'}</button>
                            </div>}
                            <p>{`${page * rowsPerPage + 1}-${(page + 1) * rowsPerPage <= totalCount ? (page + 1) * rowsPerPage : totalCount} מתוך ${totalCount}`}</p>
                    </TableContainer>
                </Box>
            </>)}
            <p>{commentArea}</p>
        </>
    );
};

export default ContactsDisplay;
