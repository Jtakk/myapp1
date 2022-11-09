import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import PhotoIcon from '@mui/icons-material/Photo';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const AccountMenu = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Tooltip title="マイページ">
        <IconButton onClick={handleClick} size={matches ? "medium" : "small"} sx={{ ml: '16px' }} id="menu-toggle-button">
          <Avatar sx={{ width: { xs: '32px', sm: '36px' }, height: { xs: '32px', sm: '36px' } }} alt={currentUser.name} src={currentUser.avatar.thumb.url} />
        </IconButton>
      </Tooltip>
      <Menu id="account-menu-list" anchorEl={anchorEl} open={open} onClose={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem component="a" href={"/users/"+currentUser.id+"/posts"} sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <PhotoIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>投稿一覧</Typography>
        </MenuItem>
        <MenuItem component="a" href={"/users/"+currentUser.id+"/favorites"} sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <ThumbUpAltIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>お気に入り</Typography>
        </MenuItem>
        <MenuItem component="a" href={"/users/"+currentUser.id} sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>プロフィール</Typography>
        </MenuItem>
        <MenuItem component="a" href={"/users/"+currentUser.id+"/edit"} sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <SettingsIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>アカウント設定</Typography>
        </MenuItem>
        <Divider />
        <MenuItem component="a" href="/logout" data-method="delete" sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <LogoutIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>ログアウト</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu
