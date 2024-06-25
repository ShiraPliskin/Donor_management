import { useState, useEffect } from "react";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ContactsOptionsForm from "./ContactsOptionsForm";

const ContactDonorForm = ({ setUpdatedDonor, updatedDonor }) => {

    const [openOptionsForm, setOpenOptionsForm] = useState();

    const handleOpen = () => {
        setOpenOptionsForm(true);
    };

    const handleClose = () => {
        setOpenOptionsForm(false);
    };

    return (<>
        <Grid item xs={12} sm={6}>
            {!updatedDonor.contactId ?
                <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
                    onClick={handleOpen}
                >איש קשר
                </Button> :
                <TextField
                    disabled
                    size="small"
                    margin="dense"
                    name="contactId"
                    label="מס' איש קשר"
                    type="text"
                    fullWidth
                    value={updatedDonor.contactId || ""}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ marginRight: -2, marginLeft: 1 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleOpen}>
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />}
        </Grid>
        {openOptionsForm && (<>
            <ContactsOptionsForm openOptionsForm={openOptionsForm} closeOptionsForm={handleClose} setUpdatedDonor={setUpdatedDonor} />
        </>
        )}
    </>)
}
export default ContactDonorForm
