import React, { useState } from "react";
import { Dialog, DialogContent, Grid, Button, DialogTitle, Box, TextField, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import dayjs from 'dayjs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Donors from "../Donors/Donors";
import { postRequest } from "../Tools/APIRequests";
import GenericMessage from "../Tools/GenericSuccessMessage";

const GiftDelivery = ({ gift }) => {
    const [openDeliveryForm, setOpenDeliveryForm] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [openDateSelection, setOpenDateSelection] = useState(false);

    const [selectedDonorId, setSelectedDonorId] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isSucceed, setIsSucceed] = useState('');

    const handleOpen = () => {
        setOpenDeliveryForm(true);
    }

    const handleClose = () => {
        setOpenDeliveryForm(false);
        setSelectedDonorId([]);
    }

    const handleContinue = () => {
        if (gift.amount < selectedDonorId.length) {
            setOpenWarning(true);
            return;
        }
        setOpenDateSelection(true);
    }

    const handleDateChanged = (e) => {
        setSelectedDate(e.target.value);
    }

    const handleSave = () => {
            setIsSucceed("");
            const newDelivery = {donor_id: selectedDonorId, gift_id: gift.id, date: selectedDate};
            postRequest("giftsDelivery", newDelivery, setIsSucceed);
            setOpenDateSelection();
            handleClose();
    }

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={handleOpen} fullWidth startIcon={<LocalShippingIcon sx={{ marginLeft: 1.5 }} />}>
                    מסירת מתנה
                </Button>
            </Grid>
            <Dialog
                open={openDeliveryForm}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                maxWidth="lg"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', fontWeight: 'bold', marginBottom: '5px' }}>בחר תורמים עבור מסירת: "{gift.description}"
                    <Typography sx={{ fontSize: '1.2rem' }}>
                        {selectedDonorId.length} תורמים נבחרו
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Donors
                        type="gifts"
                        selectedDonorId={selectedDonorId}
                        setSelectedDonorId={setSelectedDonorId}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleClose}>ביטול</Button>
                        <Button disabled={selectedDonorId.length === 0} onClick={handleContinue} sx={{ marginRight: 2 }}>המשך</Button>
                    </Box>
                </DialogContent>
            </Dialog>
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
                    אין מספיק מתנות במלאי עבור מספר התורמים שנבחרו.
                </DialogTitle>
                <DialogContent sx={{ marginTop: '20px' }}>
                    נבחרו {selectedDonorId.length} תורמים, אך יש רק {gift.amount} מתנות מסוג: "{gift.description}" במלאי.
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={() => { setOpenWarning(false) }}>הבנתי</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openDateSelection}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setOpenDateSelection(false);
                    }
                }}
                disableEscapeKeyDown
                maxWidth="sm"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue' }}>בחר תאריך עבור מסירת: "{gift.description}"</DialogTitle>
                <DialogContent sx={{ marginTop: '20px' }}>
                    <TextField
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDateChanged}
                        value={dayjs(selectedDate).format('YYYY-MM-DD')}
                        type="date"
                        size="small"
                        margin="dense"
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={() => { setOpenDateSelection(false) }} startIcon={<NavigateNextIcon sx={{ marginLeft: 1 }} />}>חזרה לבחירת תורמים</Button>
                        <Button onClick={handleSave}>שמירה</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {isSucceed === "success" && <GenericMessage message={`מסירת "${gift.description}" עודכנה בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message={`עדכון מסירת "${gift.description}" נכשל`} type="error" />}
        </>
    );
};

export default GiftDelivery;