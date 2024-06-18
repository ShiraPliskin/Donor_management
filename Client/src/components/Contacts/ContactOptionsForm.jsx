import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ContactSearch from "./ContactSearch";
import ContactsDisplay from "./ContactsDisplay";

const ContactOptionsForm = ({ open, handleClose, type }) => {

    const fields = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    };

    const [searchFormOpen, setSearchFormOpen] = useState(false);
    const [contactsToDisplay, setContactsToDisplay] = useState([]);

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="info"
                                startIcon={<PeopleIcon sx={{ marginLeft: 1 }} />}
                                onClick={() => { setSearchFormOpen(true) }}
                            >בחירת איש קשר קיים
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="info"
                                startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
                            >הוספת איש קשר חדש
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={searchFormOpen} onClose={handleClose}>
                <DialogContent>
                    <ContactSearch fields={fields} contactsToDisplay={contactsToDisplay} setContactsToDisplay={setContactsToDisplay} />
                    <ContactsDisplay contactsToDisplay={contactsToDisplay} setContactsToDisplay={setContactsToDisplay} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ContactOptionsForm;
