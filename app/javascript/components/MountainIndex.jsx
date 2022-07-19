import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const CustomPaper = styled(Paper)({
  height: '30vmin',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
});

const MountainIndex = (props) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Stack spacing={3}>
          {props.mountains.map((mountain, i) => (
            <CustomPaper component="a" href={"/mountains/"+mountain.id} elevation={3} key={i}>
              <Box sx={{ p: 1, overflow: 'hidden' }}>
                <Typography variant="body2">{mountain.yomi}</Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>{mountain.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{"標高: "+mountain.elevation+" m"}</Typography>
                <Typography variant="body2" sx={{ overflow: 'hidden' }}>{mountain.introduction}</Typography>
              </Box>
              <Box sx={{ width: '30vmax', height: '100%', flexShrink: '0' }}><img className="index-image" alt={mountain.name} src={mountain.image.url} /></Box>
            </CustomPaper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default MountainIndex
