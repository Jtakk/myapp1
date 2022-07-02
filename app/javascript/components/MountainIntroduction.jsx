import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const IntroBox = styled(Box)({
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  background: 'rgba(0,0,0,0.8)',
  padding: '16px',
});

const MountainIntroduction = ({mountain}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <img src={mountain.image.url} style={{ width: '100%', height: 'auto', verticalAlign: 'top' }} />
      </Box>
      <IntroBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">{mountain.yomi}</Typography>
            <Typography variant="h4">{mountain.name}</Typography>
          </Box>
          <Typography variant="h6">{"標高: "+mountain.elevation+" m"}</Typography>
        </Box>
        <Typography variant="body1">{mountain.introduction}</Typography>
      </IntroBox>
    </Box>
  );
};

export default MountainIntroduction