import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const AvatarChip = ({src, alt, label}) => {
  return (
    <Chip
      avatar={<Avatar alt={alt} src={src} />}
      label={label}
      size="medium"
      color="primary"
      variant="outlined"
    />
  );
};

export default AvatarChip
