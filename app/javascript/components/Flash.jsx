import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Flash = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={9000}>
      <Alert onClose={handleClose} variant="filled" severity={props.message_type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Flash
