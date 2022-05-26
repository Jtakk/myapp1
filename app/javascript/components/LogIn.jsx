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

const LogIn = (props) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;

  return (
    <Container maxWidth="sm" sx={{ py: 5}}>
      <Box sx={{ p: 5, bgcolor: '#cfe8fc' }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>Log In</Typography>
        <form action="/login" method="post">
          <input name="authenticity_token" type="hidden" value={props.token} />
          <InputEmail control={control} name="session[email]" defaultValue="" rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <InputPassword control={control} name="session[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Typography variant="body1" component="p" align="center"><Link href="/password_resets/new" underline="hover">パスワードをお忘れの方はこちら</Link></Typography>
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel control={<Checkbox id="remember-me-checkbox" />} name="session[remember_me]" label="ログイン状態を保持する" />
          </FormGroup>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>ログインする</Button>
          <Typography variant="body1" component="p" align="center" sx={{ mt: 3 }}>アカウントをお持ちでない方は<Link href="/signup" underline="hover">新規登録</Link></Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LogIn
