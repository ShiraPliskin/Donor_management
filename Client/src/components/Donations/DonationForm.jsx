import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import { checkValidation } from '../Tools/Validation';
import { DatePicker } from "@mui/lab";
import _isEqual from 'lodash/isEqual';
// import ContactDonorForm from "../Contacts/ContactDonorForm";
import { trimObjectStrings } from "../Tools/objectsOperations"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const DonationForm = ({ fields, donationDetails, setDonationDetails, sendRequest, open, handleClose, type, deleteDonation }) => {

    const [commentArea, setCommentArea] = useState("");
    const [formType, setFormType] = useState(type);
    const [updateDonation, setUpdateDonation] = useState(donationDetails);
    const [donationChanged, setDonationChanged] = useState(false);

    const errorObject = {
        date: false,
        payment_method: false,
        amount: false,
        donor_id: false
    };

    const helperTextObject = {
        date: "",
        payment_method: "",
        amount: "",
        donor_id: "1"
    };

    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(helperTextObject);

    useEffect(() => {
        setCommentArea("");
        setDonationChanged(false);
        setError(errorObject);
        setHelperText(helperTextObject);
    }, [open, formType]);

    useEffect(() => {
        setDonationChanged(!_isEqual(trimObjectStrings(donationDetails), trimObjectStrings(updateDonation)));
    }, [updateDonation]);

    const undoEdit = () => {
        setFormType("display");
        setUpdateDonation(donationDetails);
    }

    const undoAdd = () => {
        setUpdateDonation(donationDetails);
        handleClose();
    }

    useEffect(() => {
        if (donationChanged) {
            sendRequest();
            setDonationChanged(false);
            if (type === "add") {
                setUpdateDonation(fields);
            }
        }
    }, [donationDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["amount", "payment_method", "date"];
        const isValid = checkValidation(updateDonation, setError, setHelperText, requiredFields);
        if (isValid) {
            setDonationDetails(updateDonation);
            if (type !== "add") {
                setFormType("display");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateDonation((prevData) => ({ ...prevData, [name]: value }));
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
                {formType === "display" && <DialogTitle>תרומה מספר {donationDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת תרומה</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון תרומה מספר {donationDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="amount"
                                    label="סכום התרומה"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.amount}
                                    helperText={helperText.amount}
                                    value={updateDonation.amount || ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
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
                                    name="payment_method"
                                    label="שיטת התשלום"
                                    type="text"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.f_name}
                                    helperText={helperText.payment_method}
                                    value={updateDonation.payment_method || ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <DatePicker
                                    disabled={formType === "display"}
                                    margin="dense"
                                    label="תאריך מתן התרומה"
                                    value={updateDonation.date || null}
                                    onChange={(newValue) => handleChange({ target: { name: "date", value: newValue } })}
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                    error={error.date}
                                    helperText={helperText.date}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EditCalendarIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* <ContactDonorForm type={formType} setUpdateDonation={setUpdateDonation} updateDonation={updateDonation} /> */}
                        </Grid>
                        {commentArea}
                    </form>
                </DialogContent>
                <DialogActions>
                    {formType === "display" &&
                        <>
                            <IconButton onClick={() => { deleteDonation() }} color="primary">
                                <DeleteIcon />
                            </IconButton>
                            <Button onClick={() => { setFormType("edit") }} color="primary">עריכה</Button>
                            <Button onClick={handleClose} color="primary">סגור</Button>
                        </>}
                    {formType === "edit" &&
                        <>
                            <Button onClick={() => undoEdit()} color="primary">ביטול</Button>
                            <Button disabled={!donationChanged} onClick={handleSubmit} color="primary">עדכן</Button>
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

export default DonationForm;
