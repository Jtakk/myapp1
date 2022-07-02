import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CustomBox = styled(Box)({
  position: 'relative',
  width: '100%',
  '&::before': {
    content: '""',
    display: 'block',
    paddingTop: '75%',
  },
});

const BGPaper = styled(Paper)({
  backgroundSize: 'cover',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  color: '#ffffff',
  padding: '24px',
});

const MountainHeader = (props) => {
  return (
    <CustomBox>
      <BGPaper sx={{ backgroundImage: `url(${props.mountain.image.url})` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">{props.mountain.yomi}</Typography>
            <Typography variant="h2">{props.mountain.name}</Typography>
          </Box>
          <Typography variant="h4">{"標高: "+props.mountain.elevation+" m"}</Typography>
        </Box>
        <Typography variant="body1">{props.mountain.introduction}</Typography>
      </BGPaper>
    </CustomBox>
  );
};

export default MountainHeader
