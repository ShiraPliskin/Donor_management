import { useState, useEffect } from "react";
import { getRequest } from '../Tools';
import DonorAdd from "./DonorAdd";
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Donors = () => {

    const fields = {
        id: '',
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        address: '',
        num_of_children: '',
        spouse_name: '',
        address_at_work: '',
        introduction_description: '',
        contact_id: '',
        remarks: '',
    };

    const [donorDetails, setDonorDetails] = useState(fields);
    const [donorsToDisplay, setDonorsToDisplay] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [minDonationAmount, setMinDonationAmount] = useState("");

    useEffect(() => {
        setCommentArea("");
    }, [donorsToDisplay]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDonorsToDisplay([]);
        let conditions = [];
        for (const [key, value] of Object.entries(donorDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryString = conditions.length > 0 ? `?${conditions.join('&')}` : '';
        getRequest("donors", queryString, setDonorsToDisplay, setCommentArea);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDonationAmount")
            setMinDonationAmount(value);
        else
            setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <DonorAdd fields={fields} />
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
                    <TextField
                        style={{ width: '150px' }}
                        label="שם פרטי"
                        variant="outlined"
                        name="f_name"
                        value={donorDetails.f_name}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="שם משפחה"
                        variant="outlined"
                        name="l_name"
                        value={donorDetails.l_name}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="טלפון"
                        variant="outlined"
                        name="phone"
                        value={donorDetails.phone}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="כתובת מייל"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={donorDetails.email}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="כתובת"
                        variant="outlined"
                        name="address"
                        value={donorDetails.address}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <TextField
                        style={{ width: '150px' }}
                        label="גובה תרומה מינימלי"
                        variant="outlined"
                        name="minDonationAmount"
                        value={minDonationAmount}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                    />
                    <Button variant="contained" color="primary" type="submit" endIcon={<SearchIcon />}>
                        חפש
                    </Button>
                </Box>
                {<p>{commentArea}</p>}
            </form>

            {donorsToDisplay.length > 0 && (
                <table style={{ border: "1px solid black", width: "100%", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black" }}>שם פרטי</th>
                            <th style={{ border: "1px solid black" }}>שם משפחה</th>
                            <th style={{ border: "1px solid black" }}>כתובת מייל</th>
                            <th style={{ border: "1px solid black" }}>טלפון</th>
                            <th style={{ border: "1px solid black" }}>כתובת</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donorsToDisplay.map((donor, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid black" }}>{donor.f_name}</td>
                                <td style={{ border: "1px solid black" }}>{donor.l_name}</td>
                                <td style={{ border: "1px solid black" }}>{donor.email}</td>
                                <td style={{ border: "1px solid black" }}>{donor.phone}</td>
                                <td style={{ border: "1px solid black" }}>{donor.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Donors;
