import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import NoMountainImage from 'images/no_mountain_image.jpeg';
import Pagination from '@mui/material/Pagination';

const CustomPaper = styled(Paper)({
  height: '30vmin',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
});

const MountainSearch = ({keyword, mountains, maxItemCount}) => {
  const [page, setPage] = React.useState(1);
  const totalItemCount = mountains.length;
  const itemCount = maxItemCount;
  const pageCount = Math.ceil(totalItemCount / itemCount);
  const [displayedItems, setDisplayedItems] = React.useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  React.useEffect(() => {
    setDisplayedItems(mountains.slice((page - 1) * itemCount, page * itemCount));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Paper component="form" action="/mountains/search" method="get" sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: '500px' }}>
            <InputBase sx={{ flex: 1 }} defaultValue={keyword} placeholder="山名検索" name="keyword" inputProps={{ 'type': 'text' }} />
            <Button type="submit" sx={{ p: '10px' }}>検索</Button>
          </Paper>
        </Box>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mt: 3, mb: 1 }}>
          <Link href="/mountains" underline="hover" color="inherit">山を探す</Link>
          <Typography variant="body1">" {keyword} "の検索結果 {totalItemCount}件</Typography>
        </Breadcrumbs>
        {totalItemCount == 0
          ? <Typography variant="body1" align="right" sx={{ mb: 1 }}>0件</Typography>
          : <Typography variant="body1" align="right" sx={{ mb: 1 }}>{((page-1)*itemCount+1)+"〜"+((page-1)*itemCount+displayedItems.length)+"件を表示 / "+totalItemCount+"件中"}</Typography>
        }
        <Stack spacing={3}>
          {displayedItems.map((mountain, i) => (
            <CustomPaper component="a" href={"/mountains/"+mountain.id} elevation={3} key={i} className="mountain-paper">
              <Box sx={{ p: 1, overflow: 'hidden' }}>
                <Typography variant="body2">{mountain.yomi}</Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>{mountain.name}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{"標高: "+mountain.elevation+" m"}</Typography>
                <Typography variant="body2" sx={{ overflow: 'hidden' }}>{mountain.introduction}</Typography>
              </Box>
              <Box sx={{ width: '30vmax', height: '100%', flexShrink: '0' }}><img className="index-image" alt={mountain.name} src={mountain.image.url ? mountain.image.url : NoMountainImage} /></Box>
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

export default MountainSearch
