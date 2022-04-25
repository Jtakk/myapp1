import React from 'react';
import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

const InputEmail = (props) => {
  const {
    field: { ref, onChange, onBlur, name, value },
    fieldState
  } = useController(props);
  const showError = (e) => {
    switch (e){
      case "required":
        return "入力必須項目";
        break;
      case "maxLength":
        return "30文字以内";
        break;
      case "pattern":
        return "無効なメールアドレス";
        break;
    }
  };
  return (
    <TextField
      fullWidth
      required
      label="メールアドレス"
      type="email"
      placeholder="test@example.com"
      variant="outlined"
      margin="normal"
      inputRef={ref}
      name={name}
      value={value}
      onChange={onChange}
      error={Boolean(fieldState.error)}
      helperText={showError(fieldState.error?.type)}
    />
  );
};

export default InputEmail
