import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { checkValidation } from '../Tools/Validation';
import _isEqual from 'lodash/isEqual';
import dayjs from 'dayjs';
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
        const selectedDate = new Date(updateDonation.date);
        const today = new Date();
        const requiredFields = ["amount", "payment_method", "date"];
        const isValid = checkValidation(updateDonation, setError, setHelperText, requiredFields);
        if (isValid &&  selectedDate <= today) {
            setDonationDetails(updateDonation);
            if (type !== "add") {
                setFormType("display");
            }
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUpdateDonation((prevData) => ({ ...prevData, [name]: value }));
    //     setError((prevData) => ({ ...prevData, [name]: false }));
    //     setHelperText((prevData) => ({ ...prevData, [name]: '' }));
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const selectedDate = new Date(value);
        const today = new Date();
        setUpdateDonation((prevData) => ({ ...prevData, [name]: value }));
        setError((prevData) => ({ ...prevData, [name]: false }));
        setHelperText((prevData) => ({ ...prevData, [name]: '' }));
        if (selectedDate > today)
        {
            setError((prevData) => ({ ...prevData, [name]: true }));
            setHelperText((prevData) => ({ ...prevData, [name]: 'אין אפשרות לבחור תאריכים עתידיים' }));
        }
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
                                    error={error.payment_method}
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
                                <TextField
                                    label="תאריך מתן התרומה"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={(e) => handleChange({ target: { name: "date", value: e.target.value } })}
                                    value={updateDonation.date ? dayjs(updateDonation.date).format('YYYY-MM-DD') : ''}
                                    type="date"
                                    size="small"
                                    disabled={formType === "display"}
                                    margin="dense"
                                    renderInput={(params) => <TextField {...params} />}
                                    inputProps={{
                                        maxLength: 10,
                                    }}
                                    error={error.date}
                                    helperText={helperText.date}
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
