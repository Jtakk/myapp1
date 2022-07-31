import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import TerrainIcon from '@mui/icons-material/Terrain';
import TagIcon from '@mui/icons-material/Tag';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const SearchMenuDrawer = ({...props}) => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
    <Box {...props}>
      <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem>
              <ListItemButton component="a" href="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="ホーム" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List subheader={<ListSubheader>山を探す</ListSubheader>}>
            <ListItem>
              <ListItemButton component="a" href="/mountains">
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="フリーワード検索" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/mountains?tab=1">
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="都道府県から探す" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/mountains?tab=2">
                <ListItemIcon>
                  <TerrainIcon />
                </ListItemIcon>
                <ListItemText primary="山域から探す" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component="a" href="/mountains?tab=3">
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText primary="タグから探す" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchMenuDrawer
