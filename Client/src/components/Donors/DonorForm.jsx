import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';
import { checkValidation } from './DonorValidation'
import _isEqual from 'lodash/isEqual';

const DonorForm = ({ donorDetails, setDonorDetails, sendRequest, open, handleClose, type }) => {

    const [commentArea, setCommentArea] = useState("");

    const [formType, setFormType] = useState(type);
    const [currentDonor, setCurrentDonor] = useState(donorDetails);
    const [donorChanged, setDonorChanged] = useState(false);

    const errorObject = {
        f_name: false,
        l_name: false,
        email: false,
        phone: false,
        address: false,
        num_of_children: false,
        spouse_name: false,
        address_at_work: false,
        introduction_description: false,
        contact_id: false,
        remarks: false,
    };
    const helperTextObject = {
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        address: '',
        num_of_children: '',
        spouse_name: '',
        address_at_work: '',
        introduction_description: '',
        contact_id: '',
        remarks: '',
    };

    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(helperTextObject);

    useEffect(() => {
        setCommentArea("");
        setDonorChanged(false);
        setError(errorObject);
        setHelperText(helperTextObject);
    }, [open, formType]);

    useEffect(() => {
        setDonorChanged(!_isEqual(donorDetails, currentDonor));
    }, [donorDetails]);

    const undoEdit = () =>{
        setFormType("display");
        // setDonorDetails(currentDonor);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = checkValidation(donorDetails, setError, setHelperText);
        if (isValid) {
            sendRequest();
            setFormType("display");
            setCurrentDonor(donorDetails);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                {formType === "display" && <DialogTitle>תורם מספר {donorDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת תורם</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון תורם מספר {donorDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="l_name"
                                    label="שם משפחה"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.l_name}
                                    helperText={helperText.l_name}
                                    value={donorDetails.l_name || ""}
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="f_name"
                                    label="שם פרטי"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.f_name}
                                    helperText={helperText.f_name}
                                    value={donorDetails.f_name || ""}
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="phone"
                                    label="טלפון"
                                    type="text"
                                    fullWidth
                                    value={donorDetails.phone || ""}
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="email"
                                    label="כתובת מייל"
                                    type="email"
                                    fullWidth
                                    value={donorDetails.email || ""}
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="address"
                                    label="כתובת"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    value={donorDetails.address || ""}
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
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="spouse_name"
                                    label="שם בן הזוג"
                                    type="text"
                                    fullWidth
                                    value={donorDetails.spouse_name || ""}
                                    error={error.spouse_name}
                                    helperText={helperText.spouse_name}
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="num_of_children"
                                    label="מספר ילדים"
                                    type="number"
                                    fullWidth
                                    value={donorDetails.num_of_children || ""}
                                    error={error.num_of_children}
                                    helperText={helperText.num_of_children}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PeopleIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="address_at_work"
                                    label="כתובת בעבודה"
                                    type="text"
                                    fullWidth
                                    value={donorDetails.address_at_work || ""}
                                    error={error.address_at_work}
                                    helperText={helperText.address_at_work}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 200,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WorkIcon />
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
                                    name="introduction_description"
                                    label="תיאור הכרות"
                                    type="text"
                                    fullWidth
                                    value={donorDetails.introduction_description || ""}
                                    error={error.introduction_description}
                                    helperText={helperText.introduction_description}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 255,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon />
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
                                    value={donorDetails.remarks || ""}
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
                            <Button disabled={!donorChanged} onClick={handleSubmit} color="primary">עדכן</Button>
                        </>}
                    {formType === "add" &&
                        <>
                            <Button onClick={handleClose} color="primary">ביטול</Button>
                            <Button onClick={handleSubmit} color="primary">הוסף</Button>
                        </>}
                </DialogActions>
            </Dialog>

        </>
    );
};

export default DonorForm;
