import React from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppLogo from './AppLogo';
import AccountMenu from './AccountMenu';

const AppHeader = (props) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <AppLogo />
          {props.isLoggedIn
            ? <AccountMenu currentUser={props.currentUser} />
            : <Button color="inherit" variant="outlined" href="/login">ログイン</Button>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppHeader
