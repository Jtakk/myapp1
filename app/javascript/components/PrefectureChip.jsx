import React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import Chip from '@mui/material/Chip';

const PrefectureChip = ({prefecture, variant, color, ...rest}) => {
  return (
    <Chip
      icon={<PublicIcon />}
      label={prefecture.name}
      component="a"
      href={"/mountains/prefectures/"+prefecture.id}
      clickable
      variant={variant}
      color={color}
      size="small"
      {...rest}
    />
  );
};

export default PrefectureChip
