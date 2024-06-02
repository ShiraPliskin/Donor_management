import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, createTheme,ThemeProvider } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        textAlign: "right",
                    },
                },
            },
        },
    },
});

const DonorForm = ({ donorDetails, handleChange, handleSubmit, open, handleClose }) => {


    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>הוספת תורם</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="f_name"
                                label="שם פרטי"
                                type="text"
                                fullWidth
                                value={donorDetails.f_name || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="l_name"
                                label="שם משפחה"
                                type="text"
                                fullWidth
                                value={donorDetails.l_name || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="phone"
                                label="טלפון"
                                type="text"
                                fullWidth
                                value={donorDetails.phone || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="email"
                                label="כתובת מייל"
                                type="email"
                                fullWidth
                                value={donorDetails.email || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="address"
                                label="כתובת"
                                type="text"
                                fullWidth
                                value={donorDetails.address || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="num_of_children"
                                label="מספר ילדים"
                                type="number"
                                fullWidth
                                value={donorDetails.num_of_children || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="spouse_name"
                                label="שם בן הזוג"
                                type="text"
                                fullWidth
                                value={donorDetails.spouse_name || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="address_at_work"
                                label="כתובת בעבודה"
                                type="text"
                                fullWidth
                                value={donorDetails.address_at_work || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="introduction_description"
                                label="תיאור הכרות"
                                type="text"
                                fullWidth
                                value={donorDetails.introduction_description || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                name="remarks"
                                label="הערות"
                                type="text"
                                fullWidth
                                value={donorDetails.remarks || ""}
                                onChange={handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">ביטול</Button>
                        <Button onClick={handleSubmit} color="primary">הוסף</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    );
};

export default DonorForm;