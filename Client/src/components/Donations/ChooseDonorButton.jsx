import { useState, useEffect } from "react";
import { Button, Grid, TextField, InputAdornment, Dialog, DialogContent, Box, DialogTitle} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Donors from "../Donors/Donors";

const ChooseDonorButton = ({ type, setUpdateDonation, updatedDonation, setComment }) => {

    const [openDonorsForm, setOpenDonorsForm] = useState();
    const [selectedDonorId, setSelectedDonorId] = useState([]);

    const handleSave = () => {
        setUpdateDonation((prevData) => ({ ...prevData, donor_id: selectedDonorId[0] }));
        setOpenDonorsForm(false);
    }

    const handleOpen = () => {
        setComment("");
        setOpenDonorsForm(true);
    };

    return (<>
        <Grid item xs={12} sm={12}>
            {!updatedDonation.donor_id && type !== "display" ?
                <Button
                    fullWidth
                    margin="10px"
                    variant="outlined"
                    color="info"
                    style={{ height: '40px' }}
                    startIcon={<PersonIcon sx={{ marginLeft: 1 }} />}
                    onClick={handleOpen}
                >תורם 
                </Button> :
                <TextField
                    disabled
                    size="small"
                    margin="dense"
                    name="donor_id"
                    label="מס' תורם"
                    type="text"
                    fullWidth
                    value={updatedDonation.donor_id || ""}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ marginRight: type !== "display" && -2, marginLeft: 1 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            type !== "display" && <InputAdornment position="end">
                                <IconButton  onClick={handleOpen}>
                                    <PersonSearchIcon style={{ color: 'black' }}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />}
        </Grid>
        <Dialog
                open={openDonorsForm}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        setOpenDonorsForm(false);
                    }
                }}
                disableEscapeKeyDown
                maxWidth="lg"
            >
                <DialogTitle sx={{ bgcolor: 'lightblue', fontWeight: 'bold', marginBottom: '5px' }}>בחירת תורם עבור תרומה</DialogTitle>
                <DialogContent>
                    <Donors
                        type="donations"
                        selectedDonorId={selectedDonorId}
                        setSelectedDonorId={setSelectedDonorId}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={() => { setOpenDonorsForm(false) }}>ביטול</Button>
                        <Button disabled={selectedDonorId.length === 0} onClick={handleSave} sx={{ marginRight: 2 }}>שמירה</Button>
                    </Box>
                </DialogContent>
            </Dialog>
    </>)
}
export default ChooseDonorButton
