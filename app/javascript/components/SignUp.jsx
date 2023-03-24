import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const SignUp = ({user, token}) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container maxWidth="sm" sx={{ py: '40px' }}>
      <Box id="signup-box" sx={{ p: { xs: '16px', sm: '40px' }, bgcolor: '#cfe8fc' }}>
        <Typography variant={matches ? "h4" : "h5"} align="center" sx={{ mb: { xs: '8px', sm: '24px' } }}>新規登録</Typography>
        <form action="/users" method="post">
          <input name="authenticity_token" type="hidden" value={token} />
          <InputName control={control} name="user[name]" defaultValue="" rules={{ required: true, maxLength: 30 }} />
          <InputEmail control={control} name="user[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <InputPassword control={control} name="user[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size={matches ? "medium" : "small"} sx={{ mt: '40px' }}>アカウントを作成する</Button>
          </Box>
          <Typography variant={matches ? "body1" : "body2"} component="p" align="center" sx={{ mt: '24px' }}>既にアカウントをお持ちの方は<Link href="/login" underline="hover">ログイン</Link></Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp
