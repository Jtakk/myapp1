import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UserProfile = (props) => {
  return (
    <Container sx={{ height: '100%', py: 5, bgcolor: '#f5f5f5' }}>
      <Box sx={{ p: 5, backgroundColor: '#ffffff', borderRadius: '6px', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.3)'}}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>プロフィール</Typography>
        <p>{props.user.name}</p>
        <p>{props.user.email}</p>
        <p>{props.user.introduction}</p>
      </Box>
    </Container>
  );
};

export default UserProfile
