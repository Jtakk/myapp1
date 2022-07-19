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

const AppHeader = ({currentUser}) => {
  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <AppLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" href="/mountains">名前から探す</Button>
            <Button color="inherit" href="/mountains">地域から探す</Button>
          </Box>
          {currentUser
            ? <AccountMenu currentUser={currentUser} />
            : <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color="inherit" variant="outlined" href="/signup" sx={{ mr: 2 }}>新規登録</Button>
                <Button color="inherit" variant="outlined" href="/login">ログイン</Button>
              </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppHeader
