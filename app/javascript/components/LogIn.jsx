import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const LogIn = ({user, token}) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container maxWidth="sm" sx={{ py: '40px'}}>
      <Box id="login-box" sx={{ p: { xs: '16px', sm: '40px' }, bgcolor: '#cfe8fc' }}>
        <Typography variant={matches ? "h4" : "h5"} align="center" sx={{ mb: { xs: '8px', sm: '24px' } }}>ログイン</Typography>
        <form action="/login" method="post">
          <input name="authenticity_token" type="hidden" value={token} />
          <InputEmail control={control} name="session[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <InputPassword control={control} name="session[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Typography variant={matches ? "body1" : "body2"} component="p" align="center"><Link href="/password_resets/new" underline="hover">パスワードをお忘れの方はこちら</Link></Typography>
          <FormGroup sx={{ mt: '16px' }}>
            <FormControlLabel
              control={<Checkbox id="remember-me-checkbox" size={matches ? "medium" : "small"} />}
              name="session[remember_me]"
              label={<Typography variant={matches ? "body1" : "body2"}>ログイン状態を保持する</Typography>}
            />
          </FormGroup>
          <Button type="submit" variant="contained" fullWidth size={matches ? "medium" : "small"} sx={{ mt: '8px' }}>ログインする</Button>
          <Typography variant={matches ? "body1" : "body2"} component="p" align="center" sx={{ mt: '24px' }}>アカウントをお持ちでない方は<Link href="/signup" underline="hover">新規登録</Link></Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LogIn
