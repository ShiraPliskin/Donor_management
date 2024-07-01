import { useState, useEffect } from "react";
import ContactSearch from "./ContactSearch";
import ContactsDisplay from "./ContactsDisplay";
import ContactAdd from "./ContactAdd";

const Contacts = ({ selectedContactId, setSelectedContactId, type }) => {

    const fields = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
    };

    const [contactsToDisplay, setContactsToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [totalCount, setTotalCount] = useState(0);

    return (
        <>
            {type === "contacts" && <ContactAdd fields={fields} type="contacts"/>}
            <ContactSearch
                fields={fields}
                contactsToDisplay={contactsToDisplay}
                setContactsToDisplay={setContactsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
                setTotalCount={setTotalCount}
            />
            <ContactsDisplay
                contactsToDisplay={contactsToDisplay}
                setContactsToDisplay={setContactsToDisplay}
                selectedContactId={selectedContactId}
                setSelectedContactId={setSelectedContactId}
                type={type}
                fields={fields}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
            />
        </>
    );
};

export default Contacts;
