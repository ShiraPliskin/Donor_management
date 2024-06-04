import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';

function Test({ formType, donorDetails, handleChange }) {
    const [error, setError] = useState({ l_name: false });
    const [helperText, setHelperText] = useState({ l_name: '' });

    const validateInput = (name, value) => {
        let isValid = true;
        let message = '';

        if (name === 'l_name') {
            if (value.trim() === '') {
                isValid = false;
                message = 'Last name cannot be empty';
            }
            // Add other validation conditions here if necessary
        }

        setError(prevError => ({ ...prevError, [name]: !isValid }));
        setHelperText(prevHelperText => ({ ...prevHelperText, [name]: message }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        validateInput(name, value);
    };

    return (
        <TextField
            disabled={formType === "display"}
            size="small"
            margin="dense"
            name="l_name"
            label="שם משפחה"
            type="text"
            fullWidth
            required={formType !== "display"}
            value={donorDetails.l_name || ""}
            onChange={handleInputChange}
            error={error.l_name}
            helperText={helperText.l_name}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PersonIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default Test;