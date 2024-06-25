import { useState, useEffect } from "react";
import ContactSearch from "./ContactSearch";
import ContactsDisplay from "./ContactsDisplay";

const Contacts = ({ selectedContactId, setSelectedContactId, type }) => {

    const fields = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    };

    const [contactsToDisplay, setContactsToDisplay] = useState([]);

    return (
        <>
            <ContactSearch
                fields={fields}
                contactsToDisplay={contactsToDisplay}
                setContactsToDisplay={setContactsToDisplay}
            />
            <ContactsDisplay
                contactsToDisplay={contactsToDisplay}
                setContactsToDisplay={setContactsToDisplay}
                selectedContactId={selectedContactId}
                setSelectedContactId={setSelectedContactId}
                type={type}
            />
        </>
    );
};

export default Contacts;
