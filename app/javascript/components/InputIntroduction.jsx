import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

const InputIntroduction = (props) => {
  const {
    field: { ref, onChange, onBlur, name, value },
    fieldState
  } = useController(props);

  return (
    <TextField
      fullWidth
      multiline
      label="紹介文"
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

export default InputIntroduction
