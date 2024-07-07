import { Button, Grid, CircularProgress, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { config } from "../config.jsx";
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FileUpload = ({ updatedGift, setUpdatedGift }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`http://${config.SERVERPORT}/gifts/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json();

            const updatedData = {
                ...updatedGift,
                img: data.filePath,
            };

            setUpdatedGift(updatedData);
        } catch (error) {
            alert("שגיאה בהוספת התמונה");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid item xs={12} sm={12}>
            <Typography variant="body1" color="textSecondary" display="inline">
            </Typography>
            <input
                accept="image/*"
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFile}
                disabled={loading}
            />
            <label htmlFor="file-input">
                <Button
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    disabled={loading}
                    endIcon={<FileUploadIcon sx={{ marginRight: 1, marginLeft: -1 }} />}
                >
                    העלאת תמונה
                </Button>
            </label>
            {loading && <CircularProgress size={24} />}
            {file && !loading && <>
                <Typography variant="body2" color="textSecondary">
                    קובץ נבחר: {file.name}
                    <Button sx={{ marginRight: 1 }} variant="outlined" color="primary" onClick={handleUpload} >
                        שמירה
                    </Button>
                </Typography>
            </>}
        </Grid>
    );
};

export default FileUpload;
