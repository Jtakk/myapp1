import React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import UserSideMenuWrapper from './UserSideMenuWrapper';
import useMediaQuery from "@mui/material/useMediaQuery";

const UserProfile = ({user, isCurrentUser}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <UserSideMenuWrapper user={user} isCurrentUser={isCurrentUser} >
      <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Paper elevation={3} sx={{ p: { xs: '20px 10px', sm: '40px' } }}>
            <Typography variant={matches ? "h5" : "h6"} align="center" sx={{ mb: { xs: 0, sm: '24px' } }}>プロフィール</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' } }} alt={user.name} src={user.avatar.url} />
            </Box>
            <Box>
              <Box sx={{ mb: '32px' }} >
                <Typography variant="body2" sx={{ m: '0 0 8px 8px' }} >ニックネーム</Typography>
                <Typography variant="body2" sx={{ m: { xs: '0 24px 8px', sm: '0 40px 8px', md: '0 70px 8px' }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }} >{user.name}</Typography>
                <Divider />
              </Box>
              {isCurrentUser &&
                <Box sx={{ mb: '32px' }} >
                  <Typography variant="body2" sx={{ m: '0 0 8px 8px' }} >メールアドレス(非公開)</Typography>
                  <Typography variant="body2" sx={{ m: { xs: '0 24px 8px', sm: '0 40px 8px', md: '0 70px 8px' }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }} >{user.email}</Typography>
                  <Divider />
                </Box>
              }
              <Box >
                <Typography variant="body2" sx={{ m: '0 0 8px 8px' }} >紹介文</Typography>
                <Typography variant="body2" sx={{ m: { xs: '0 24px 8px', sm: '0 40px 8px', md: '0 70px 8px' }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, overflowWrap: 'break-word' }} >{user.introduction}</Typography>
                <Divider />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </UserSideMenuWrapper>
  );
};

export default UserProfile
