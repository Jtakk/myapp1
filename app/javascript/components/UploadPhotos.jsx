import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const CustomImg = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
});

const UploadPhotos = ({images, setImages, ...rest}) => {
  const maxImageCount = 10;
  const [overload, setOverload] = React.useState(false);
  const handleChange = (e) => {
    const arr = [...images, ...e.target.files];
    if (arr.length > maxImageCount) {
      return;
    } else if (arr.length == maxImageCount) {
      setImages(arr);
      setOverload(true);
    } else {
      setImages(arr);
    }
  };
  const handleClick = (e) => {
    e.target.value = '';
  };
  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    if (newImages.length < maxImageCount) setOverload(false);
    setImages(newImages);
  };

  return (
    <Box {...rest}>
      <Button id="btn-upload-photo" variant="outlined" component="label" disabled={overload}>
        写真を追加する
        <input type="file" multiple accept=".jpg,.jpeg,.png,.gif" onChange={handleChange} onClick={handleClick} hidden />
      </Button>
      <Stack spacing={1} >
        {images.map((image, i) => (
          <Box key={i} sx={{ p: 1, border: '1px solid #2196f3', position: 'relative' }}>
            <CancelIcon id={"cancel-icon-"+i} sx={{ position: 'absolute', top:'0px', right: '0px' }} onClick={() => handleDelete(i)} />
            <CustomImg src={URL.createObjectURL(image)} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default UploadPhotos
