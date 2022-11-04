import React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import UploadAvatar from './UploadAvatar';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import InputIntroduction from './InputIntroduction';
import Button from '@mui/material/Button';
import DeleteUser from './DeleteUser';
import { useForm } from 'react-hook-form';
import UserSideMenuWrapper from './UserSideMenuWrapper';
import useMediaQuery from "@mui/material/useMediaQuery";

const UserEdit = ({ user, isCurrentUser, token }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;

  return (
    <UserSideMenuWrapper user={user} isCurrentUser={isCurrentUser} >
      <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Paper elevation={3} sx={{ p: { xs: '20px 10px', sm: '40px' } }} >
            <Typography variant={matches ? "h5" : "h6"} align="center" sx={{ mb: { xs: 0, sm: '24px' } }}>アカウント設定</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 2 }}>
              <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' } }} alt={user.name} src={user.avatar.url} />
              {!(user.avatar.url) && <Typography variant="body2" color="#a9a9a9" sx={{ mt: '8px', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>アイコン画像が設定されていません</Typography>}
            </Box>
            <form action={"/users/"+user.id} method="post" encType="multipart/form-data" noValidate>
              <input type="hidden" name="_method" value="patch" />
              <input name="authenticity_token" type="hidden" value={token} />
              <UploadAvatar name="user[avatar]" sx={{ my: 2 }} />
              <InputName control={control} name="user[name]" defaultValue={user.name} rules={{ required: true, maxLength: 30 }} />
              <InputEmail control={control} name="user[email]" defaultValue={user.email} rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
              <InputPassword control={control} name="user[password]" defaultValue="" />
              <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" />
              <InputIntroduction control={control} name="user[introduction]" defaultValue={user.introduction ? user.introduction : ""} />
              <Box sx={{ mt: '40px', textAlign: 'center' }}>
                <Button type="submit" variant="contained" size={matches ? "medium" : "small"} >変更を保存する</Button>
              </Box>
            </form>

              <DeleteUser user={user} sx={{ mt: '40px', textAlign: 'right' }} />
            
          </Paper>
        </Container>
      </Box>
    </UserSideMenuWrapper>
  );
};

export default UserEdit
