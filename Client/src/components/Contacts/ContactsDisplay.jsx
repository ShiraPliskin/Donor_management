import { React, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import ContactDisplay from './ContactDisplay';

const ContactsDisplay = ({ contactsToDisplay, setContactsToDisplay, selectedContactId, setSelectedContactId, type}) => {

    return (
        <>
            {contactsToDisplay.length > 0 && (<>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    padding: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
                    maxWidth='955px'
                >
                    <TableContainer component={Paper} sx={{ width: '100%', height: '100%' }}>
                        <Table sx={{ width: '100%', height: '100%' }} aria-label="simple table">
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
                                {contactsToDisplay.map((contact, index) => (
                                    <ContactDisplay
                                        contact={contact}
                                        index={index}
                                        key={index}
                                        selectedContactId={selectedContactId}
                                        setSelectedContactId={setSelectedContactId}
                                        type={type}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                </>
            )}
        </>
    );
};

export default ContactsDisplay;
