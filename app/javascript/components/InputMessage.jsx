import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

const InputMessage = (props) => {
  const {
    field: { ref, onChange, onBlur, name, value },
    fieldState
  } = useController(props);

  return (
    <TextField
      fullWidth
      multiline
      label="メッセージ"
      placeholder=""
      variant="outlined"
      margin="normal"
      inputRef={ref}
      name={name}
      value={value}
      rows={4}
      onChange={onChange}
    />
  );
};

export default InputMessage
