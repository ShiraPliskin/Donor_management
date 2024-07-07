import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { checkValidation } from '../Tools/Validation'
import _isEqual from 'lodash/isEqual';
import { trimObjectStrings } from "../Tools/objectsOperations"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Select, MenuItem, FormControl, InputLabel, IconButton, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { checkIfExist } from '../Tools/APIRequests'
import UserUpdatePassword from "./UserUpdatePassword";

const UserForm = ({ fields, userDetails, setUserDetails, sendRequest, open, handleClose, type, deleteUser, useType }) => {

    const [commentArea, setCommentArea] = useState("");
    const [formType, setFormType] = useState(type);
    const [updatedUser, setUpdatedUser] = useState(userDetails);
    const [userChanged, setUserChanged] = useState(false);
    const [addPasswordSucceed, setAddPasswordSucceed] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    const errorObject = {
        name: false,
        email: false,
        permission: false,
    }
    const helperTextObject = {
        name: '',
        email: '',
        permission: '',
    }
    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(helperTextObject);

    useEffect(() => {
        setCommentArea("");
        setUserChanged(false);
        setError(errorObject);
        setHelperText(helperTextObject);
    }, [open, formType]);

    useEffect(() => {
        setUserChanged(!_isEqual(trimObjectStrings(userDetails), trimObjectStrings(updatedUser)));
    }, [updatedUser]);

    const undoEdit = () => {
        setUpdatedUser(userDetails);
        handleClose();
    }

    const undoAdd = () => {
        setUpdatedUser(userDetails);
        setAddPasswordSucceed(false);
        handleClose();
    }

    useEffect(() => {
        if (userChanged) {
            sendRequest();
            setUserChanged(false);
            if (type === "add") {
                setUpdatedUser(fields);
            }
        }
    }, [userDetails]);

    const checkIsUserExist = async (user) => {
        let isNew = true;
        if (updatedUser.email !== userDetails.email) {
            isNew = await checkIfExist("users", `?filter=email=${user.email}`, setCommentArea, userDetails.id);
        }
        if (isNew) {
            setUserDetails(updatedUser);
            setAddPasswordSucceed(false);
            if (type !== "add") {
                setFormType("display");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["name", "email"];
        const isValid = checkValidation(updatedUser, setError, setHelperText, requiredFields);
        if (!isValid)
            return
        const { id, verifyPW, ...userForAdd } = updatedUser;
        checkIsUserExist(userForAdd);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    };

    return (
        <>
            <Dialog open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                disableEscapeKeyDown
                fullWidth
                maxWidth={"xs"}
            >
                {formType === "display" && <DialogTitle>משתמש מספר {userDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת משתמש</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון משתמש מספר {userDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="name"
                                    label="שם"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.name}
                                    helperText={helperText.name}
                                    value={updatedUser.name || ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 40,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="email"
                                    label="כתובת מייל"
                                    type="email"
                                    fullWidth
                                    required={formType !== "display"}
                                    value={updatedUser.email || ""}
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
                                />
                            </Grid>
                            {useType === "administration" && <Grid item xs={12} sm={12}>
                                {formType !== "display" &&
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
                                            value={updatedUser.permission || "מזכיר"}
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
                                            <MenuItem value="מזכיר">מזכיר</MenuItem>
                                            <MenuItem value="מנהל">מנהל</MenuItem>
                                        </Select>
                                    </FormControl>}
                                {formType === "display" &&
                                    <TextField
                                        disabled
                                        size="small"
                                        margin="dense"
                                        name="permission"
                                        label="הרשאה"
                                        type="text"
                                        fullWidth
                                        value={updatedUser.permission || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />}
                            </Grid>}
                            {formType === "add" && <UserUpdatePassword
                                id={userDetails.id}
                                formType={"add"}
                                useType="administration"
                                addPWSucceed={addPasswordSucceed}
                                setAddPWSucceed={setAddPasswordSucceed}
                                setUpdatedUser={setUpdatedUser}
                            />}
                        </Grid>
                        {commentArea && <Box marginTop={2} color={"red"}>{commentArea}</Box>}
                    </form>
                </DialogContent>
                <DialogActions>
                    {formType === "display" &&
                        <>
                            {useType === "administration" && currentUser.id !== userDetails.id &&
                                <IconButton onClick={() => { deleteUser() }} color="primary">
                                    <DeleteIcon />
                                </IconButton>}
                            {(useType === "userProfile" || currentUser.id !== userDetails.id) &&
                                <Button onClick={() => { setFormType("edit") }} color="primary">עריכה</Button>}
                            {currentUser.id === userDetails.id && <p>על מנת לערוך משתמש זה לחץ "פרטים אישיים"</p>}
                            <Button onClick={handleClose} color="primary">סגור</Button>
                        </>}
                    {formType === "edit" &&
                        <>
                            <Button onClick={() => undoEdit()} color="primary">ביטול</Button>
                            <Button disabled={!userChanged} onClick={handleSubmit} color="primary">עדכן</Button>
                        </>}
                    {formType === "add" &&
                        <>
                            <Button onClick={() => undoAdd()} color="primary">ביטול</Button>
                            <Button disabled={!addPasswordSucceed} onClick={handleSubmit} color="primary">הוסף</Button>
                        </>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserForm;
