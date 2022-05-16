import React from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const AccountMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="アカウント詳細">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} id="menu-toggle-button">
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
        </IconButton>
      </Tooltip>
      <Menu id="account-menu-list" anchorEl={anchorEl} open={open} onClose={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem component="a" href={"/users/"+props.currentUser.id}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          プロフィール
        </MenuItem>
        <MenuItem component="a" href={"/users/"+props.currentUser.id+"/edit"}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          アカウント設定
        </MenuItem>
        <Divider />
        <MenuItem component="a" href="/logout" data-method="delete">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          ログアウト
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu
