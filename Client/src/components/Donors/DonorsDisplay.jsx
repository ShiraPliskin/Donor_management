import { React, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DonorDisplay from './DonorDisplay';

const DonorsDisplay = ({ donorsToDisplay, setDonorsToDisplay }) => {

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
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donorsToDisplay.map((donor, index) => (
                                <DonorDisplay donor={donor} index={index} setDonorsToDisplay={setDonorsToDisplay}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default DonorsDisplay;
