import { React } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

import GiftDisplay from './GiftDisplay';

const GiftsDisplay = ({ giftsToDisplay, setGiftsToDisplay }) => {

    return (
        <>
            {giftsToDisplay.length > 0 && (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' מתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תיאור המתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תמונה</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donorsToDisplay.map((gift, index) => (
                                <GiftDisplay gift={gift} index={index} setGiftsToDisplay={setGiftsToDisplay} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default GiftsDisplay;
