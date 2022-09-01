import React from 'react';
import Box from '@mui/material/Box';
import PrefectureChip from './PrefectureChip';
import AreaChip from './AreaChip';
import TagChip from './TagChip';

const LinkChips = ({prefectures, areas, tags, variant, color, ...rest}) => {
  return (
    <Box {...rest} >
      {prefectures && prefectures.map((prefecture, i) => (
        <PrefectureChip key={i} prefecture={prefecture} variant={variant} color={color} sx={{ mr: 1, mb: 1 }} />
      ))}
      {areas && areas.map((area, i) => (
        <AreaChip key={i} area={area} variant={variant} color={color} sx={{ mr: 1, mb: 1 }} />
      ))}
      {tags && tags.map((tag, i) => (
        <TagChip key={i} tag={tag} variant={variant} color={color} sx={{ mr: 1, mb: 1 }} />
      ))}
    </Box>
  );
};

export default LinkChips
