import { React } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

import ContactDisplay from './ContactDisplay';

const ContactsDisplay = ({ contactsToDisplay, setContactsToDisplay }) => {

    return (
        <>
            {contactsToDisplay.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                <ContactDisplay contact={contact} index={index} setContactsToDisplay={setContactsToDisplay} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default ContactsDisplay;
