import { useState, React, useEffect } from "react";
import { Button, Dialog, DialogContent, Grid, TextField, InputAdornment, IconButton, DialogActions, DialogTitle} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { checkValidation } from '../Tools/Validation'

const UserUpdatePassword = ({open, handleClose, id}) => {
    // const [open, setOpen] = useState(true);
    // const [commentArea, setCommentArea] = useState("");
    const [isPwVerified, setIsPwVerified] = useState(false);

    const passwordObject = {
        password: '',
        verifyPW: '',
    }
    const errorObject = {
        password: false,
        verifyPW: false,
    }
    const [passwords, setPasswords] = useState(passwordObject);
    const [showPasswords, setShowPasswords] = useState(errorObject);
    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(passwordObject);

    useEffect(() => {
        setError(errorObject);
        setHelperText(passwordObject);
    }, [open]);

    useEffect(() => {
        setIsPwVerified(passwords.password !== "" && passwords.password === passwords.verifyPW);
    }, [passwords.password, passwords.verifyPW]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["password", "verifyPW"];
        const isValid = checkValidation(passwords, setError, setHelperText, requiredFields);
        if (!isValid)
            return
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setOpen(false);
                }
            }}
            disableEscapeKeyDown
            maxWidth="lg"
        >
            <DialogTitle>שינוי סיסמא</DialogTitle>
            <DialogContent>
                <Grid item xs={12} sm={12}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            required
                            name="password"
                            label="סיסמה חדשה"
                            variant="outlined"
                            size="small"
                            type={showPasswords.password ? 'text' : 'password'}
                            value={passwords.password || ""}
                            margin="dense"
                            error={error.password}
                            helperText={helperText.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => { setShowPasswords((prevData) => ({ ...prevData, password: !prevData.password })) }}
                                            edge="start"
                                        >
                                            {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            name="verifyPW"
                            label="אימות סיסמה"
                            variant="outlined"
                            size="small"
                            type={showPasswords.verifyPW ? 'text' : 'password'}
                            error={error.verifyPW}
                            helperText={helperText.verifyPW}
                            required
                            value={passwords.verifyPW || ""}
                            margin="dense"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => { setShowPasswords((prevData) => ({ ...prevData, verifyPW: !prevData.verifyPW })) }}
                                            edge="start"
                                        >
                                            {showPasswords.verifyPW ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ביטול</Button>
                <Button disabled={!isPwVerified} onClick={handleSubmit} sx={{ marginRight: 2 }}>שמירה</Button>
            </DialogActions>
        </Dialog>

    );
};

export default UserUpdatePassword;
