import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ContactForm from "./ContactForm";
import { postRequest } from "../Tools/APIRequests";
import { filterEmptyValues } from "../Tools/Validation"
import GenericMessage from "../Tools/GenericSuccessMessage";

const ContactAdd = ({ fields, type, newContactID, setNewContactID }) => {

    const [contactDetails, setContactDetails] = useState(fields);
    const [openForm, setOpenForm] = useState(type === "contacts" ? false : true);
    const [isSucceed, setIsSucceed] = useState('');
    const [newID, setNewID] = useState(null);

    useEffect(() => {
        setContactDetails(fields);
    }, [fields, openForm]);

    const handleClickOpen = () => {
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
        setContactDetails(fields);
    };

    const addContactRequest = () => {
        setIsSucceed("");
        const newContact = filterEmptyValues(contactDetails);
        postRequest("contacts", newContact, setIsSucceed, type === "contacts" ? setNewID : setNewContactID );
        handleClose();
    };

    return (
        <>
            {type === "contacts" && <Button variant="outlined" onClick={handleClickOpen}>הוספת איש קשר</Button>}
            {isSucceed === "success" && <GenericMessage message={`איש קשר מספר ${type === "contacts" ? newID : newContactID} נוסף בהצלחה`} type="success" />}
            {isSucceed === "error" && <GenericMessage message="הוספת איש קשר נכשלה" type="error" />}
            <ContactForm
                fields={fields}
                contactDetails={contactDetails}
                setContactDetails={setContactDetails}
                sendRequest={addContactRequest}
                open={openForm}
                handleClose={handleClose}
                type="add"
            />
        </>
    );
};

export default ContactAdd;