import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LikeIndicator from './LikeIndicator';
import { format } from 'date-fns';

const CustomPaper = styled(Paper)({
  padding: '10px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
});

const PostsFeed = ({posts, currentUser}) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', mt: 2, mb: 1 }} align="center">新着投稿</Typography>
      <Stack spacing={2}>
        {posts.map((post, i) => (
          <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i}>
            <Box sx={{ width: '30%' }}>
              <img src={post.photos[0].image.fixed.url} loading="lazy" alt={post.photos[0].image.url} style={{ width: '100%', height: 'auto', verticalAlign: 'middle' }} />
            </Box>
            <Box sx={{ width: '70%', pl: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <Box>
                  <Typography variant="body2">{post.mountain.yomi}</Typography>
                  <Typography variant="h5">{post.mountain.name}</Typography>
                </Box>
                <LikeIndicator post={post} currentUser={currentUser} />
              </Box>
              <Typography variant="body1" sx={{ p: 1 }}>{post.message}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="body2" sx={{ color: '#808080'}}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
              </Box>
            </Box>
          </CustomPaper>
        ))}
      </Stack>
    </Box>
  );
};

export default PostsFeed
