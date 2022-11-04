import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '85%', sm: '70%' },
  boxSizing: 'border-box',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: '16px', sm: '32px' },
};

const DeleteUser = ({user, ...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = React.useState('');
  const [disable, setDisable] = React.useState(true);
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value == user.email) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box {...rest} >
      <Button variant="outlined" color="error" onClick={handleOpen} size={matches ? "medium" : "small"} >アカウントを削除する</Button>
      <Modal
        id="delete-user-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant={matches ? "h5" : "h6"} >
            本当にアカウントを削除しますか？
          </Typography>
          <Divider sx={{ my: '16px' }} />
          <Typography id="modal-modal-description" variant={matches ? "body1" : "body2"} sx={{ mt: '16px' }}>
            アカウントを削除するには、メールアドレスを入力し、「削除する」を押してください。
          </Typography>
          <TextField fullWidth label="メールアドレス" value={email} onChange={handleChange} variant="outlined" size={matches ? "medium" : "small"} sx={{ my: '16px' }} />
          <Divider sx={{ my: '16px' }} />
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="error" disabled={disable} href={"/users/"+user.id} data-method="delete" size={matches ? "medium" : "small"} >削除する</Button>
            <Button sx={{ ml: '16px' }} variant="outlined" onClick={handleClose} size={matches ? "medium" : "small"}>キャンセル</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteUser
