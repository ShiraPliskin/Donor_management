import React, { useState } from "react";
import { Dialog, DialogContent, Grid, Button, DialogTitle, Box } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Donors from "../Donors/Donors";

const GiftDelivery = ({ gift }) => {
    const [openDeliveryForm, setOpenDeliveryForm] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [selectedDonorId, setSelectedDonorId] = useState([]);
    
    const handleOpen = () => {
        setOpenDeliveryForm(true);
    }

    const handleClose = () => {
        setOpenDeliveryForm(false);
        setSelectedDonorId([]);
    }

    const handleContinue = () => {
        if(gift.amount < selectedDonorId.length){
            setWarningOpen(true);
        }
        else{

        }
    }

    return (
        <>
        <Grid item xs={12} sm={12}>
            <Button variant="contained" onClick={handleOpen} fullWidth endIcon={<LocalShippingIcon sx={{ marginRight: 2 }}/>}>
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
                <DialogTitle sx={{ bgcolor: 'lightblue' }}>בחירת תורמים עבור מסירת מתנה: {gift.description}</DialogTitle>
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
                open={warningOpen}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setWarningOpen(false);
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
                        <Button onClick={() => { setWarningOpen(false) }}>הבנתי</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GiftDelivery;