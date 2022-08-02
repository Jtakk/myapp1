import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import NoMountainImage from 'images/no_mountain_image.jpeg';

const CustomPaper = styled(Paper)({
  height: '30vmin',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
});

const MountainSearch = ({keyword, mountains, resultCount}) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Paper component="form" action="/mountains/search" method="get" sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: '500px' }}>
            <InputBase sx={{ flex: 1 }} defaultValue={keyword} placeholder="山名検索" name="keyword" inputProps={{ 'type': 'text' }} />
            <Button type="submit" sx={{ p: '10px' }}>検索</Button>
          </Paper>
        </Box>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ py: 3 }}>
          <Link href="/mountains" underline="hover" color="inherit">山を探す</Link>
          <Typography variant="body1">" {keyword} "の検索結果 {resultCount}件</Typography>
        </Breadcrumbs>
        <Stack spacing={3}>
          {mountains.map((mountain, i) => (
            <CustomPaper component="a" href={"/mountains/"+mountain.id} elevation={3} key={i}>
              <Box sx={{ p: 1, overflow: 'hidden' }}>
                <Typography variant="body2">{mountain.yomi}</Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>{mountain.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{"標高: "+mountain.elevation+" m"}</Typography>
                <Typography variant="body2" sx={{ overflow: 'hidden' }}>{mountain.introduction}</Typography>
              </Box>
              <Box sx={{ width: '30vmax', height: '100%', flexShrink: '0' }}><img className="index-image" alt={mountain.name} src={mountain.image.url ? mountain.image.url : NoMountainImage} /></Box>
            </CustomPaper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default MountainSearch
