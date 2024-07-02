import { Button, Grid, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

const FileUpload = ({ updatedGift, setUpdatedGift }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    // const handleUpload = async () => {
    //     if (!file) {
    //         return;
    //     }

    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     const updatedData = { ...updatedGift };
    //     updatedData.img = formData;
    //     setUpdatedGift(updatedData);
    //     console.log(updatedData)
    //     setLoading(false);
    // };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
    
        setLoading(true);
    
        try {
            const formData = new FormData();
            formData.append('image', file);
    
            // Update updatedGift state with the file data (file object or URL/path)
            const updatedData = {
                ...updatedGift,
                img: file // or formData depending on your needs
            };
    
            // Update state
            setUpdatedGift(updatedData);
            console.log(updatedData);
        } catch (error) {
            console.error('Error handling upload:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid item xs={12} sm={12}>
            <input
                type='file'
                onChange={handleFile}
                disabled={loading}
            />
            <Button onClick={handleUpload} disabled={!file || loading}>
                {loading ? <CircularProgress size={24} /> : 'בחירת התמונה'}
            </Button>
        </Grid>
    );
};

export default FileUpload;