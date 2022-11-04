import React from 'react';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import useMediaQuery from "@mui/material/useMediaQuery";

const AvatarChip = ({user, clickable, ...rest}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Chip
      avatar={<Avatar alt={user.name} src={user.avatar.thumb.url} />}
      label={user.name}
      component={clickable ? "a" : "div"}
      href={"/users/"+user.id}
      clickable={clickable}
      size={matches ? "medium" : "small"}
      color="primary"
      variant="outlined"
      {...rest}
    />
  );
};

export default AvatarChip
