import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import NoMountainImage from 'images/no_mountain_image.jpeg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';

const CustomPaper = styled(Paper)({
  height: '30vmin',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  textDecoration: 'none',
});

const MountainLineup = ({mountains, prefecture, region, area, tag, maxItemCount}) => {
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
        {prefecture &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=1" underline="hover" color="inherit">山を探す</Link>
            <Link href={"/mountains/regions/"+region.id} underline="hover" color="inherit">{region.name+"地方"}</Link>
            <Typography>{prefecture.name}</Typography>
          </Breadcrumbs>
        }
        {region && !prefecture &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=1" underline="hover" color="inherit">山を探す</Link>
            <Typography>{region.name+"地方"}</Typography>
          </Breadcrumbs>
        }
        {area &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=2" underline="hover" color="inherit">山を探す</Link>
            <Typography>{area.name}</Typography>
          </Breadcrumbs>
        }
        {tag &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=3" underline="hover" color="inherit">山を探す</Link>
            <Typography>{tag.name}</Typography>
          </Breadcrumbs>
        }
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

export default MountainLineup
