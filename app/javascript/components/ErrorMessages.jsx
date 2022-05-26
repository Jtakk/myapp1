import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ErrorMessages = (props) => {
  return (
    <Stack sx={{ width: '90%', mx: 'auto', my: 1 }} spacing={1}>
      {props.messages.map( (e) => <Alert severity="error">{e}</Alert> )}
    </Stack>
  );
};

export default ErrorMessages
