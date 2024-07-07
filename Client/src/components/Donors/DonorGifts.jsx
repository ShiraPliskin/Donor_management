import { useState, useEffect } from "react";
import { Button, Grid, Dialog, DialogContent, DialogTitle, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import RedeemIcon from '@mui/icons-material/Redeem';
import { getManyItemsByIdRequest } from "../Tools/APIRequests";
import dayjs from 'dayjs';

const DonorGifts = ({ donorDetails }) => {
    const [openGifts, setOpenGifts] = useState(null);
    const [openWarning, setOpenWarning] = useState(false);
    const [donorGifts, setDonorGifts] = useState([]);
    const [commentArea, setCommentArea] = useState(null);

    useEffect(() => {
        if (donorGifts.length !== 0) {
            handleOpen();
        }
        else if (commentArea === "לא נמצא") {
            setOpenWarning(true);
        }
    }, [donorGifts, commentArea]);

    const handleOpen = () => {
        setOpenGifts(true);
    };

    const handleClose = () => {
        setOpenGifts(false);
    };

    const getDonorGifts = async () => {
        setCommentArea("");
        await getManyItemsByIdRequest("giftsDelivery/donor", donorDetails.id, setDonorGifts, setCommentArea)
    }

    return (<>
        <Grid item xs={12} sm={6}>
            <Button
                fullWidth
                variant="contained"
                color="info"
                style={{ height: '40px' }}
                startIcon={<RedeemIcon sx={{ marginLeft: 1.5 }} />}
                onClick={getDonorGifts}
            >הצג מתנות שקיבל התורם
            </Button>
        </Grid>
        {openGifts && (<>
            <Dialog
                open={openGifts}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                maxWidth="sm"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', marginBottom: '5px' }}>מתנות שקיבל {donorDetails.f_name} {donorDetails.l_name} ({donorGifts.length})</DialogTitle>
                <TableContainer sx={{ marginTop: 5 }}>
                    <Table sx={{ minWidth: 200 }} size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תיאור המתנה</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תאריך מסירה</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donorGifts.map((gift, index) => (
                                <TableRow sx={{ height: '40px' }} key={index}>
                                    <TableCell sx={{ textAlign: 'center' }}>{gift.description}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{dayjs(gift.date).format('YYYY-MM-DD')}</TableCell>
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
                עדיין לא נמסרו מתנות לתורם זה
            </DialogTitle>
            <DialogContent sx={{ marginTop: '20px' }}>
                על מנת למסור מתנה לתורם זה, לחץ על "מסירת מתנה" במתנה הרצויה.
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button onClick={() => { setOpenWarning(false) }}>סגור</Button>
                </Box>
            </DialogContent>
        </Dialog>
    </>)
}
export default DonorGifts;
