import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LikeIndicator from './LikeIndicator';
import Pagination from '@mui/material/Pagination';
import AvatarChip from './AvatarChip';
import { format } from 'date-fns';

const CustomPaper = styled(Paper)({
  padding: '10px',
  textDecoration: 'none',
});

const UserFavorites = ({posts, currentUser, maxItemCount}) => {
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
        <Typography variant="h5">お気に入り</Typography>
        {totalItemCount == 0
          ? <Typography variant="body1" align="right" sx={{ mb: 2 }}>0件</Typography>
          : <Typography variant="body1" align="right" sx={{ mb: 2 }}>{((page-1)*itemCount+1)+"〜"+((page-1)*itemCount+displayedItems.length)+"件を表示 / "+totalItemCount+"件中"}</Typography>
        }
        <Stack spacing={2}>
          {displayedItems.map((post, i) => (
            <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i} id={"favorite-posts-"+i}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                <Box>
                  <Typography variant="body2">{post.mountain.yomi}</Typography>
                  <Typography variant="h4">{post.mountain.name}</Typography>
                </Box>
                <LikeIndicator post={post} currentUser={currentUser} />
              </Box>
              <AvatarChip user={post.user} />
              <Typography variant="body1" sx={{ p: 1 }}>{post.message}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="body2" sx={{ color: '#808080'}}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
              </Box>
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

export default UserFavorites
