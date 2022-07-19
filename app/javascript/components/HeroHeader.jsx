import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

const HeroHeader = () => {
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
              <Typography sx={{ color: '#ffffff' }} variant="h4" align="center">TITLE</Typography>
              <Typography sx={{ color: '#ffffff' }} variant="body1"></Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-around' }}>
              <Button variant="contained" href="">About</Button>
              <Button variant="contained" href="/signup">景色を探す</Button>
            </CardActions>
          </CustomCard>
        </Box>
        <Button sx={{ height: '10%', backgroundColor: 'rgba(0,0,0,0.7)' }} color="primary" onClick={() => scrollToElement("overview-1st")}>
          <Typography variant="h6" sx={{ color: '#ffffff' }}>About</Typography>
          <KeyboardArrowDownIcon fontSize="large" sx={{ color: '#ffffff' }} />
        </Button>
      </Container>
    </HeroBg>
  );
};

export default HeroHeader
