import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditMessage from './EditMessage';
import DeletePost from './DeletePost';

const PostShow = (props) => {
  return (
    <Container sx={{ height: '100%', py: 5, bgcolor: '#f5f5f5' }}>
      <Paper elevation={2}>
        <Typography variant="h6">{props.post.message}</Typography>
        <EditMessage post={props.post} token={props.patchToken} defaultValue={props.post.message} />
        <DeletePost post={props.post} token={props.deleteToken} />
      </Paper>
    </Container>
  );
};

export default PostShow
