import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CustomPaper = styled(Paper)({
  padding: '8px',
  textDecoration: 'none',
});

const UserPosts = (props) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={2}>
          {props.posts.map((post, i) => (
            <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i}>
              <Typography variant="body2">{post.mountain.yomi}</Typography>
              <Typography variant="h4">{post.mountain.name}</Typography>
              <Typography variant="body2">{post.latitude}</Typography>
              <Typography variant="body2">{post.longitude}</Typography>
              <Typography variant="body2">{post.created_at}</Typography>
              <Typography variant="body2">{post.updated_at}</Typography>
              <Typography variant="body1">{post.message}</Typography>
            </CustomPaper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default UserPosts
