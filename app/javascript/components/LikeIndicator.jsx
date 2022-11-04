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
          bgcolor: like ? "secondary.main" : "#fff",
          borderColor: currentUser && post.user_id != currentUser.id ? (like ? "secondary.main" : "primary.main") : "#616161",
          color: currentUser && post.user_id != currentUser.id ? (like ? "#fff" : "primary.main") : "#616161",
         }}
      >
        <ThumbUpAltIcon fontSize="small" sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' }, width: { xs: '0.8em', sm: '1em' }, height: { xs: '0.8em', sm: '1em' } }} />
        <Typography component="span" variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.875rem' }, lineHeight: { xs: 1.1, sm: 1.43 } }} >{like ? "いいね済み " + count : "いいね! " + count }</Typography>
      </Box>
    </SecondaryTheme>
  );
};

export default LikeIndicator
