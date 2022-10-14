import React from 'react';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HelpImage1 from 'images/help_1.png';
import HelpImage2 from 'images/help_2.png';
import HelpImage3 from 'images/help_3.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70%',
  bgcolor: 'background.paper',
  p: 4,
  overflowY: 'scroll'
};

const HelpToCreatePost = ({...rest}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button {...rest} onClick={handleOpen} size="small" startIcon={<HelpIcon />}>投稿方法を確認する</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5">① 撮影地点を決める</Typography>
          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "inline-block", verticalAlign: "top", width: "40%" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>マップ上をクリックする、もしくは緯度•経度を入力して「マーカーを設置」ボタンを押すことでマップ上に青いピンを設置します。</Typography>
              <Typography variant="body1">投稿を完了するには青いピンの設置が必須となります。</Typography>
            </Box>
            <Box sx={{ display: "inline-block", width: "60%", boxSizing: "border-box", px: 2  }}>
              <img src={HelpImage1} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant="h5">② メッセージを残す</Typography>
          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "inline-block", verticalAlign: "top", width: "40%" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>この投稿についてのメッセージを入力します。</Typography>
              <Typography variant="body1">メッセージは空欄でも投稿することができます。</Typography>
            </Box>
            <Box sx={{ display: "inline-block", width: "60%", boxSizing: "border-box", px: 2  }}>
              <img src={HelpImage2} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant="h5">③ 写真を追加する</Typography>
          <Box sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "inline-block", verticalAlign: "top", width: "40%" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>この投稿に追加したい画像ファイルを選択します。追加できる画像ファイルの形式は拡張子が .jpg .jpeg .gif .png のものに限られます。</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>選択した画像が表示されます。取り消したい場合は画像の右上にある ×ボタンをクリックします。1つの投稿につき追加できる画像は10枚までです。</Typography>
              <Typography variant="body1">投稿を完了するには1枚以上の画像が必須となります。</Typography>
            </Box>
            <Box sx={{ display: "inline-block", width: "60%", boxSizing: "border-box", px: 2  }}>
              <img src={HelpImage3} style={{ width: "100%", height: "auto", border: "solid 1px" }} />
            </Box>
          </Box>
          <Typography variant="h5">④ 投稿を完了する</Typography>
          <Box sx={{ p: 2, mb: 3 }}>
            <Typography variant="body1">最後に「この内容で投稿する」ボタンを押すことで投稿が完了します。</Typography>
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
