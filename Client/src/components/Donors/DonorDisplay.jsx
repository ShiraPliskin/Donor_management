import React, { useState, useEffect } from 'react';
import { getByIdRequest } from '../Tools';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TableCell,
    TableRow,
    IconButton,
    Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteIcon from '@mui/icons-material/Note';

const DonorDisplay = ({ donor, index }) => {
    const [currentDonor, setCurrentDonor] = useState("");
    const [commentArea, setCommentArea] = useState("");
    const [open, setOpen] = useState(false);

    const getDonorDetails = async () => {
        await getByIdRequest("donors", donor.id, setCurrentDonor, setCommentArea);
    };

    const handleClickOpen = () => {
        setOpen(true);
        getDonorDetails();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableRow key={index}>
                <TableCell sx={{ textAlign: 'center' }}>{donor.id}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.l_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.f_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{donor.address}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={handleClickOpen}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            {open && (
                <Dialog open={open} onClose={handleClose} aria-labelledby="donor-details-dialog" maxWidth="md">
                    <DialogTitle id="donor-details-dialog">פרטי תורם מספר {currentDonor.id}</DialogTitle>
                    <DialogContent>
                        {currentDonor && (
                            <List>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="שם משפחה" secondary={currentDonor.l_name} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="שם פרטי" secondary={currentDonor.f_name} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PhoneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="טלפון" secondary={currentDonor.phone} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <EmailIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="כתובת מייל" secondary={currentDonor.email} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <HomeIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="כתובת" secondary={currentDonor.address} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="שם בן הזוג" secondary={currentDonor.spouse_name} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="מספר ילדים" secondary={currentDonor.num_of_children} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <WorkIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="כתובת בעבודה" secondary={currentDonor.address_at_work} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="פרטי איש קשר" secondary={currentDonor.contact_id} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <DescriptionIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="תיאור הכרות" secondary={currentDonor.Introduction_description} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <NoteIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="הערות" secondary={currentDonor.Remarks} sx={{ textAlign: 'right' }} />
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            </List>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">סגור</Button>
                    </DialogActions>
                </Dialog>
            )}
            <p>{commentArea}</p>
        </>
    );
};

export default DonorDisplay;
