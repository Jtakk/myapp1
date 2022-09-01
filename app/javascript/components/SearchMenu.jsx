import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import TerrainIcon from '@mui/icons-material/Terrain';
import SellIcon from '@mui/icons-material/Sell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SearchMenu = () => {
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
      <Button onClick={handleClick} size="large" color="inherit" id="search-menu-toggle-button" startIcon={<SearchIcon />} endIcon={<KeyboardArrowDownIcon />}>
        山を探す
      </Button>
      <Menu id="search-menu-list" anchorEl={anchorEl} open={open} onClose={handleClose} transformOrigin={{ horizontal: 'left', vertical: 'top' }} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem component="a" href="/mountains">
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          フリーワード検索
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=1">
          <ListItemIcon>
            <PublicIcon fontSize="small" />
          </ListItemIcon>
          都道府県から探す
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=2">
          <ListItemIcon>
            <TerrainIcon fontSize="small" />
          </ListItemIcon>
          山域から探す
        </MenuItem>
        <MenuItem component="a" href="/mountains?tab=3">
          <ListItemIcon>
            <SellIcon fontSize="small" />
          </ListItemIcon>
          タグから探す
        </MenuItem>
      </Menu>
    </>
  );
};

export default SearchMenu
