import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AppFooter = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', height: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center'}} >©︎ 2022 j.takeuchi</Typography>
    </Box>
  );
};

export default AppFooter
