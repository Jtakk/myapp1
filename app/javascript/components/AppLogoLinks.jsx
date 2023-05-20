import React from "react";
import Link from '@mui/material/Link';
import HorizontalSVG from 'images/app_logo_horizontal.svg';
import VerticalSVG from 'images/app_logo_vertical.svg';
import ImageOnlySVG from 'images/app_logo_image_only.svg';

const AppLogoHorizontal = () => {
  return (
    <Link href="/" sx={{ display: 'block', height: '100%'}}>
      <img alt="Trekker's View" src={HorizontalSVG} style={{ height: '100%', width: 'auto', verticalAlign: 'middle' }} />
    </Link>
  );
};

const AppLogoVertical = () => {
  return (
    <Link href="/" sx={{ display: 'block', height: '100%' }}>
      <img alt="Trekker's View" src={VerticalSVG} style={{ height: '100%', width: 'auto', verticalAlign: 'middle' }} />
    </Link>
  );
};

const AppLogoImageOnly = () => {
  return (
    <Link href="/" sx={{ display: 'block', height: '100%' }}>
      <img alt="Trekker's View" src={ImageOnlySVG} style={{ height: '100%', width: 'auto', verticalAlign: 'middle' }} />
    </Link>
  );
};

export { AppLogoHorizontal, AppLogoVertical, AppLogoImageOnly }
