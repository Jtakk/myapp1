import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const InputIntroduction = (props) => {
  const {
    field: { ref, onChange, onBlur, name, value },
    fieldState
  } = useController(props);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
      size={matches ? "medium" : "small"}
    />
  );
};

export default InputIntroduction
