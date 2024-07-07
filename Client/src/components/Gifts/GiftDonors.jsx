import { useState, useEffect } from "react";
import { Button, Grid, Dialog, DialogContent, DialogTitle, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { getManyItemsByIdRequest } from "../Tools/APIRequests";
import dayjs from 'dayjs';

const GiftDonors = ({ giftDetails }) => {
    const [openDonors, setOpenDonors] = useState(null);
    const [openWarning, setOpenWarning] = useState(false);
    const [giftDonors, setGiftDonors] = useState([]);
    const [commentArea, setCommentArea] = useState(null);

    useEffect(() => {
        if (giftDonors.length !== 0) {
            handleOpen();
        }
        else if (commentArea === "לא נמצא") {
            setOpenWarning(true);
        }
    }, [giftDonors, commentArea]);

    const handleOpen = () => {
        setOpenDonors(true);
    };

    const handleClose = () => {
        setOpenDonors(false);
    };

    const getGiftDonors = async () => {
        setCommentArea("")
        await getManyItemsByIdRequest("giftsDelivery/gift", giftDetails.id, setGiftDonors, setCommentArea);
    }

    return (<>
        <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                color="info"
                style={{ height: '40px' }}
                startIcon={<PersonIcon sx={{ marginLeft: 1.5 }} />}
                onClick={getGiftDonors}
            >הצג תורמים שקיבלו מתנה זו
            </Button>
        </Grid>
        {openDonors && (<>
            <Dialog
                open={openDonors}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                maxWidth="md"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', marginBottom: '5px' }}>תורמים שקיבלו {giftDetails.description} ({giftDonors.length})</DialogTitle>
                <TableContainer sx={{ marginTop: 5 }}>
                    <Table sx={{ minWidth: 200 }} size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מס' תורם</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם התורם</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תאריך מסירה</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {giftDonors.map((donor, index) => (
                                <TableRow sx={{ height: '40px' }} key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{donor.id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{donor.l_name} {donor.f_name}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{dayjs(donor.date).format('YYYY-MM-DD')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
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
        <Dialog
            open={openWarning}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setOpenWarning(false);
                }
            }}
            disableEscapeKeyDown
            maxWidth="sm"
        >
            <DialogTitle sx={{ bgcolor: 'warning.main', color: 'black' }}>
                לא נמצאו תורמים שקיבלו מתנה זו
            </DialogTitle>
            <DialogContent sx={{ marginTop: '20px' }}>
                על מנת למסור מתנה זו לתורמים, לחץ על "מסירת מתנה"
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button onClick={() => { setOpenWarning(false) }}>סגור</Button>
                </Box>
            </DialogContent>
        </Dialog>
    </>)
}
export default GiftDonors;
