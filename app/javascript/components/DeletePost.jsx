import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeletePost = ({post, token, ...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...rest}>
      <Button color="error" size="small" variant="outlined" onClick={handleClickOpen} sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, lineHeight: { xs: 1.5, sm: 1.75 } }}>
        投稿を削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {"投稿を削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }  }}>
            この投稿を削除すると、写真も同時に削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>キャンセル</Button>
          <form action={"/posts/"+post.id} method="post">
            <input name="_method" type="hidden" value="delete" />
            <input name="authenticity_token" type="hidden" value={token} />
            <Button type="submit" color="error">削除する</Button>
          </form>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeletePost
