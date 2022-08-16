import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SecondaryTheme from './SecondaryTheme';

const LikeIndicator = ({post, currentUser}) => {
  const [like, setLike] = React.useState(false);
  const [count, setCount] = React.useState(0);

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

  return (
    <SecondaryTheme>
      <Box
        sx={{
          padding: '1px 4px',
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid',
          bgcolor: like ? "secondary.main" : "transparent",
          borderColor: currentUser && post.user_id != currentUser.id ? (like ? "secondary.main" : "primary.main") : "#616161",
          color: currentUser && post.user_id != currentUser.id ? (like ? "#fff" : "primary.main") : "#616161",
         }}
      >
        <ThumbUpAltIcon fontSize="small" />
        <Typography component="span" variant="body2" >{like ? "いいね済み " + count : "いいね! " + count }</Typography>
      </Box>
    </SecondaryTheme>
  );
};

export default LikeIndicator
