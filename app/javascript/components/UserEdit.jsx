import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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

const UserEdit = (props) => {
  const { control } = useForm({
    mode: "onChange"
  });
  const validEmailRegex = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/i;

  return (
    <Container sx={{ height: '100%', py: 5, bgcolor: '#f5f5f5' }}>
      <Box sx={{ p: 5, backgroundColor: '#ffffff', borderRadius: '6px', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.3)'}}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>アカウント設定</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 2 }}>
          <Avatar sx={{ width: 150, height: 150 }} alt={props.user.name} src={props.user.avatar.url} />
          {!(props.user.avatar.url) && <Typography variant="body2" color="#a9a9a9" sx={{ mt: 1 }}>アイコン画像が設定されていません</Typography>}
        </Box>
        <form action={"/users/"+props.user.id} method="post" encType="multipart/form-data" noValidate>
          <input type="hidden" name="_method" value="patch" />
          <input name="authenticity_token" type="hidden" value={props.token} />
          <UploadAvatar name="user[avatar]" sx={{ my: 2 }} />
          <InputName control={control} name="user[name]" defaultValue={props.user.name} rules={{ required: true, maxLength: 30 }} />
          <InputEmail control={control} name="user[email]" defaultValue={props.user.email} rules={{ required: true, maxLength: 255, pattern: validEmailRegex }} />
          <InputPassword control={control} name="user[password]" defaultValue="" />
          <InputPasswordConfirmation control={control} name="user[password_confirmation]" defaultValue="" />
          <InputIntroduction control={control} name="user[introduction]" defaultValue={props.user.introduction} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>変更を保存する</Button>
        </form>
        <Box sx={{ mt: 5 }}>
          <DeleteUser user={props.user} />
        </Box>
      </Box>
    </Container>
  );
};

export default UserEdit
