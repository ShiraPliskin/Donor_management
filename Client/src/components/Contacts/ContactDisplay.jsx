import { React, useState, useEffect } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContactForm from './ContactForm';
import { putRequest } from '../Tools/APIRequests';
import { filterEmptyValues } from "../Tools/objectsOperations"
import GenericDeletion from '../Tools/GenericDeletion';
import GenericMessage from '../Tools/GenericSuccessMessage';

const ContactDisplay = ({ fields, contact, index, setContactsToDisplay, selectedContactId, setSelectedContactId, type, setTotal }) => {

    const [currentContact, setCurrentContact] = useState(contact);
    const [open, setOpen] = useState(false);
    const [updateSuccessful, setUpdateSuccessful] = useState('');
    const [openDeleteWarning, setOpenDeleteWarning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (setContactsToDisplay === "success") {
            setDonorsToDisplay((prevContacts) => {
                return prevContacts.map(contact =>
                    contact.id === currentContact.id ? currentContact : contact
                );
            });
        }
    }, [updateSuccessful]);

    const updateContactRequest = () => {
        setUpdateSuccessful("")
        const updatedContact = filterEmptyValues(currentContact);
        putRequest("contacts", updatedContact, currentContact.id, setUpdateSuccessful);
    };

    const handleClickChoose = () => {
        setSelectedContactId((prevId) => (prevId === contact.id ? null : contact.id));
    };

    const handleViewContact = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const deleteContact = () => {
        setOpenDeleteWarning(true);
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <TableRow
                sx={{
                    height: '40px',
                    backgroundColor: isHovered ? '#f5f5f5' : 'inherit',
                    transition: 'background-color 0.3s ease',
                }}
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <TableCell sx={{ textAlign: 'center' }}>{contact.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{contact.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    {type === "contacts" ?
                        <IconButton onClick={handleViewContact}>
                            <VisibilityIcon />
                        </IconButton>
                        :
                        <IconButton onClick={handleClickChoose}>
                            <Checkbox
                                checked={selectedContactId === contact.id}
                                checkedIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>}
                                inputProps={{ 'aria-label': 'Checkbox' }}
                            />
                        </IconButton>
                    }
                </TableCell>
            </TableRow>
            {open && (
                <ContactForm
                    fields={fields}
                    contactDetails={currentContact}
                    setContactDetails={setCurrentContact}
                    sendRequest={updateContactRequest}
                    deleteContact={deleteContact}
                    open={open}
                    handleClose={handleClose}
                    type="display"
                />
            )}
            {openDeleteWarning &&
                <GenericDeletion
                    id={currentContact.id}
                    warningOpen={openDeleteWarning}
                    setWarningOpen={setOpenDeleteWarning}
                    table="contacts"
                    objectName="איש קשר"
                    objectState={setContactsToDisplay}
                    setTotal={setTotal}
                />
            }
            {updateSuccessful === "success" && <GenericMessage message={`איש קשר מספר ${currentContact.id} עודכן בהצלחה`} type="success" />}
            {updateSuccessful === "error" && <GenericMessage message="עדכון איש קשר נכשל" type="error" />}
        </>
    );
};

export default ContactDisplay;
