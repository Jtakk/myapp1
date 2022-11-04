import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const InputPasswordConfirmation = (props) => {
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
      label="パスワード再入力"
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

export default InputPasswordConfirmation
