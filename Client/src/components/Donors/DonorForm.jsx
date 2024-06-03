import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, createTheme, ThemeProvider, Grid, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';

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

const DonorForm = ({ donorDetails, setDonorDetails, addDonor, open, handleClose }) => {

    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setCommentArea("");
    }, [open]);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isValidNumber = (inputString) => {
        const regex = /^[-0-9]+$/;
        return regex.test(inputString);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ["f_name", "l_name", "address", "introduction_description"];
        for (const field of requiredFields) {
            if (!donorDetails[field]) {
                setCommentArea("נא מלא את כל שדות החובה המסומנים ב - *");
                return;
            }
        }
        if (donorDetails["email"] && !isValidEmail(donorDetails["email"])) {
            setCommentArea("כתובת המייל אינה תקינה.");
            return;
        }
        if (donorDetails["phone"] && !isValidNumber(donorDetails["phone"])) {
            setCommentArea("מספר הטלפון אינו תקין.");
            return;
        }
        addDonor();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>הוספת תורם</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        size="small"
                                        margin="dense"
                                        name="l_name"
                                        label="שם משפחה"
                                        type="text"
                                        fullWidth
                                        required
                                        value={donorDetails.l_name || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        size="small"
                                        margin="dense"
                                        name="f_name"
                                        label="שם פרטי"
                                        type="text"
                                        fullWidth
                                        required
                                        value={donorDetails.f_name || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                size="small"
                                margin="dense"
                                name="phone"
                                label="טלפון"
                                type="text"
                                fullWidth
                                value={donorDetails.phone || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="email"
                                label="כתובת מייל"
                                type="email"
                                fullWidth
                                value={donorDetails.email || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="address"
                                label="כתובת"
                                type="text"
                                fullWidth
                                required
                                value={donorDetails.address || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="spouse_name"
                                label="שם בן הזוג"
                                type="text"
                                fullWidth
                                value={donorDetails.spouse_name || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="num_of_children"
                                label="מספר ילדים"
                                type="number"
                                fullWidth
                                value={donorDetails.num_of_children || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PeopleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="address_at_work"
                                label="כתובת בעבודה"
                                type="text"
                                fullWidth
                                value={donorDetails.address_at_work || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WorkIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="introduction_description"
                                label="תיאור הכרות"
                                type="text"
                                fullWidth
                                required
                                value={donorDetails.introduction_description || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                size="small"
                                margin="dense"
                                name="remarks"
                                label="הערות"
                                type="text"
                                fullWidth
                                value={donorDetails.remarks || ""}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <NoteIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {commentArea}
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