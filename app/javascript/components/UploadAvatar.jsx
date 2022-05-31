import React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';

const UploadAvatar = (props) => {
  const { name, ...rest } = props;
  const [file, setFile] = React.useState('');
  const handleChange = (e) => {
    setFile(e.target.value);
  };
  const handleDelete = () => {
    setFile('');
  };

  return (
    <Stack direction="row" spacing={1} {...rest} >
      <Button variant="outlined" component="label" >
        画像を設定する
        <input type="file" name={name} value={file} onChange={handleChange} hidden />
      </Button>
      <Chip variant="outlined" icon={<FaceIcon />} label={file} onDelete={handleDelete} />
    </Stack>
  );
};

export default UploadAvatar
