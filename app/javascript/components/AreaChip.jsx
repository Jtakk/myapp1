import React from 'react';
import TerrainIcon from '@mui/icons-material/Terrain';
import Chip from '@mui/material/Chip';

const AreaChip = ({area, variant, color, ...rest}) => {
  return (
    <Chip
      icon={<TerrainIcon />}
      label={area.name}
      component="a"
      href={"/mountains/areas/"+area.id}
      clickable
      variant={variant}
      color={color}
      size="small"
      {...rest}
    />
  );
};

export default AreaChip
