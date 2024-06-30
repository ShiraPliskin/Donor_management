import { useState, useEffect } from "react";
import { checkIfExist, postRequest } from "../Tools/APIRequests";
import { IconButton } from '@mui/material';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { checkValidation } from '../Tools/Validation'
import GenericMessage from '../Tools/GenericSuccessMessage';

const Register = () => {
    const [open, setOpen] = useState(false)
    const [isPwVerified, setIsPwVerified] = useState(false);
    const [comment, setComment] = useState("");
    const [isSucceed, setIsSucceed] = useState('');
    const [userId, setUserId] = useState("");

    const [userFields, setUserFields] = useState({
        id: '',
        name: '',
        email: '',
        permission: "secretary",
        password: '',
        verifyPW: ''
    });

    const [error, setError] = useState({
        name: false,
        email: false,
        permission: false,
        password: false,
        verifyPW: false
    });

    const [helperText, setHelperText] = useState({
        name: '',
        email: '',
        permission: '',
        password: '',
        verifyPW: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);

    useEffect(() => {
        setIsPwVerified(userFields.password !== "" && userFields.password === userFields.verifyPW);
    }, [userFields.password, userFields.verifyPW]);

    useEffect(() => {
        if(isSucceed === "success"){
            setOpen(false);
        }
    }, [isSucceed]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["name", "email", "password", "verifyPW"]
        const isValid = checkValidation(userFields, setError, setHelperText, requiredFields);
        if (!isValid)
            return;
        const { id, verifyPW, ...userForAdd } = userFields;
        checkIsUserExist(userForAdd);
    };

    const checkIsUserExist = async (user) => {
        const isNew = await checkIfExist("users", `?filter=email=${user.email}`, setComment);
        if (isNew) {
            addUser(user);
        }
    };

    const addUser = (user) => {
        postRequest("users", user, setIsSucceed, setUserId);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFields((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    }

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)}>הוספת משתמש</Button>
            <Dialog open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
            >
                <DialogTitle>הוספת משתמש</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            variant="outlined"
                            value={userFields.name}
                            size="small"
                            required
                            margin="normal"
                            label="שם"
                            error={error.name}
                            helperText={helperText.name}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        /><br />
                        <TextField
                            name="email"
                            variant="outlined"
                            size="small"
                            required
                            value={userFields.email}
                            margin="normal"
                            label="כתובת מייל"
                            error={error.email}
                            helperText={helperText.email}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 40,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        /><br />
                        <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                        >
                            <InputLabel id="permission-label">הרשאה</InputLabel>
                            <Select
                                labelId="permission-label"
                                id="permission"
                                name="permission"
                                label="הרשאה"
                                error={error.permission}
                                helperText={helperText.permission}
                                value={userFields.permission}
                                required
                                onChange={handleChange}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <CheckCircleIcon />
                                    </InputAdornment>
                                }
                                sx={{
                                    '& .MuiSelect-icon': {
                                        left: 10,
                                        right: 'auto',
                                    }
                                }}
                            >
                                <MenuItem value="secretary">מזכיר</MenuItem>
                                <MenuItem value="administrator">מנהל</MenuItem>
                            </Select>
                        </FormControl><br />
                        <TextField
                            name="password"
                            label="סיסמה"
                            variant="outlined"
                            size="small"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={userFields.password}
                            margin="normal"
                            error={error.password}
                            helperText={helperText.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => { setShowPassword(prev => !prev) }}
                                            edge="start"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} /><br />
                        <TextField
                            name="verifyPW"
                            label="אימות סיסמה"
                            variant="outlined"
                            size="small"
                            type={showVerifyPassword ? 'text' : 'password'}
                            error={error.verifyPW}
                            helperText={helperText.verifyPW}
                            required
                            value={userFields.verifyPW}
                            margin="normal"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            onClick={() => { setShowVerifyPassword(prev => !prev) }}
                                            edge="start"
                                        >
                                            {showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />

                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">ביטול</Button>
                        <Button
                            disabled={!isPwVerified}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            הוסף
                        </Button>
                </DialogActions>
                <p>{comment}</p>
            </Dialog>
            {isSucceed === "success" && <GenericMessage message={`משתמש מספר ${userId} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת משתמש נכשלה" type="error" />}
        </>
    );
};

export default Register;
