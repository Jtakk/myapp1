import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LikeIndicator from './LikeIndicator';
import Pagination from '@mui/material/Pagination';

const CustomPaper = styled(Paper)({
  padding: '8px',
  textDecoration: 'none',
});

const UserPosts = ({posts, currentUser, maxItemCount}) => {
  const [page, setPage] = React.useState(1);
  const totalItemCount = posts.length;
  const itemCount = maxItemCount;
  const pageCount = Math.ceil(totalItemCount / itemCount);
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  React.useEffect(() => {
    setDisplayedItems(posts.slice((page - 1) * itemCount, page * itemCount));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ py: 5 }}>
        {totalItemCount == 0
          ? <Typography variant="body1" align="right" sx={{ mb: 2 }}>0件</Typography>
          : <Typography variant="body1" align="right" sx={{ mb: 2 }}>{((page-1)*itemCount+1)+"〜"+((page-1)*itemCount+displayedItems.length)+"件を表示 / "+totalItemCount+"件中"}</Typography>
        }
        <Stack spacing={2}>
          {displayedItems.map((post, i) => (
            <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i}>
              <Typography variant="body2">{post.mountain.yomi}</Typography>
              <Typography variant="h4">{post.mountain.name}</Typography>
              <Typography variant="body2">{post.latitude}</Typography>
              <Typography variant="body2">{post.longitude}</Typography>
              <Typography variant="body2">{post.created_at}</Typography>
              <Typography variant="body2">{post.updated_at}</Typography>
              <Typography variant="body1">{post.message}</Typography>
              <LikeIndicator post={post} currentUser={currentUser} />
            </CustomPaper>
          ))}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
        </Box>
      </Container>
    </Box>
  );
};

export default UserPosts
