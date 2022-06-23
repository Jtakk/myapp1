import React from 'react';
import TextField from '@mui/material/TextField';

const InputMessage = ({name, value, defaultValue, placeholder, onChange}) => {
  return (
    <TextField
      fullWidth
      multiline
      label="メッセージ"
      placeholder={placeholder}
      variant="outlined"
      margin="normal"
      name={name}
      value={value}
      defaultValue={defaultValue}
      rows={4}
      onChange={onChange}
    />
  );
};

export default InputMessage
