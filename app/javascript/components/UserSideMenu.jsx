import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const UserSideMenu = (props) => {
  return (
    <Box sx={{ width: '240px', height: '100%', bgcolor: 'background.paper', borderRight: '1px solid rgba(0,0,0,0.12)' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+props.currentUser.id}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="プロフィール" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href={"/users/"+props.currentUser.id+"/edit"}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="アカウント設定" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/logout" data-method="delete">
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default UserSideMenu
