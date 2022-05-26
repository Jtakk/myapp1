import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputPassword from './InputPassword';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import { useForm } from 'react-hook-form';

const ResetPassword = (props) => {
  const { control } = useForm({
    mode: "onChange"
  });

  return (
    <Container maxWidth="sm" sx={{ py: 5}}>
      <Box sx={{ p: 5, bgcolor: '#cfe8fc' }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>パスワード再設定</Typography>
        <form action={"/password_resets/"+props.id} method="post">
          <input type="hidden" name="_method" value="patch" />
          <input name="authenticity_token" type="hidden" value={props.token} />
          <input name="email" type="hidden" value={props.user.email} />
          <InputPassword control={control} name="user[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>パスワードを再設定する</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword
