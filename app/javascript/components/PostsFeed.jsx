import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

const CustomPaper = styled(Paper)({
  textDecoration: 'none',
  display: 'flex',
});

const PostsFeed = ({posts}) => {
  return (
    <Box>
      {!!posts.length
        ? <Typography variant="h5" sx={{ color: '#fff', mt: 2, mb: 1 }} align="center">新着投稿</Typography>
        : <Typography variant="h5" sx={{ color: '#fff', mt: 2, mb: 1 }} align="center">新着投稿はありません</Typography>
      }
      {!!posts.length &&
        <Stack spacing={2}>
          {posts.map((post, i) => (
            <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i} id={"recent-post-"+i}>
              <Box sx={{ width: { xs: '40%', md: '30%' }, padding: '5px' }}>
                <img src={post.photos[0].image.fixed.url} alt={post.photos[0].image.url} style={{ width: '100%', height: 'auto', verticalAlign: 'middle' }} />
              </Box>
              <Box sx={{ position: 'relative', width: { xs: '60%', md: '70%' } }}>
                <Box sx={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: '5px', boxSizing: 'border-box' }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography component="span" variant="body2" sx={{ color: '#808080'}}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
                  </Box>
                  <Box sx={{ overflowY: 'hidden' }}>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.875rem' } }}>{post.mountain.yomi}</Typography>
                    <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>{post.mountain.name}</Typography>
                    <Typography variant="body1" sx={{ p: 1 }}>{post.message}</Typography>
                  </Box>
                </Box>
              </Box>
            </CustomPaper>
          ))}
        </Stack>
      }
    </Box>
  );
};

export default PostsFeed
