import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { checkValidation } from '../Tools/Validation'
import _isEqual from 'lodash/isEqual';
import _ from 'lodash';
import FileUpload from "./FileUpload";
import GiftImg from "./GiftImg";
import GiftDelivery from "./GiftDelivery";
import GiftDonors from "./GiftDonors";

const GiftForm = ({ fields, giftDetails, setGiftDetails, deleteGift, sendRequest, open, handleClose, type }) => {

    const [commentArea, setCommentArea] = useState("");
    const [formType, setFormType] = useState(type);
    const [updatedGift, setUpdatedGift] = useState(giftDetails);
    const [giftChanged, setGiftChanged] = useState(false);

    const errorObject = {
        description: false,
        img: false,
        amount: false,
        storage_space: false,
        general_cost: false,
        gift_cost: false,
        importer_id: false,
        success_level: false,
        remarks: false,
    };

    const helperTextObject = {
        description: '',
        img: '',
        amount: '',
        storage_space: '',
        general_cost: '',
        gift_cost: '',
        importer_id: '',
        success_level: '',
        remarks: ''
    };

    const [error, setError] = useState(errorObject);
    const [helperText, setHelperText] = useState(helperTextObject);

    useEffect(() => {
        setCommentArea("");
        setGiftChanged(false);
        setError(errorObject);
        setHelperText(helperTextObject);
    }, [open, formType]);

    const trimObjectStrings = (obj) => {
        return _.mapValues(obj, value => _.isString(value) ? value.trim() : value);
    };

    useEffect(() => {
        setGiftChanged(!_isEqual(trimObjectStrings(giftDetails), trimObjectStrings(updatedGift)));
    }, [updatedGift]);

    const closeForm = () => {
        setUpdatedGift(giftDetails);
        handleClose();
    }

    useEffect(() => {
        if (giftChanged) {
            sendRequest();
            setGiftChanged(false);
            if (type === "add") {
                setUpdatedGift(fields);
            }
        }
    }, [giftDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ["description", "amount", "importer_id", "gift_cost"];
        const isValid = checkValidation(updatedGift, setError, setHelperText, requiredFields);
        if (isValid) {
            setGiftDetails(updatedGift);
            if (type !== "add") {
                setFormType("display");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedGift((prevData) => ({ ...prevData, [name]: value }));
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
                {formType === "display" && <DialogTitle>מתנה מספר {giftDetails.id}</DialogTitle>}
                {formType === "add" && <DialogTitle>הוספת מתנה</DialogTitle>}
                {formType === "edit" && <DialogTitle>עדכון מתנה מספר {giftDetails.id}</DialogTitle>}
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} justifyContent={"center"}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="description"
                                    label="תיאור המתנה"
                                    required={formType !== "display"}
                                    type="text"
                                    fullWidth
                                    value={updatedGift.description || ""}
                                    error={error.description}
                                    helperText={helperText.description}
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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="amount"
                                    label="כמות במלאי"
                                    type="number"
                                    required={formType !== "display"}
                                    fullWidth
                                    value={updatedGift.amount || ""}
                                    error={error.amount}
                                    helperText={helperText.amount}
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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="gift_cost"
                                    label="עלות כל יחידה"
                                    type="number"
                                    required={formType !== "display"}
                                    fullWidth
                                    value={updatedGift.gift_cost || ""}
                                    error={error.gift_cost}
                                    helperText={helperText.gift_cost}
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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled={formType === "display"}
                                    size="small"
                                    margin="dense"
                                    name="general_cost"
                                    label="עלות הפקה "
                                    type="number"
                                    fullWidth
                                    value={updatedGift.general_cost || ""}
                                    error={error.general_cost}
                                    helperText={helperText.general_cost}
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
                                    name="storage_space"
                                    label="מקום אחסון"
                                    type="text"
                                    fullWidth
                                    value={updatedGift.storage_space || ""}
                                    error={error.storage_space}
                                    helperText={helperText.storage_space}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 255,
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    error={error.success_level}
                                >
                                    <InputLabel id="success-level-label">רמת הצלחה</InputLabel>
                                    <Select
                                        labelId="success-level-label"
                                        id="success_level"
                                        name="success_level"
                                        label="רמת הצלחה"
                                        value={updatedGift.success_level || ""}
                                        onChange={handleChange}
                                        disabled={formType === "display"}
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
                                        {[...Array(5).keys()].map((n) => (
                                            <MenuItem key={n + 1} value={n + 1}>{n + 1}</MenuItem>
                                        ))}
                                    </Select>
                                    {helperText.success_level && <p>{helperText.success_level}</p>}
                                </FormControl>
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
                                    value={updatedGift.remarks || ""}
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
                            {formType !== "display" && <FileUpload updatedGift={updatedGift} setUpdatedGift={setUpdatedGift} />}  
                            <GiftImg imgUrl={updatedGift.img}/>
                            {formType === "display" && <>
                              <GiftDelivery gift={giftDetails}/>
                              <GiftDonors giftDetails={giftDetails}/>
                            </>}
                        </Grid>
                        {commentArea}
                    </form>
                </DialogContent>
                <DialogActions>
                    {formType === "display" &&
                        <>
                           <IconButton onClick={() => { deleteGift() }} color="primary">
                                <DeleteIcon />
                            </IconButton>
                            <Button onClick={() => { setFormType("edit") }} color="primary">עריכה</Button>
                            <Button onClick={handleClose} color="primary">סגור</Button>
                        </>}
                    {formType === "edit" &&
                        <>
                            <Button onClick={() => closeForm()} color="primary">ביטול</Button>
                            <Button disabled={!giftChanged} onClick={handleSubmit} color="primary">עדכן</Button>
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

export default GiftForm;
