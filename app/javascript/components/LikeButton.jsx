import React from 'react';
import Chip from '@mui/material/Chip';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SecondaryTheme from './SecondaryTheme';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

const LikeButton = ({post, postToken, deleteToken, currentUser}) => {
  const [like, setLike] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  React.useEffect(() => {
    const ajax = async() => {
      const res = await fetch('/likes/' + post.id);
      if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(!!resData.like);
        setCount(resData.count);
      }
    };
    ajax();
  }, [post]);

  const handleOnClick = async () => {
    if (like) {
      const url = '/likes/' + post.id;
      const fetch_params = { method: 'DELETE', headers: { 'X-CSRF-Token': deleteToken } };
      const res = await fetch(url, fetch_params);
      if (res.status == 302) {
        const resData = await res.json();
        window.location.href = resData.redirect_url;
      } else if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(false);
        setCount(count - 1);
      }
    } else {
      const url = '/likes';
      const data = { post: { id: post.id } };
      const fetch_params = { method: 'POST', headers: { 'X-CSRF-Token': postToken, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
      const res = await fetch(url, fetch_params);
      if (res.status == 302) {
        const resData = await res.json();
        window.location.href = resData.redirect_url;
      } else if (res.status == 403) {
        console.error('無効なリクエスト');
      } else if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(true);
        setCount(count + 1);
      }
    }
  };

  return (
    <SecondaryTheme>
      <Chip
        icon={<ThumbUpAltIcon />}
        label={like ? "いいね済み " + count : "いいね! " + count}
        color={currentUser && post.user_id != currentUser.id ? (like ? "secondary" : "primary") : "default"}
        variant={like ? "contained" : "outlined"}
        onClick={handleOnClick}
        sx={currentUser && post.user_id != currentUser.id ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }}
        className="btn-like"
        size={matches ? "medium" : "small"}
      />
    </SecondaryTheme>
  );
};

export default LikeButton
