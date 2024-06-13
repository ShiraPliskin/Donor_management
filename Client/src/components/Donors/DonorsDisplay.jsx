import { React, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

import DonorDisplay from './DonorDisplay';

const DonorsDisplay = ({ donorsToDisplay, setDonorsToDisplay }) => {

    const [displayCount, setDisplayCount] = useState(2); // Start with 10 items

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 2); // Increase the count by 10
    };
    return (
        <>
            {donorsToDisplay.length > 0 && (
                // <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
                //         <TableHead>
                //             <TableRow>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תורם</TableCell>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם משפחה</TableCell>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם פרטי</TableCell>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת מייל</TableCell>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>טלפון</TableCell>
                //                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>כתובת</TableCell>
                //                 <TableCell></TableCell>
                //             </TableRow>
                //         </TableHead>
                //         <TableBody>
                //             {donorsToDisplay.map((donor, index) => (
                //                 <DonorDisplay donor={donor} index={index} setDonorsToDisplay={setDonorsToDisplay} />
                //             ))}
                //         </TableBody>
                //     </Table>
                // </TableContainer>
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
                            {donorsToDisplay.slice(0, displayCount).map((donor, index) => (
                                <DonorDisplay key={index} donor={donor} index={index} setDonorsToDisplay={setDonorsToDisplay} />
                            ))}
                        </TableBody>
                    </Table>
                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2">Showing {Math.min(displayCount, donorsToDisplay.length)} of {donorsToDisplay.length} items</Typography>
                        {displayCount < donorsToDisplay.length && (
                            <Button variant="contained" onClick={handleLoadMore}>Load More</Button>
                        )}
                    </Box>
                </TableContainer>

            )}
        </>
    );
};

export default DonorsDisplay;
