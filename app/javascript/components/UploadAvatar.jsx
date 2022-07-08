import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

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

  return (
    <Stack direction="row" spacing={1} {...rest} >
      <Button variant="outlined" component="label" >
        画像を設定する
        <input type="file" accept=".jpg,.jpeg,.png,.gif" name={name} onChange={handleChange} ref={inputRef} hidden />
      </Button>
      <Chip variant="outlined" icon={<FaceIcon />} label={avatar && avatar.name} onDelete={handleDelete} />
    </Stack>
  );
};

export default UploadAvatar
