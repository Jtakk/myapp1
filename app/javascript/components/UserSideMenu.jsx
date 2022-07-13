import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import PhotoIcon from '@mui/icons-material/Photo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const UserSideMenu = ({user, isCurrentUser}) => {
  return (
    <Box id="side-menu-list" sx={{ width: '240px', height: '100%', bgcolor: 'background.paper', borderRight: '1px solid rgba(0,0,0,0.12)' }}>
      <nav aria-label="main">
        <List sx={{ px: 1 }}>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar.thumb.url} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+user.id+"/posts"}>
              <ListItemIcon>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText primary="投稿一覧" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+user.id}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="プロフィール" />
            </ListItemButton>
          </ListItem>
          {isCurrentUser &&
            <ListItem disablePadding>
              <ListItemButton component="a" href={"/users/"+user.id+"/edit"}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="アカウント設定" />
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
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </div>
      }
    </Box>
  );
}

export default UserSideMenu
