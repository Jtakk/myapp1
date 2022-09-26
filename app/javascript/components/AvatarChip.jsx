import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const AvatarChip = ({user, clickable}) => {
  return (
    <Chip
      avatar={<Avatar alt={user.name} src={user.avatar.thumb.url} />}
      label={user.name}
      component={clickable ? "a" : "div"}
      href={"/users/"+user.id}
      clickable={clickable}
      size="medium"
      color="primary"
      variant="outlined"
    />
  );
};

export default AvatarChip
