import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputPassword from './InputPassword';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const ResetPassword = ({user, id, token}) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container maxWidth="sm" sx={{ py: '40px' }}>
      <Box sx={{ p: { xs: '16px', sm: '40px' }, bgcolor: '#cfe8fc' }}>
        <Typography variant={matches ? "h4" : "h5"} align="center" sx={{ mb: { xs: '8px', sm: '24px' } }}>パスワード再設定</Typography>
        <form action={"/password_resets/"+id} method="post">
          <input type="hidden" name="_method" value="patch" />
          <input name="authenticity_token" type="hidden" value={token} />
          <input name="email" type="hidden" value={user.email} />
          <InputPassword control={control} name="user[password]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" rules={{ required: true, minLength: 6 }} />
          <Button type="submit" variant="contained" fullWidth size={matches ? "medium" : "small"} sx={{ mt: '16px' }}>パスワードを再設定する</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword
