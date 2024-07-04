import { useState, useEffect } from "react";
import { Button, Grid, Dialog, DialogContent, DialogTitle, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getRequest } from "../Tools/APIRequests";
import dayjs from 'dayjs';

const DonorDonations = ({ donorDetails }) => {
    const [openDonations, setOpenDonations] = useState(null);
    const [donorDonations, setDonorDonations] = useState([]);
    const [commentArea, setCommentArea] = useState(null);
    const [totalDonation, setTotalDonation] = useState(null);

    useEffect(() => {
        if (donorDonations.length !== 0) {
            let total = 0;
            donorDonations.forEach(donation => {
                total += Number(donation.amount);
            });
            setTotalDonation(total);
        }
    }, [donorDonations]);

    useEffect(() => {
        if (totalDonation) {
            handleOpen();
        }
    }, [totalDonation]);

    const handleOpen = () => {
        setOpenDonations(true);
    };

    const handleClose = () => {
        setOpenDonations(false);
    };

    const getDonorDonations = async () => {
        const columnsToDisplay = "amount, date";
        const queryConditions = `?fields=${columnsToDisplay}&filter=donor_id=${donorDetails.id}`;
        await getRequest("donations", queryConditions, setDonorDonations, setCommentArea);
    }

    return (<>
        <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                color="info"
                style={{ height: '40px' }}
                startIcon={<AttachMoneyIcon sx={{ marginLeft: 1.5 }} />}
                onClick={getDonorDonations}
            >הצג תרומות שתרם התורם
            </Button>
        </Grid>
        {openDonations && (<>
            <Dialog
                open={openDonations}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                maxWidth="sm"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', marginBottom: '5px' }}>תרומות של {donorDetails.f_name} {donorDetails.l_name} ({donorDonations.length})</DialogTitle>
                <TableContainer sx={{ marginTop: 5 }}>
                    <Table sx={{ minWidth: 200 }} size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>גובה התרומה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תאריך התרומה</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donorDonations.map((donation, index) => (
                                <TableRow sx={{ height: '40px' }} key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{donation.amount}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{dayjs(donation.date).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    סה"כ סכום התרומות: {totalDonation}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleClose}>סגור</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {commentArea}
        </>
        )}
    </>)
}
export default DonorDonations;
