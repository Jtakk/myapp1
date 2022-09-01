import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import Chip from '@mui/material/Chip';

const TagChip = ({tag, variant, color, ...rest}) => {
  return (
    <Chip
      icon={<SellIcon />}
      label={tag.name}
      component="a"
      href={"/mountains/tags/"+tag.id}
      clickable
      variant={variant}
      color={color}
      size="small"
      {...rest}
    />
  );
};

export default TagChip
