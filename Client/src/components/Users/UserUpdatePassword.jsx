import { useState, React, useEffect } from "react";
import { Button, Dialog, DialogContent, Grid, TextField, InputAdornment, IconButton, DialogActions, DialogTitle } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { checkValidation } from '../Tools/Validation'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

const UserUpdatePassword = ({ open, handleClose, id, useType, formType, addPWSucceed, setAddPWSucceed, setUpdatedUser }) => {

    const passwordObject = {
        currentPassword: '',
        password: '',
        verifyPW: '',
    }
    const errorObject = {
        currentPassword: false,
        password: false,
        verifyPW: false,
    }

    const [errorMessage, setErrorMessage] = useState(null);
    const [isPwVerified, setIsPwVerified] = useState(false);
    const [passwords, setPasswords] = useState(passwordObject);
    const [showPasswords, setShowPasswords] = useState(errorObject);
    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(passwordObject);
    const [updateSuccessful, setUpdateSuccessful] = useState('');

    useEffect(() => {
        setError(errorObject);
        setHelperText(passwordObject);
    }, [open]);

    useEffect(() => {
        setIsPwVerified(IsVerify);
    }, [passwords.password, passwords.verifyPW]);

    useEffect(() => {
        if (errorMessage === '') {
            const passwordObject = { "prevPassword": passwords.currentPassword, "password": passwords.password };
            putRequest("register", passwordObject, id, setUpdateSuccessful);
            handleClose();
        }
        else return;
    }, [errorMessage])

    const checkCurrentPassword = () => {
        const passwordObject = { "password": passwords.currentPassword };
        getByPostRequest(`register/${id}`, passwordObject, setErrorMessage);
    }

    const IsVerify = () => {return passwords.password !== "" && passwords.password === passwords.verifyPW}
    
    const handleEditPassword = () => {
        setAddPWSucceed(false);
        setIsPwVerified(IsVerify);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = useType === "userProfile" ? ["currentPassword", "password", "verifyPW"] : ["password", "verifyPW"];
        const isValid = checkValidation(passwords, setError, setHelperText, requiredFields);
        if (!isValid)
            return
        if (useType === "userProfile") {
            checkCurrentPassword();
        }
        if (formType === "add") {
            setAddPWSucceed(true);
            setUpdatedUser((prev) => ({ ...prev, password: passwords.password }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    };

    return (<>
        {formType === "add" && <>
            <Grid item xs={12} sm={5}>
                <TextField
                    disabled={addPWSucceed}
                    fullWidth
                    requiredshowPasswords
                    name="password"
                    label="סיסמה"
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
            <Grid item xs={12} sm={5}>
                <TextField
                    fullWidth
                    disabled={addPWSucceed}
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
            <Grid item xs={12} sm={2}>
                {addPWSucceed ?
                    <IconButton onClick={handleEditPassword}>
                        <EditIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    :
                    <IconButton disabled={!isPwVerified} onClick={handleSubmit}>
                        <CheckCircleOutlineIcon style={{ fontSize: 40, color: isPwVerified ? 'green' : 'gray' }} />
                    </IconButton>
                }
            </Grid>
        </>}
        {formType === "update" &&
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                maxWidth="lg"
            >
                <DialogTitle>שינוי סיסמא</DialogTitle>
                <DialogContent>
                    {useType === "userProfile" &&
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                required
                                name="currentPassword"
                                label="סיסמא נוכחית"
                                variant="outlined"
                                size="small"
                                type={showPasswords.currentPassword ? 'text' : 'password'}
                                value={passwords.currentPassword || ""}
                                margin="dense"
                                error={error.currentPassword}
                                helperText={helperText.currentPassword}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                onClick={() => { setShowPasswords((prevData) => ({ ...prevData, currentPassword: !prevData.currentPassword })) }}
                                                edge="start"
                                            >
                                                {showPasswords.currentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                        </Grid>}
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            requiredshowPasswords
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
                    <p>{errorMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button disabled={!isPwVerified} onClick={handleSubmit} sx={{ marginRight: 2 }}>שמירה</Button>
                </DialogActions>
            </Dialog>}
            {updateSuccessful === "success" && <GenericMessage message="סיסמתך הוחלפה בהצלחה" type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="החלפת הסיסמא נכשלה" type="error" />}
    </>);
};

export default UserUpdatePassword;
