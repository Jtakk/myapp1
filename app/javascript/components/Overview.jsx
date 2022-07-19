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

const Overview = () => {
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
    <>
      <Box id="overview-1st" sx={{ height: '100vh', bgcolor: '#f5f5f5', boxSizing: 'border-box', paddingTop: '64px' }}>
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Box sx={{ height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} >
            <Card sx={{ width: '45%', height: '80%' }}>
              <CardMedia component="img" image="assets/map_and_binoculars.jpeg" alt="map_and_binoculars" height="50%" />
              <CardContent sx={{ minHeight: '30%' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>山を探す</Typography>
                <Typography variant="body2">名前または地域から検索し、目的の山を見つけよう。</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button href="/mountains" variant="contained" color="primary">探す</Button>
              </CardActions>
            </Card>
            <DoubleArrowIcon sx={{ fontSize: { xs: 30, md: 50 } }} color="primary" />
            <Card sx={{ width: '45%', height: '80%' }}>
              <CardMedia component="img" image="assets/landscape_and_binoculars.jpeg" alt="landscape_and_binoculars" height="50%" />
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>みんなの写真を眺める</Typography>
                <Typography variant="body2">ユーザーが投稿した写真はメッセージと共に地図上に残されています。写真に「いいね」をするとお気に入り登録することができます。</Typography>
              </CardContent>
            </Card>
          </Box>
          <Button sx={{ height: '10%' }} color="inherit" onClick={() => scrollToElement("overview-2nd")}>
            <Typography variant="h6">More</Typography>
            <KeyboardArrowDownIcon fontSize="large" color="inherit" />
          </Button>
        </Container>
      </Box>
      <Box id="overview-2nd" sx={{ height: '100vh', bgcolor: '#f5f5f5', boxSizing: 'border-box', paddingTop: '64px' }}>
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Box sx={{ height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} >
            <Card sx={{ width: '45%', height: '80%' }}>
              <CardMedia component="img" image="assets/photographer.jpeg" alt="photographer" height="50%" />
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>写真を撮る</Typography>
                <Typography variant="body2">ハイキング・登山で写真を撮ろう。(GPS機能をONにして位置データを記録しておくと役に立ちます。)</Typography>
              </CardContent>
            </Card>
            <DoubleArrowIcon sx={{ fontSize: { xs: 30, md: 50 } }} color="primary" />
            <Card sx={{ width: '45%', height: '80%' }}>
              <CardMedia component="img" image="assets/pc_and_camera.jpeg" alt="pc_and_camera" height="50%" />
              <CardContent sx={{ minHeight: '30%' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>写真をシェアする</Typography>
                <Typography variant="body2">地図上にピンを立てて、お気に入りの写真をメッセージと共に投稿しよう。</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-around' }}>
                <Button href="/signup" variant="contained" color="primary">新規登録</Button>
                <Button href="/login" variant="contained" color="primary">ログイン</Button>
              </CardActions>
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
    </>
  );
};

export default Overview
