import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const GenericMessage = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: '90%', fontSize: '1rem' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GenericMessage;
