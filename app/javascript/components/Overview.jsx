import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MapAndBinoculars from 'images/map_and_binoculars.jpeg';
import LandscapeAndBinoculars from 'images/landscape_and_binoculars.jpeg';
import Photographer from 'images/photographer.jpeg';
import PcAndCamera from 'images/pc_and_camera.jpeg';

const Overview = ({currentUser}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.pageYOffset;
    window.scrollTo({
      top: elementTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div id="overview">
      <Box id="overview-1st" sx={{ height: '100vh', bgcolor: '#f5f5f5', boxSizing: 'border-box', paddingTop: { xs: '56px', sm: '64px' } }}>
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Box sx={{ height: '90%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-evenly' }} >
            <Card sx={{ width: { xs: '90%', md: '45%' }, height: { xs: '45%', md: '80%' }, display: { xs: 'flex', md: 'block' } }}>
              <CardMedia component="img" image={MapAndBinoculars} alt="map_and_binoculars" sx={{ height: { xs: '100%', md: '50%' }, width: { xs: '50%', md: '100%' } }} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: { xs: '100%', md: '50%' }, boxSizing: 'border-box', overflowY: 'scroll' }}>
                <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>山を探す</Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>名前または地域から検索し、目的の山を見つけよう。</Typography>
                <CardActions sx={{ justifyContent: 'center', marginTop: 'auto', padding: '0px' }}>
                  <Button href="/mountains" variant="contained" color="primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>山を探す</Button>
                </CardActions>
              </CardContent>
            </Card>
            <Card sx={{ width: { xs: '90%', md: '45%' }, height: { xs: '45%', md: '80%' }, display: { xs: 'flex', md: 'block' } }}>
              <CardMedia component="img" image={LandscapeAndBinoculars} alt="landscape_and_binoculars" sx={{ height: { xs: '100%', md: '50%' }, width: { xs: '50%', md: '100%' } }} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: { xs: '100%', md: '50%' }, boxSizing: 'border-box', overflowY: 'scroll' }}>
                <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>みんなの写真を眺める</Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>ユーザーが投稿した写真はメッセージと共に地図上に残されています。写真に「いいね」をするとお気に入り登録することができます。</Typography>
              </CardContent>
            </Card>
          </Box>
          <Button sx={{ height: '10%' }} color="inherit" onClick={() => scrollToElement("overview-2nd")}>
            <Typography variant="h6">More</Typography>
            <KeyboardArrowDownIcon fontSize="large" color="inherit" />
          </Button>
        </Container>
      </Box>
      <Box id="overview-2nd" sx={{ height: '100vh', bgcolor: '#f5f5f5', boxSizing: 'border-box', paddingTop: { xs: '56px', sm: '64px' } }}>
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Box sx={{ height: '90%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-evenly' }} >
            <Card sx={{ width: { xs: '90%', md: '45%' }, height: { xs: '40%', md: '80%' }, display: { xs: 'flex', md: 'block' } }}>
              <CardMedia component="img" image={Photographer} alt="photographer" sx={{ height: { xs: '100%', md: '50%' }, width: { xs: '50%', md: '100%' } }} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: { xs: '100%', md: '50%' }, boxSizing: 'border-box', overflowY: 'scroll' }}>
                <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>写真を撮る</Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>ハイキング・登山で写真を撮ろう。(GPS機能をONにして位置データを記録しておくと役に立ちます。)</Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: { xs: '90%', md: '45%' }, height: { xs: '40%', md: '80%' }, display: { xs: 'flex', md: 'block' } }}>
              <CardMedia component="img" image={PcAndCamera} alt="pc_and_camera" sx={{ height: { xs: '100%', md: '50%' }, width: { xs: '50%', md: '100%' } }} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: { xs: '100%', md: '50%' }, boxSizing: 'border-box', overflowY: 'scroll' }}>
                <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>写真をシェアする</Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>地図上にピンを立てて、お気に入りの写真をメッセージと共に投稿しよう。</Typography>
                {!currentUser &&
                  <CardActions sx={{ justifyContent: 'center', marginTop: 'auto', padding: '0px' }}>
                    <Button href="/signup" variant="contained" color="primary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>新規登録</Button>
                  </CardActions>
                }
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
            <Typography variant="body1" sx={{ mr: 1 }}>TOP</Typography>
            <Fab size="small" onClick={scrollToTop}>
              <KeyboardDoubleArrowUpIcon />
            </Fab>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Overview
