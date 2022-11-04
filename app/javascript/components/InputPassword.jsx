import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const InputPassword = (props) => {
  const {
    field: { ref, onChange, onBlur, name, value },
    fieldState
  } = useController(props);
  const showError = (e) => {
    switch (e){
      case "required":
        return "入力必須項目";
        break;
      case "minLength":
        return "6文字以上";
        break;
    }
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <TextField
      fullWidth
      required
      label="パスワード (半角英数6文字以上)"
      type="password"
      placeholder=""
      variant="outlined"
      margin="normal"
      inputRef={ref}
      name={name}
      value={value}
      onChange={onChange}
      error={Boolean(fieldState.error)}
      helperText={showError(fieldState.error?.type)}
      size={matches ? "medium" : "small"}
    />
  );
};

export default InputPassword
