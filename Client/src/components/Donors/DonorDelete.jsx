import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography, Box, IconButton, DialogTitle } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { deleteRequest } from "../Tools/APIRequests";
import GenericMessage from "../Tools/GenericSuccessMessage";

const DonorDelete = ({ id, warningOpen, setWarningOpen, closeForm }) => {

    const [isSucceed, setIsSucceed] = useState('');
    const [isChecked, setIsChecked] = useState('');

    const deleteDonorRequest = () => {
        setIsSucceed("");
        deleteRequest("donors", id, setIsSucceed);
        setWarningOpen(false)
        closeForm();
    };

    const handleClickAgree = () => {
        setIsChecked(prev => !prev);
    }

    return (
        <>
            <Dialog
                open={warningOpen}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setWarningOpen(false);
                    }
                }}
                disableEscapeKeyDown
                maxWidth="lg"
            >
                <DialogTitle sx={{ bgcolor: 'error.main', color: 'white' }}>
                    האם אתה בטוח שברצונך למחוק את תורם מספר {id}?
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        מחיקת התורם תגרום למחיקת כל הפרטים שלו, ואינה ניתנת לשיחזור
                        <IconButton onClick={handleClickAgree}>
                            <Checkbox
                                checked={isChecked}
                                checkedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>}
                                inputProps={{ 'aria-label': 'Checkbox' }}
                            />
                        </IconButton>
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button disabled={!isChecked} onClick={deleteDonorRequest} sx={{ marginRight: 2 }}>מחיקה</Button>
                        <Button onClick={() => { setWarningOpen(false) }}>ביטול</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {isSucceed == "success" && <GenericMessage message={`תורם מספר ${id} נמחק בהצלחה`} type="success"/>}
            {isSucceed == "error" && <GenericMessage message="מחיקת תורם נכשלה" type="error"/>}
        </>
    );
};

export default DonorDelete;