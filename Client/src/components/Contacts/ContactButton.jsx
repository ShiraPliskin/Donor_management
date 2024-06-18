import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ContactForm from "./ContactOptionsForm";

const ContactButton = ({}) => {

    const [openForm, setOpenForm] = useState();

    const handleClose = () => {
        setOpenForm(false);
    };

    return (<>
        <Button
            fullWidth
            variant="outlined"
            color="info"
            startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
            onClick={() => { setOpenForm(true) }}
        >איש קשר
        </Button>
        {openForm && (
            <ContactForm open={open} handleClose={handleClose} type="add"/>
        )}
        </>)
}
export default ContactButton
