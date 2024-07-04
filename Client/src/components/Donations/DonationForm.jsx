import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, Box, DialogTitle, Grid, InputAdornment, IconButton, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { checkValidation } from '../Tools/Validation';
import _isEqual from 'lodash/isEqual';
import dayjs from 'dayjs';
import { trimObjectStrings } from "../Tools/objectsOperations"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import ChooseDonorButton from "./ChooseDonorButton";

const DonationForm = ({ fields, donationDetails, setDonationDetails, sendRequest, open, handleClose, type, deleteDonation }) => {

    const [commentArea, setCommentArea] = useState("");
    const [formType, setFormType] = useState(type);
    const [updateDonation, setUpdateDonation] = useState(donationDetails);
    const [donationChanged, setDonationChanged] = useState(false);

    const errorObject = {
        date: false,
        payment_method: false,
        amount: false,
    };

    const helperTextObject = {
        date: "",
        payment_method: "",
        amount: "",
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

    const closeForm = () => {
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
        if(!updateDonation.donor_id){
            setCommentArea("לא נבחר תורם.");
            return;
        }
        const selectedDate = new Date(updateDonation.date);
        const today = new Date();
        const requiredFields = ["amount", "payment_method", "date"];
        const isValid = checkValidation(updateDonation, setError, setHelperText, requiredFields);
        if (isValid && selectedDate <= today) {
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
                maxWidth={"xs"}
            >
                {formType === "display" && <DialogTitle>תרומה מספר {donationDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת תרומה</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון תרומה מספר {donationDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} width={250} justifyContent="center" alignItems="center">
                            <ChooseDonorButton type={formType} setUpdateDonation={setUpdateDonation} updatedDonation={updateDonation} setComment={setCommentArea}/>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="amount"
                                    label="סכום התרומה"
                                    type="number"
                                    fullWidth
                                    required={formType !== "display"}
                                    error={error.amount}
                                    helperText={helperText.amount}
                                    value={updateDonation.amount || ""}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                {formType !== "display" &&
                                    <FormControl
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                        helperText={helperText.payment_method}
                                        error={error.payment_method}
                                        required
                                    >
                                        <InputLabel id="payment_method-label">שיטת התשלום</InputLabel>
                                        <Select
                                            labelId="payment_method-label"
                                            id="payment_method"
                                            name="payment_method"
                                            label="שיטת התשלום"
                                            value={updateDonation.payment_method || ""}
                                            onChange={handleChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PaymentIcon />
                                                </InputAdornment>
                                            }
                                            sx={{
                                                '& .MuiSelect-icon': {
                                                    left: 10,
                                                    right: 'auto',
                                                }
                                            }}
                                        >
                                            <MenuItem value="מספר אשראי">מספר אשראי</MenuItem>
                                            <MenuItem value="העברה בנקאית">העברה בנקאית</MenuItem>
                                            <MenuItem value="צ'ק">צ'ק</MenuItem>
                                            <MenuItem value="מזומן">מזומן</MenuItem>
                                        </Select>
                                    </FormControl>}
                                {formType === "display" &&
                                    <TextField
                                        disabled
                                        size="small"
                                        margin="dense"
                                        name="payment_method"
                                        label="שיטת התשלום"
                                        type="text"
                                        fullWidth
                                        value={updateDonation.payment_method || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PaymentIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true, required: formType !== "display" }}
                                    label="תאריך מתן התרומה"
                                    onChange={(e) => handleChange({ target: { name: "date", value: e.target.value } })}
                                    type="date"
                                    size="small"
                                    disabled={formType === "display"}
                                    margin="dense"
                                    value={updateDonation.date ? dayjs(updateDonation.date).format('YYYY-MM-DD') : ''}
                                    InputProps={{
                                        inputProps: { 
                                            max: dayjs().format('YYYY-MM-DD') 
                                        }
                                    }}
                                    error={error.date}
                                    helperText={helperText.date}
                                />
                            </Grid>
                        </Grid>
                        {commentArea && <Box marginTop={2} color={"red"}>{commentArea}</Box>}
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
                            <Button onClick={() => closeForm()} color="primary">ביטול</Button>
                            <Button disabled={!donationChanged} onClick={handleSubmit} color="primary">עדכן</Button>
                        </>}
                    {formType === "add" &&
                        <>
                            <Button onClick={() => closeForm()} color="primary">ביטול</Button>
                            <Button onClick={handleSubmit} color="primary">הוסף</Button>
                        </>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DonationForm;
