import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppLogoHorizontal } from './AppLogoLinks';

const AppFooter = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', height: '70px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'space-evenly', sm: 'center' }, alignItems: 'center' }}>
      <Box sx={{ height: { xs: '20px', sm: '24px' } }}>
        <AppLogoHorizontal/>
      </Box>
      <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center', ml: { sm: '16px' } }} >©︎ 2023 j.takeuchi</Typography>
    </Box>
  );
};

export default AppFooter
