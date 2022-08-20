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
import { format } from 'date-fns';

const PostShow = ({post, user, photos, currentUser, patchPostToken, deletePostToken, postLikeToken, deleteLikeToken}) => {
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
          <Box sx={{ padding: '0 18px 18px 18px' }}>
            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
              <AvatarChip user={user} clickable />
              <LikeButton post={post} postToken={postLikeToken} deleteToken={deleteLikeToken} currentUser={currentUser} />
            </Box>
            <Typography variant="h6" sx={{ p: 2 }}>{post.message}</Typography>
            {currentUser && user.id == currentUser.id &&
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1}}>
                <EditMessage sx={{ mr: 2 }} post={post} token={patchPostToken} defaultValue={post.message} />
                <DeletePost post={post} token={deletePostToken} />
              </Box>
            }
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Typography variant="body2" sx={{ color: '#808080'}}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PostShow
