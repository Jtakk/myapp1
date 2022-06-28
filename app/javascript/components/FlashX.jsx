import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const FlashX = ({message_type, message, open, setOpen}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={9000}>
      <Alert onClose={handleClose} variant="filled" severity={message_type || "success"}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FlashX
