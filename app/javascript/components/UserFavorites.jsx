import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LikeIndicator from './LikeIndicator';
import Pagination from '@mui/material/Pagination';
import AvatarChip from './AvatarChip';
import { format } from 'date-fns';
import UserSideMenuWrapper from './UserSideMenuWrapper';
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomPaper = styled(Paper)({
  display: 'flex',
  padding: '5px',
  textDecoration: 'none',
});

const UserFavorites = ({user, isCurrentUser, posts, currentUser, maxItemCount}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
    <UserSideMenuWrapper user={user} isCurrentUser={isCurrentUser}>
      <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="md" sx={{ py: '40px' }}>
          <Typography variant={matches ? "h5" : "h6"} align="center">お気に入り</Typography>
          {totalItemCount == 0
            ? <Typography variant={matches ? "body1" : "body2"} align="right" sx={{ mb: '16px' }}>0件</Typography>
            : <Typography variant={matches ? "body1" : "body2"} align="right" sx={{ mb: '16px' }}>{((page-1)*itemCount+1)+"〜"+((page-1)*itemCount+displayedItems.length)+"件を表示 / "+totalItemCount+"件中"}</Typography>
          }
          <Stack spacing={2}>
            {displayedItems.map((post, i) => (
              <CustomPaper component="a" href={"/posts/"+post.id} elevation={3} key={i} id={"favorite-posts-"+i}>
                <Box sx={{ width: { xs: '40%', sm: '35%', md: '30%' }, p: { xs: '16px 4px', sm: '4px' } }}>
                  <img src={post.photos[0].image.fixed.url} alt={post.photos[0].image.url} style={{ width: '100%', height: 'auto', verticalAlign: 'middle', borderRadius: '4px' }} />
                </Box>
                <Box sx={{ position: 'relative', width: { xs: '60%', sm: '65%', md: '70%' } }}>
                  <Box sx={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography  variant="body2" sx={{ color: '#808080', fontSize: { xs: '0.75rem', sm: '0.875rem' }, lineHeight: 1, textAlign: 'right' }}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
                    <Box sx={{ mb: '4px' }}>
                      <AvatarChip user={post.user} />
                    </Box>
                    <Box sx={{ overflowY: 'hidden', px: { xs: '8px', sm: '24px' } }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' }, lineHeight: 1 }}>{post.mountain.yomi}</Typography>
                      <Typography variant={matches ? "h5" : "h6"} sx={{ lineHeight: { xs: 1.2, sm: 1.3 } }} >{post.mountain.name}</Typography>
                      <Typography variant={matches ? "body1" : "body2"} sx={{ p: { xs: '4px', sm: '6px' } }}>{post.message}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: '-4px', right: '0px' }}>
                    <LikeIndicator post={post} currentUser={currentUser} />
                  </Box>
                </Box>
              </CustomPaper>
            ))}
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: '40px' }}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Box>
        </Container>
      </Box>
    </UserSideMenuWrapper>
  );
};

export default UserFavorites
