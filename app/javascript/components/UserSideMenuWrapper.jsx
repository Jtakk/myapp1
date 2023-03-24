import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import PhotoIcon from '@mui/icons-material/Photo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import useMediaQuery from "@mui/material/useMediaQuery";

const UserSideMenuWrapper = ({user, isCurrentUser, children}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box id="side-menu-list" sx={{ width: '100%', height: '100%', bgcolor: 'background.paper', borderRight: '1px solid rgba(0,0,0,0.12)' }}>
      <nav aria-label="main">
        <List sx={{ px: 1 }}>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar.thumb.url} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={isCurrentUser && "マイページ"} />
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+user.id+"/posts"}>
              <ListItemIcon>
                <PhotoIcon fontSize={matches ? "medium" : "small"} />
              </ListItemIcon>
              <ListItemText primary="投稿一覧" primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', sm: '1rem' } } }} />
            </ListItemButton>
          </ListItem>
          {isCurrentUser &&
            <ListItem disablePadding>
              <ListItemButton component="a" href={"/users/"+user.id+"/favorites"}>
                <ListItemIcon>
                  <ThumbUpAltIcon fontSize={matches ? "medium" : "small"} />
                </ListItemIcon>
                <ListItemText primary="お気に入り" primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', sm: '1rem' } } }} />
              </ListItemButton>
            </ListItem>
          }
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+user.id}>
              <ListItemIcon>
                <AccountCircleIcon fontSize={matches ? "medium" : "small"} />
              </ListItemIcon>
              <ListItemText primary="プロフィール" primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', sm: '1rem' } } }} />
            </ListItemButton>
          </ListItem>
          {isCurrentUser &&
            <ListItem disablePadding>
              <ListItemButton component="a" href={"/users/"+user.id+"/edit"}>
                <ListItemIcon>
                  <SettingsIcon fontSize={matches ? "medium" : "small"} />
                </ListItemIcon>
                <ListItemText primary="アカウント設定" primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', sm: '1rem' } } }} />
              </ListItemButton>
            </ListItem>
          }
        </List>
      </nav>
      {isCurrentUser &&
        <div>
          <Divider />
          <nav aria-label="tertiary">
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/logout" data-method="delete">
                  <ListItemIcon>
                    <LogoutIcon fontSize={matches ? "medium" : "small"} />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" primaryTypographyProps={{ sx: { fontSize: { xs: '0.875rem', sm: '1rem' } } }} />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </div>
      }
    </Box>
  );

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', top: '75px', left: '10px', zIndex: 1000 }}>
        <Button id="side-menu-btn" variant="contained" onClick={handleDrawerToggle} sx={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem', padding: '2px 8px' }} >
          <div>ユーザー</div>
          <div>メニュー</div>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box component="nav" sx={{ width: { md: '240px' }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', md: 'none' } }}
            PaperProps={{ sx: { width: { xs: '200px', sm: '240px' } } }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{ display: { xs: 'none', md: 'block' } }}
            PaperProps={{ sx: { top: 'auto', width: '240px' } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: { xs: '100%', md: 'calc(100% - 240px)' }, height: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default UserSideMenuWrapper
