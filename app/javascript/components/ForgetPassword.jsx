import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputEmail from './InputEmail';
import { useForm } from 'react-hook-form';

const ForgetPassword = (props) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;

  return (
    <Container maxWidth="sm" sx={{ py: 5}}>
      <Box sx={{ p: 5, bgcolor: '#cfe8fc' }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>パスワード再設定のご案内</Typography>
        <Typography variant="body1">アカウントのメールアドレス宛にパスワード再設定用のURLをお送りします。</Typography>
        <form action="/password_resets" method="post">
          <input name="authenticity_token" type="hidden" value={props.token} />
          <InputEmail control={control} name="password_reset[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>メールを送信する</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPassword
