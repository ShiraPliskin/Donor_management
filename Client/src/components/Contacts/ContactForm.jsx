import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import { checkValidation } from './ContactValidation'
import _isEqual from 'lodash/isEqual';
import _ from 'lodash';

const ContactForm = ({ fields, contactDetails, setContactDetails, sendRequest, open, handleClose, type }) => {

    const [commentArea, setCommentArea] = useState("");
    const [formType, setFormType] = useState(type);
    const [updatedContact, setUpdatedContact] = useState(contactDetails);
    const [contactChanged, setContactChanged] = useState(false);

    const errorObject = {
        name: false,
        email: false,
        phone: false,
        address: false
    };

    const helperTextObject = {
        name: false,
        email: false,
        phone: false,
        address: false
    };

    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(helperTextObject);

    useEffect(() => {
        setCommentArea("");
        setContactChanged(false);
        setError(errorObject);
        setHelperText(helperTextObject);
    }, [open, formType]);

    const trimObjectStrings = (obj) => {
        return _.mapValues(obj, value => _.isString(value) ? value.trim() : value);
    };

    useEffect(() => {
        setContactChanged(!_isEqual(trimObjectStrings(contactDetails), trimObjectStrings(updatedContact)));
    }, [updatedContact]);

    const undoEdit = () => {
        setFormType("display");
        setUpdatedContact(contactDetails);
    }

    const undoAdd = () => {
        setUpdatedContact(contactDetails);
        handleClose();
    }

    useEffect(() => {
        if (contactChanged) {
            sendRequest();
            setContactChanged(false);
            if (type === "add"){
                setUpdatedContact(fields);
            }
        }
    }, [contactDetails]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = checkValidation(updatedContact, setError, setHelperText);
        if (isValid) {
            setContactDetails(updatedContact);
            if (type !== "add") {
                setFormType("display");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedContact((prevData) => ({ ...prevData, [name]: value }));
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
            >
                {formType === "display" && <DialogTitle>איש קשר מספר {contactDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת איש קשר</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון איש קשר מספר {contactDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="name"
                                    label="שם איש קשר"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.name}
                                    helperText={helperText.name}
                                    value={updatedContact.name || ""}
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
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="email"
                                    label="כתובת מייל"
                                    type="email"
                                    fullWidth
                                    value={updatedContact.email || ""}
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
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="phone"
                                    label="טלפון"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    value={updatedContact.phone || ""}
                                    error={error.phone}
                                    helperText={helperText.phone}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="address"
                                    label="כתובת"
                                    type="text"
                                    fullWidth
                                    value={updatedContact.address || ""}
                                    error={error.address}
                                    helperText={helperText.address}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 200,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeIcon />
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
                                    name="remarks"
                                    label="הערות"
                                    type="text"
                                    fullWidth
                                    value={updatedContact.remarks || ""}
                                    error={error.remarks}
                                    helperText={helperText.remarks}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 255,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NoteIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {commentArea}
                    </form>
                </DialogContent>
                <DialogActions>
                    {formType === "display" &&
                        <>
                            <Button onClick={() => { setFormType("edit") }} color="primary">עריכה</Button>
                            <Button onClick={handleClose} color="primary">סגור</Button>
                        </>}
                    {formType === "edit" &&
                        <>
                            <Button onClick={() => undoEdit()} color="primary">ביטול</Button>
                            <Button disabled={!contactChanged} onClick={handleSubmit} color="primary">עדכן</Button>
                        </>}
                    {formType === "add" &&
                        <>
                            <Button onClick={() => undoAdd()} color="primary">ביטול</Button>
                            <Button onClick={handleSubmit} color="primary">הוסף</Button>
                        </>}
                </DialogActions>
            </Dialog>

        </>
    );
};

export default ContactForm;
