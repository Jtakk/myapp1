import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import useMediaQuery from "@mui/material/useMediaQuery";

const UploadAvatar = ({name, ...rest}) => {
  const inputRef = React.useRef(null);
  const [avatar, setAvatar] = React.useState();
  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleDelete = () => {
    setAvatar('');
    inputRef.current.value = '';
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box {...rest} >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ m: { xs: '0 0 6px', sm: '0 6px 0 0' } }}>
          <Button variant="outlined" component="label" size={matches ? "medium" : "small"} >
            画像を設定する
            <input type="file" accept=".jpg,.jpeg,.png,.gif" name={name} onChange={handleChange} ref={inputRef} hidden />
          </Button>
        </Box>
        <Box>
          <Chip variant="outlined" icon={<FaceIcon />} label={avatar && avatar.name} onDelete={handleDelete} size={matches ? "medium" : "small"} />
        </Box>
      </Box>
    </Box>
  );
};

export default UploadAvatar
