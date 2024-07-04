import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Grid, Box, DialogTitle } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import Contacts from "../Contacts/Contacts";
import ContactAdd from "../Contacts/ContactAdd";

const ContactsOptionsForm = ({ openOptionsForm, closeOptionsForm, setUpdatedDonor }) => {

    const [searchFormOpen, setSearchFormOpen] = useState(false);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);

    const fields = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    };

    useEffect(() => {
        if (addFormOpen)
            handleSave();
    }, [selectedContactId]);

    const handleSave = () => {
        setUpdatedDonor((prevData) => ({ ...prevData, contact_id: selectedContactId }));
        setSearchFormOpen(false);
        closeOptionsForm();
    }

    const closeContactSearch = () => {
        setSearchFormOpen(false);
        closeOptionsForm();
    }

    return (
        <>
            <Dialog
                open={openOptionsForm}
                onClose={closeOptionsForm}
                maxWidth="md"
            >
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
                                onClick={() => { setAddFormOpen(true) }}
                            >הוספת איש קשר חדש
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog
                open={searchFormOpen}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setSearchFormOpen(false);
                    }
                }}
                disableEscapeKeyDown
                maxWidth="lg"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', fontWeight: 'bold', marginBottom: '5px' }}>בחירת איש קשר עבור תורם חדש</DialogTitle>
                <DialogContent>
                    <Contacts
                        selectedContactId={selectedContactId}
                        setSelectedContactId={setSelectedContactId}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={closeContactSearch}>ביטול</Button>
                        <Button disabled={!selectedContactId} onClick={handleSave} sx={{ marginRight: 2 }}>שמירה</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {addFormOpen && <ContactAdd
                fields={fields}
                type="donorContact"
                newContactID={selectedContactId}
                setNewContactID={setSelectedContactId}
                closeOptionsForm={closeOptionsForm}
            />}
        </>
    );
};

export default ContactsOptionsForm;
