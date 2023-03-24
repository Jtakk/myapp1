import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const EditMessage = ({post, token, defaultValue, ...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box {...rest}>
      <Button size="small" variant="outlined" onClick={handleClickOpen} sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' }, lineHeight: { xs: 1.5, sm: 1.75 } }}>
        メッセージを編集
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, p: { xs: '16px 24px 0', sm: '16px 24px'} }}>メッセージ編集</DialogTitle>
        <form action={"/posts/"+post.id} method="post" >
          <input type="hidden" name="_method" value="patch" />
          <input  type="hidden" name="authenticity_token" value={token} />
          <DialogContent >
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
              size={matches ? "medium" : "small"}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>キャンセル</Button>
            <Button type="submit" color="success" onClick={handleClose}>変更を保存する</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default EditMessage
