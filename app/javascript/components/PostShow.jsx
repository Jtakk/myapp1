import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Spinner from './Spinner';
import Carousel from './Carousel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinkChips from './LinkChips';
import LikeButton from './LikeButton';
import EditMessage from './EditMessage';
import DeletePost from './DeletePost';
import AvatarChip from './AvatarChip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { format } from 'date-fns';
import UserSideMenuWrapper from './UserSideMenuWrapper';
import useMediaQuery from "@mui/material/useMediaQuery";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const PostShow = ({post, mountain, user, isCurrentUser, photos, currentUser, patchPostToken, deletePostToken, postLikeToken, deleteLikeToken}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GMA_KEY
  });

  const location = {
    lat: parseFloat(post.latitude),
    lng: parseFloat(post.longitude),
  };

  const provideProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const [tab, setTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const renderMap = () => {
    return (
      <UserSideMenuWrapper user={user} isCurrentUser={isCurrentUser}>
        <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
          <Container maxWidth="md" sx={{ py: '40px' }}>
            <Paper elevation={3}>
              <Box sx={{ borderRadius: '4px 4px 0 0', borderBottom: 1, borderColor: 'divider', width: '100%', backgroundColor: '#fff' }}>
                <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
                  <Tab icon={<ImageSearchIcon />} iconPosition="start" label="写真" {...provideProps(0)} />
                  <Tab icon={<LocationOnIcon />} iconPosition="start" label="位置" {...provideProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tab} index={0} style={{ padding: '12px' }}>
                <Box sx={{ p: { xs: 0, sm: '0 24px' } }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{mountain.yomi}</Typography>
                  <Typography variant={matches ? "h4" : "h5"}><Link href={"/mountains/"+mountain.id} underline="hover" color="inherit">{mountain.name}</Link></Typography>
                  <LinkChips prefectures={mountain.prefectures} areas={mountain.areas} tags={mountain.tags} />
                </Box>
                <Box sx={{ padding: { xs: '16px 12px 32px', sm: '16px 32px 32px' } }}>
                  <Carousel sx={{ width: '100%' }}>
                    {photos.map((photo, i) => (
                      <Box key={i} >
                        <img src={photo.image.fixed.url} loading="lazy" alt={photo.image.url} style={{ width: '100%', height: 'auto', verticalAlign: 'middle'}} />
                      </Box>
                    ))}
                  </Carousel>
                </Box>
                <Box sx={{ p: { xs: 0, sm: '0 18px' } }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <LikeButton post={post} postToken={postLikeToken} deleteToken={deleteLikeToken} currentUser={currentUser} />
                  </Box>
                  <AvatarChip user={user} clickable />
                  <Typography variant={matches ? "body1" : "body2"} sx={{ p: { xs: '8px', sm: '16px'} }}>{post.message}</Typography>
                  {currentUser && user.id == currentUser.id &&
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: '8px'}}>
                      <EditMessage sx={{ mr: '16px' }} post={post} token={patchPostToken} defaultValue={post.message} />
                      <DeletePost post={post} token={deletePostToken} />
                    </Box>
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Typography variant="body2" sx={{ color: '#808080', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={tab} index={1} style={{ height: '75vh', padding: '12px' }}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={location}
                  zoom={mountain.zoom}
                >
                  <Marker position={location} />
                </GoogleMap>
              </TabPanel>
            </Paper>
          </Container>
        </Box>
      </UserSideMenuWrapper>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner />
};

export default PostShow
