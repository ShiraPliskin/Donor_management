import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography, Box, IconButton, DialogTitle } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { deleteRequest } from "./APIRequests";
import GenericMessage from "./GenericSuccessMessage";

const GenericDeletion = ({ id, warningOpen, setWarningOpen, table, objectName, objectState, formOpen, setTotal }) => {

    const [isSucceed, setIsSucceed] = useState('');
    const [isChecked, setIsChecked] = useState('');

    useEffect(() => {
        if (isSucceed === "success") {
            objectState((prev) => {
                return prev.filter(obj => obj.id !== id);
            });
            setTotal((prev) => prev-1 );
            setWarningOpen(false);
            formOpen(false);
        }
    }, [isSucceed]);

    const deleteObject = () => {
        setIsSucceed("");
        deleteRequest(table, id, setIsSucceed);
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
                    האם אתה בטוח שברצונך למחוק את {objectName} מספר {id}?
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        מחיקת ה{objectName} תגרום למחיקת כל הפרטים שלו, ואינה ניתנת לשיחזור
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
                        <Button disabled={!isChecked} onClick={deleteObject} sx={{ marginRight: 2 }}>מחיקה</Button>
                        <Button onClick={() => { setWarningOpen(false) }}>ביטול</Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {isSucceed === "success" && <GenericMessage message={`${objectName} מספר ${id} נמחק בהצלחה`} type="success"/>}
            {isSucceed === "error" && <GenericMessage message={`מחיקת ${objectName} נכשלה`} type="error" />}
        </>
    );
};

export default GenericDeletion;
