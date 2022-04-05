import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const AppLogo = () => {
  return (
    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
      <Link href="/" underline="none" color="white" id="app-logo">Myapp1</Link>
    </Typography>
  );
};

export default AppLogo
