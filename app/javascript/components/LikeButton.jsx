import React from 'react';
import Chip from '@mui/material/Chip';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const LikeButton = ({postId, postToken, deleteToken}) => {
  const [like, setLike] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const ajax = async() => {
      const res = await fetch('/likes/' + postId);
      if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(resData.like);
        setCount(resData.count);
      }
    };
    ajax();
  }, [postId]);

  const handleOnClick = async () => {
    if (like) {
      const url = '/likes/' + postId;
      const fetch_params = { method: 'DELETE', headers: { 'X-CSRF-Token': deleteToken } };
      const res = await fetch(url, fetch_params);
      if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(false);
        setCount(count - 1);
      }
    } else {
      const url = '/likes';
      const data = { like: { post_id: postId } };
      const fetch_params = { method: 'POST', headers: { 'X-CSRF-Token': postToken, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
      const res = await fetch(url, fetch_params);
      if (!res.ok) {
        console.error('通信エラー');
      } else {
        const resData = await res.json();
        setLike(true);
        setCount(count + 1);
      }
    }
  };

  return (
    <Chip
      icon={<ThumbUpAltIcon />}
      label={like ? "いいね済み " + count : "いいね! " + count}
      color={like ? "secondary" : "default"}
      variant={like ? "contained" : "outlined"}
      onClick={handleOnClick}
    />
  );
};

export default LikeButton
