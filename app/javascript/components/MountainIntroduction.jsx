import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NoMountainImage from 'images/no_mountain_image.jpeg';
import LinkChips from './LinkChips';
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ width: '100%' }} id="mountain-introduction" >
      <Box sx={{ width: '100%' }}>
        <img src={mountain.image.url ? mountain.image.url : NoMountainImage} style={{ width: '100%', height: 'auto', verticalAlign: 'top' }} />
      </Box>
      <IntroBox>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>{mountain.yomi}</Typography>
        <Typography variant={matches ? "h4" : "h5"}>{mountain.name}</Typography>
        <Typography variant={matches ? "h6" : "body1"} align="right" sx={{ mb: '16px' }}>{"標高: "+mountain.elevation+" m"}</Typography>
        <LinkChips prefectures={mountain.prefectures} areas={mountain.areas} tags={mountain.tags} color="primary" sx={{ mb: '8px' }} />
        <Typography variant={matches ? "body1" : "body2"}>{mountain.introduction}</Typography>
      </IntroBox>
    </Box>
  );
};

export default MountainIntroduction
