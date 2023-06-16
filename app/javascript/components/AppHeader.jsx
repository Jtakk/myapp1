import React from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppLogoHorizontal, AppLogoVertical, AppLogoImageOnly } from './AppLogoLinks';
import AccountMenu from './AccountMenu';
import SearchMenu from './SearchMenu';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const AppHeader = ({currentUser}) => {
  const theme = useTheme();
  const lowMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const highMatches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <AppBar position="fixed" id="app-header" >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box id="app-logo-link" sx={{ height: { xs: '40px', sm: '45px' } }}>
            {highMatches
              ? <AppLogoHorizontal/>
              : lowMatches
                ? <AppLogoVertical/>
                : <AppLogoImageOnly/>
            }
          </Box>
          {highMatches
            ? <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "space-evenly" }}>
                <Button size="large" color="inherit" href="/" startIcon={<HomeIcon />}  >
                  ホーム
                </Button>
                <SearchMenu />
              </Box>
            : <Box>
                <SearchMenu />
              </Box>
          }
          {currentUser
            ? <AccountMenu currentUser={currentUser} />
            : <Box sx={{ display: 'flex' }}>
                <Button color="inherit" variant="outlined" href="/signup" sx={{ mr: '8px', height: '34px', fontSize: { xs: '0.75rem', sm: '0.875rem' }, p: { xs: '5px', sm: '5px 15px' } }}>新規登録</Button>
                <Button color="inherit" variant="outlined" href="/login" sx={{ height: '34px', fontSize: { xs: '0.75rem', sm: '0.875rem' }, p: { xs: '5px', sm: '5px 15px' } }}>ログイン</Button>
              </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default AppHeader
