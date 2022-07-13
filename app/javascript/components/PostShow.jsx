import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditMessage from './EditMessage';
import DeletePost from './DeletePost';

const PostShow = ({post, isCurrentUsersPost, patchToken, deleteToken}) => {
  return (
    <Container sx={{ height: '100%', py: 5, bgcolor: '#f5f5f5' }}>
      <Paper elevation={2}>
        <Typography variant="h6">{post.message}</Typography>
        {isCurrentUsersPost &&
          <div>
            <EditMessage post={post} token={patchToken} defaultValue={post.message} />
            <DeletePost post={post} token={deleteToken} />
          </div>
        }
      </Paper>
    </Container>
  );
};

export default PostShow
