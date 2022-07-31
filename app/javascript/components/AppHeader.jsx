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

const AppHeader = ({currentUser}) => {
  return (
    <>
      <AppBar position="fixed" >
        <Toolbar>
          <SearchMenuDrawer sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} />
          <AppLogo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <SearchMenu />
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
