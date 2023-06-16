import React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HelpImage1 from 'images/help_1.png';
import HelpImage2 from 'images/help_2.png';
import HelpImage3 from 'images/help_3.png';
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: 'background.paper',
  boxSizing: 'border-box',
  p: { xs: '16px', sm: '32px' },
  overflowY: 'scroll'
};

const HelpToCreatePost = ({...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Button {...rest} onClick={handleOpen} size="small" startIcon={<HelpIcon />}>投稿方法を確認</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant={matches ? "h5" : "h6"}>① 撮影地点を決める</Typography>
          <Box sx={{ p: '16px', mb: '16px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
              <Typography variant="body1" sx={{ mb: '16px', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>マップ上をクリックする、もしくは緯度•経度を入力して「マーカーを設置」ボタンを押すことでマップ上に青いピンを設置します。</Typography>
              <Typography variant="body1" sx={{ mb: '16px', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>緯度•経度を入力する場合、入力タイプを「小数」もしくは「度•分•秒」から選択できます。</Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>投稿を完了するには青いピンの設置が必須となります。</Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '60%' }, boxSizing: "border-box", p: { xs: '16px 16px 0', sm: '0 16px' }  }}>
              <img src={HelpImage1} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant={matches ? "h5" : "h6"}>② メッセージを残す</Typography>
          <Box sx={{ p: '16px', mb: '16px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
              <Typography variant="body1" sx={{ mb: '16px', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>この投稿についてのメッセージを入力します。</Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>メッセージは空欄でも投稿することができます。</Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '60%' }, boxSizing: "border-box", p: { xs: '16px 16px 0', sm: '0 16px' } }}>
              <img src={HelpImage2} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant={matches ? "h5" : "h6"}>③ 写真を追加する</Typography>
          <Box sx={{ p: '16px', mb: '16px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
              <Typography variant="body1" sx={{ mb: '16px', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>この投稿に追加したい画像ファイルを選択します。追加できる画像ファイルの形式は拡張子が .jpg .jpeg .gif .png のものに限られます。</Typography>
              <Typography variant="body1" sx={{ mb: '16px', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>選択した画像が表示されます。取り消したい場合は画像の右上にある ×ボタンをクリックします。1つの投稿につき追加できる画像は10枚までです。</Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>投稿を完了するには1枚以上の画像が必須となります。</Typography>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '60%' }, boxSizing: "border-box", p: { xs: '16px 16px 0', sm: '0 16px' } }}>
              <img src={HelpImage3} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant={matches ? "h5" : "h6"}>④ 投稿を完了する</Typography>
          <Box sx={{ p: '16px', mb: '24px' }}>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>最後に「この内容で投稿する」ボタンを押すことで投稿が完了します。</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button onClick={handleClose} size="large" startIcon={<CloseIcon />}>閉じる</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default HelpToCreatePost
