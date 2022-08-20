import React from 'react';
import Button from '@mui/material/Button';
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
    <>
      <Button {...rest} color="error" size="small" variant="outlined" onClick={handleClickOpen}>
        投稿を削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"投稿を削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
    </>
  );
};

export default DeletePost
