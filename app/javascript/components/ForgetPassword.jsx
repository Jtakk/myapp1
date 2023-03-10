import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputEmail from './InputEmail';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const ForgetPassword = ({token}) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container maxWidth="sm" sx={{ py: '40px' }}>
      <Box sx={{ p: { xs: '16px', sm: '40px' }, bgcolor: '#cfe8fc' }}>
        <Typography variant={matches ? "h4" : "h5"} align="center" sx={{ mb: { xs: '8px', sm: '24px' } }}>パスワード再設定のご案内</Typography>
        <Typography variant={matches ? "body1" : "body2"}>アカウントのメールアドレス宛にパスワード再設定用のURLをお送りします。</Typography>
        <form action="/password_resets" method="post">
          <input name="authenticity_token" type="hidden" value={token} />
          <InputEmail control={control} name="password_reset[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <Button type="submit" variant="contained" fullWidth size={matches ? "medium" : "small"} sx={{ mt: '16px' }}>メールを送信する</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPassword
