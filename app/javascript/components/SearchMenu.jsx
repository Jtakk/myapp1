import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import TerrainIcon from '@mui/icons-material/Terrain';
import SellIcon from '@mui/icons-material/Sell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchMenu = () => {
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
      {matches
        ? <Button onClick={handleClick} size="large" color="inherit" id="search-menu-toggle-button" startIcon={<SearchIcon />} endIcon={<KeyboardArrowDownIcon />}>
            山を探す
          </Button>
        : <Button onClick={handleClick} color="inherit" variant="outlined" id="short-search-menu-toggle-button" sx={{ p: '5px', height: '34px', minWidth: '34px' }}>
            <SearchIcon sx={{ fontSize: '1.1rem' }} />
          </Button>
      }
      <Menu id="search-menu-list" anchorEl={anchorEl} open={open} onClose={handleClose} transformOrigin={{ horizontal: 'left', vertical: 'top' }} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem component="a" href="/mountains" sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <SearchIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>フリーワード検索</Typography>
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=1" sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <PublicIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>都道府県から探す</Typography>
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=2" sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <TerrainIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>山域から探す</Typography>
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=3" sx={{ minHeight: '40px' }}>
          <ListItemIcon>
            <SellIcon fontSize={matches ? "medium" : "small"} />
          </ListItemIcon>
          <Typography variant={matches ? "body1" : "body2"}>タグから探す</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SearchMenu
