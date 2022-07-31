import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import NoMountainImage from 'images/no_mountain_image.jpeg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

const CustomPaper = styled(Paper)({
  height: '30vmin',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
});

const MountainLineup = ({mountains, prefecture, region, area, tag}) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ py: 3 }}>
          <Link href="/mountains" underline="hover" color="inherit">山を探す</Link>
          {prefecture &&
            <Link href={"/mountains/regions/"+region.id} underline="hover" color="inherit">{region.name+"地方"}</Link>
          }
          {prefecture &&
            <Typography>{prefecture.name}</Typography>
          }
          {region && !prefecture &&
            <Typography>{region.name+"地方"}</Typography>
          }
          {area &&
            <Typography>{area.name}</Typography>
          }
          {tag &&
            <Typography>{tag.name}</Typography>
          }
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

export default MountainLineup
