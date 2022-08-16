import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Carousel from './Carousel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LikeButton from './LikeButton';
import EditMessage from './EditMessage';
import DeletePost from './DeletePost';
import AvatarChip from './AvatarChip';

const PostShow = ({post, user, photos, currentUser, isCurrentUsersPost, patchPostToken, deletePostToken, postLikeToken, deleteLikeToken}) => {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 4 }}>
            <Carousel>
              {photos.map((photo, i) => (
                <Box key={i}>
                  <img src={photo.image.fixed.url} loading="lazy" alt={photo.image.url} style={{ maxWidth: '100%', height: 'auto'}} />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box sx={{ p: 2, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
            <AvatarChip user={user} clickable />
            <LikeButton post={post} postToken={postLikeToken} deleteToken={deleteLikeToken} currentUser={currentUser} />
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">{post.message}</Typography>
            {isCurrentUsersPost && <EditMessage post={post} token={patchPostToken} defaultValue={post.message} />}
          </Box>
          <Box sx={{ p: 2 }}>
            {isCurrentUsersPost && <DeletePost post={post} token={deletePostToken} />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PostShow
