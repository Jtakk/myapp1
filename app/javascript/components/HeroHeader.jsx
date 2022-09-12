import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PostsFeed from './PostsFeed';

const HeroBg = styled(Box)(({theme}) => ({
  backgroundImage: "url(/assets/heroheader.jpg)",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
  height: '100vh',
  marginTop: '-56px',
  [theme.breakpoints.up('sm')]: {
    marginTop: '-64px',
  },
}));

const CustomCard = styled(Card)(({theme}) => ({
  backgroundColor: 'rgba(0,0,0,0.5)',
  maxHeight: '75%',
  overflowY: 'scroll',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

const HeroHeader = ({posts, currentUser}) => {
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
    <HeroBg>
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >
          <CustomCard>
            <CardContent>
              <Typography sx={{ color: '#fff', mb: 2 }} variant="h3" align="center">TITLE</Typography>
              <Typography sx={{ color: '#fff', mb: 1 }} variant="body1" align="center">素晴らしい山の景色をみんなで共有しよう!</Typography>
              <Typography sx={{ color: '#fff' }} variant="body1" align="center">→ <Link component="button" variant="body1" underline="hover" sx={{ color: '#fff' }} onClick={() => scrollToElement("overview-1st")}>どんなことができる？</Link></Typography>

            </CardContent>
            <CardActions sx={{ justifyContent: 'space-around' }}>
              <Button variant="contained" size="large" href="/signup">新規登録</Button>
              <Button variant="contained" size="large" href="/login">ログイン</Button>
            </CardActions>
            <CardContent>
              <PostsFeed posts={posts} currentUser={currentUser} />
            </CardContent>
          </CustomCard>
        </Box>
        <Button sx={{ height: '10%', backgroundColor: 'rgba(0,0,0,0.7)' }} color="primary" onClick={() => scrollToElement("overview-1st")}>
          <Typography variant="h6" sx={{ color: '#fff' }}>About</Typography>
          <KeyboardArrowDownIcon fontSize="large" sx={{ color: '#fff' }} />
        </Button>
      </Container>
    </HeroBg>
  );
};

export default HeroHeader
