import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomPaper = styled(Paper)({
  display: 'flex',
  textDecoration: 'none',
  padding: '5px',
});

const MountainLineup = ({mountains, prefecture, region, area, tag, maxItemCount}) => {
  const theme = useTheme();
  const highMatches = useMediaQuery(theme.breakpoints.up('md'));
  const lowMatches = useMediaQuery(theme.breakpoints.up('sm'));
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
            <Link href="/mountains?tab=1" underline="hover" color="inherit" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>山を探す</Link>
            <Link href={"/mountains/regions/"+region.id} underline="hover" color="inherit" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{region.name+"地方"}</Link>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{prefecture.name}</Typography>
          </Breadcrumbs>
        }
        {region && !prefecture &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=1" underline="hover" color="inherit" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>山を探す</Link>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{region.name+"地方"}</Typography>
          </Breadcrumbs>
        }
        {area &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=2" underline="hover" color="inherit" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>山を探す</Link>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{area.name}</Typography>
          </Breadcrumbs>
        }
        {tag &&
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 1 }}>
            <Link href="/mountains?tab=3" underline="hover" color="inherit" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>山を探す</Link>
            <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{tag.name}</Typography>
          </Breadcrumbs>
        }
        {totalItemCount == 0
          ? <Typography align="right" sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>0件</Typography>
          : <Typography align="right" sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>{((page-1)*itemCount+1)+"〜"+((page-1)*itemCount+displayedItems.length)+"件を表示 / "+totalItemCount+"件中"}</Typography>
        }
        <Stack spacing={3}>
          {displayedItems.map((mountain, i) => (
            <CustomPaper component="a" href={"/mountains/"+mountain.id} elevation={3} key={i} className="mountain-paper">
              <Box sx={{ position: 'relative', width: { xs: '60%', sm: '65%', md: '70%' } }}>
                <Box sx={{ overflowY: 'hidden', position: 'absolute', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', padding: { xs: '2px', sm: '5px' }, boxSizing: 'border-box' }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.875rem' } }}>{mountain.yomi}</Typography>
                  <Typography variant={highMatches ? "h4" : lowMatches ? "h5" : "h6"} sx={{ marginBottom: { xs: '0px', sm: '8px' } }}>{mountain.name}</Typography>
                  <Typography variant="body1" sx={{ marginBottom: { xs: '0px', sm: '8px' }, fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>{"標高: "+mountain.elevation+" m"}</Typography>
                  <Box sx={{ padding: '3px' }}>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>{mountain.introduction}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: { xs: '40%', sm: '35%', md: '30%' }, padding: { xs: '10px 5px', sm: '5px' } }}>
                <img className="index-image" alt={mountain.name} src={mountain.image.url ? mountain.image.url : NoMountainImage} style={{ width: '100%', height: 'auto', verticalAlign: 'middle' }} />
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

export default MountainLineup
