import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const EditMessage = ({post, token, defaultValue, ...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button {...rest} size="small" variant="outlined" onClick={handleClickOpen}>
        メッセージを編集
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="false">
        <DialogTitle>メッセージ編集</DialogTitle>
        <form action={"/posts/"+post.id} method="post" >
          <input type="hidden" name="_method" value="patch" />
          <input  type="hidden" name="authenticity_token" value={token} />
          <DialogContent sx={{ width: "50vw"}}>
            <TextField
              autoFocus
              multiline
              rows={4}
              margin="dense"
              label="メッセージ"
              fullWidth
              name="post[message]"
              defaultValue={defaultValue}
              placeholder=""
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>キャンセル</Button>
            <Button type="submit" color="success" onClick={handleClose}>変更を保存する</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditMessage
