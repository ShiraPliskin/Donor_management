import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from '@mui/icons-material/Visibility';

const ContactDisplay = ({ contact, index, selectedContactId, setSelectedContactId, type }) => {

    const handleClickChoose = () => {
        setSelectedContactId((prevId) => (prevId === contact.id ? null : contact.id));
    };

    const handleViewContact = () => {

    }

    return (
        <>
            <TableRow key={index}>
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
        </>
    );
};

export default ContactDisplay;
