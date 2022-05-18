import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteUser = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = React.useState('');
  const [disable, setDisable] = React.useState(true);
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value == props.user.email) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleOpen}>アカウントを削除する</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            本当にアカウントを削除しますか？
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            アカウントを削除するには、メールアドレスを入力し、「削除する」を押してください。
          </Typography>
          <TextField fullWidth label="メールアドレス" value={email} onChange={handleChange} variant="outlined" size="small" sx={{ my: 2 }} />
          <Divider sx={{ my: 2 }} />
          <div style={{ textAlign: 'right' }}>
            <Button variant="contained" color="error" disabled={disable} href={"/users/"+props.user.id} data-method="delete" >削除する</Button>
            <Button sx={{ ml: 2 }} variant="outlined" onClick={handleClose}>キャンセル</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteUser
