import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeroBgImage from 'images/heroheader.jpg';
import PostsFeed from './PostsFeed';
import AppTitle from 'images/app_title.svg';
import useMediaQuery from "@mui/material/useMediaQuery";

const HeroBg = styled(Box)(({theme}) => ({
  backgroundImage: `url(${HeroBgImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
  height: '100vh',
  boxSizing: 'border-box',
  marginTop: '-56px',
  paddingTop: '56px',
  [theme.breakpoints.up('sm')]: {
    marginTop: '-64px',
    paddingTop: '64px',
  },
}));

const CustomCard = styled(Card)(({theme}) => ({
  backgroundColor: 'rgba(0,0,0,0.6)',
  maxHeight: '85%',
  overflowY: 'scroll',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '60%',
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <HeroBg id="hero-header">
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >
          <CustomCard>
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <img alt="Trekker's View" src={AppTitle} style={{ height: 'auto', width: '100%', verticalAlign: 'middle' }} />
              </Box>
              <Typography sx={{ color: '#fff', mt: '24px', mb: '8px', fontSize: { sm: '1rem' } }} variant="body2" align="center">素晴らしい山の景色をみんなで共有しよう!</Typography>
              <Typography sx={{ color: '#fff', fontSize: { sm: '1rem' } }} variant="body2" align="center">
                → <Link component="button" variant="body2" underline="hover" sx={{ color: '#fff', fontSize: { sm: '1rem' } }} onClick={() => scrollToElement("overview-1st")}>どんなことができる？</Link>
              </Typography>
            </CardContent>
            {!currentUser &&
              <CardActions sx={{ justifyContent: 'space-evenly' }}>
                <Button variant="contained" size={matches ? "large" : "medium"} href="/signup" >新規登録</Button>
                <Button variant="contained" size={matches ? "large" : "medium"} href="/login" >ログイン</Button>
              </CardActions>
            }
            <CardContent>
              <PostsFeed posts={posts} />
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
