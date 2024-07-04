import { useState, useEffect } from "react";
import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import ContactsOptionsForm from "./ContactsOptionsForm";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const ContactDonorForm = ({ type, setUpdatedDonor, updatedDonor }) => {

    const [openOptionsForm, setOpenOptionsForm] = useState();

    const handleOpen = () => {
        setOpenOptionsForm(true);
    };

    const handleClose = () => {
        setOpenOptionsForm(false);
    };

    return (<>
        <Grid item xs={12} sm={6}>
            {!updatedDonor.contact_id && type !== "display" ?
                <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    style={{ height: '40px' }}
                    startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
                    onClick={handleOpen}
                >איש קשר
                </Button> :
                <TextField
                    disabled
                    size="small"
                    margin="dense"
                    name="contact_id"
                    label="מס' איש קשר"
                    type="text"
                    fullWidth
                    value={updatedDonor.contact_id || ""}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ marginRight: type !== "display" && -2, marginLeft: 1 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            type !== "display" && <InputAdornment position="end">
                                <IconButton onClick={handleOpen}>
                                    <PersonSearchIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />}
        </Grid>
        {openOptionsForm && (<>
            <ContactsOptionsForm
                openOptionsForm={openOptionsForm}
                closeOptionsForm={handleClose}
                setUpdatedDonor={setUpdatedDonor}
            />
        </>
        )}
    </>)
}
export default ContactDonorForm
