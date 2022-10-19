import React from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppLogo from './AppLogo';
import AccountMenu from './AccountMenu';
import SearchMenu from './SearchMenu';
import SearchMenuDrawer from './SearchMenuDrawer';
import HomeIcon from '@mui/icons-material/Home';

const AppHeader = ({currentUser}) => {
  return (
    <>
      <AppBar position="fixed" id="app-header" >
        <Toolbar>
          <SearchMenuDrawer sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} />
          <AppLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: "space-evenly" }}>
            <Button size="large" color="inherit" href="/" startIcon={<HomeIcon />}  >
              ホーム
            </Button>
            <SearchMenu />
          </Box>
          {currentUser
            ? <AccountMenu currentUser={currentUser} />
            : <Box sx={{ display: 'flex' }}>
                <Button color="inherit" variant="outlined" href="/signup" sx={{ mr: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '5px', sm: '5px 15px' } }}>新規登録</Button>
                <Button color="inherit" variant="outlined" href="/login" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, padding: { xs: '5px', sm: '5px 15px' } }}>ログイン</Button>
              </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppHeader
