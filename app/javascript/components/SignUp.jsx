import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import { useForm } from 'react-hook-form';

const SignUp = (props) => {
  const { control, handleSubmit } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i

  return (
    <Container maxWidth="sm" sx={{ py: 5}}>
      <Box sx={{ p: 5, bgcolor: '#cfe8fc' }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>Sign Up</Typography>
        <form action="/users" method="post" onSubmit={handleSubmit()}>
          <input name="authenticity_token" type="hidden" value={props.token} />
          <InputName control={control} name="user[name]" defaultValue="" rules={{ required: true, maxLength: 30 }} />
          <InputEmail control={control} name="user[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <InputPassword control={control} name="user[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>アカウントを作成する</Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp
