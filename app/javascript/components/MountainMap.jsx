import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import MountainIntroduction from './MountainIntroduction';
import TextField from '@mui/material/TextField';
import InputMessage from './InputMessage';
import UploadPhotos from './UploadPhotos';
import HelpToCreatePost from './HelpToCreatePost';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import AvatarChip from './AvatarChip';
import FlashX from './FlashX';
import Carousel from './Carousel';
import Spinner from './Spinner';
import LikeButton from './LikeButton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LikeIndicator from './LikeIndicator';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { format } from 'date-fns';
import useMediaQuery from "@mui/material/useMediaQuery";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const coverStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: '#dcdcdc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const CustomTab = styled(Tab)(({theme}) => ({
  minWidth: '60px',
  padding: '12px 16px',
  fontSize: '0.875rem',
  [theme.breakpoints.down('md')]: {
    padding: '6px 8px',
    fontSize: '0.7rem',
  },
}));

const MountainMap = (props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GMA_KEY
  });

  const [posts, setPosts] = React.useState([...props.posts]);
  const [sortedPosts, setSortedPosts] = React.useState([]);

  React.useEffect(() => {
    const arr = [...posts].sort((a, b) => {
      return b.liked_users.length - a.liked_users.length
    });
    setSortedPosts(arr);
  }, []);

  const [center, setCenter] = React.useState({
    lat: parseFloat(props.mountain.latitude),
    lng: parseFloat(props.mountain.longitude),
  });
  const [zoom, setZoom] = React.useState(props.mountain.zoom);
  const [pin, setPin] = React.useState();
  const onClickMap = (e) => {
    setPin(e.latLng.toJSON());
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
  const inputLat = React.useRef(null);
  const inputLng = React.useRef(null);
  const onSetMarker = () => {
    const point = { lat: parseFloat(inputLat.current.value), lng: parseFloat(inputLng.current.value) };
    setPin(point);
    setCenter(point);
  };
  const [view, setView] = React.useState();
  const onClickMarker = (post) => {
    setView(post);
    setTab(2);
  };
  const [message, setMessage] = React.useState("");
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [flashMessageType, setFlashMessageType] = React.useState("");
  const [flashMessage, setFlashMessage] = React.useState("");

  const [images, setImages] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const handleOnSubmit = async () => {
    if (loading == true) return;
    setLoading(true);
    const data = new FormData();
    data.append('post[mountain_id]', props.mountain.id);
    data.append('post[latitude]', pin.lat);
    data.append('post[longitude]', pin.lng);
    data.append('post[message]', message);
    images.map((image) => {
      data.append('photo[image][]', image);
    });
    const fetch_params = { method: 'POST', headers: { 'X-CSRF-Token': props.postPostToken }, body: data };
    const res = await fetch('/posts', fetch_params);
    if (res.status == 302) {
      const resData = await res.json();
      window.location.href = resData.redirect_url;
    } else if (!res.ok) {
      console.error('通信エラー');
      setFlashMessageType('warning');
      setFlashMessage('通信エラー');
      setOpen(true);
      setLoading(false);
    } else {
      const resData = await res.json();
      const resPost = resData.post;
      const resFlash = resData.flash;
      if (resPost) {
        setPosts([resPost, ...posts]);
        setSortedPosts([...sortedPosts, resPost]);
        setPin();
        setMessage("");
        setImages([]);
        setTab(2);
        setView(resPost);
      }
      setFlashMessageType(resFlash.message_type);
      setFlashMessage(resFlash.message);
      setOpen(true);
      setLoading(false);
    }
  };

  const [mapview, setMapview] = React.useState(false);
  const switchMap = () => {
    setMapview(!mapview);
  };

  const [alignment, setAlignment] = React.useState('recent');
  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const theme = useTheme();
  const lowMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const highMatches = useMediaQuery(theme.breakpoints.up('md'));

  const renderMap = () => {
    return (
      <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
        {mapview &&
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', opacity: '0.8', zIndex: '1000' }} onClick={() => switchMap()}></Box>
        }
        <Box sx={{ position: 'absolute', top: { xs: '5%', sm: 0 }, left: { xs: '10%', sm: 0 }, width: { xs: '80%', sm: '40%' }, height: { xs: '80%', sm: '100%' }, visibility: { xs: mapview ? 'visible' : 'hidden', sm: 'visible' }, zIndex: '1100' }} >
          {!lowMatches &&
            <Box sx={{ backgroundColor: '#fff', p: '5px 10px' }}>
              <Button variant="contained" color="success" size="small" startIcon={<ClearIcon fontSize="small" />} fullWidth onClick={() => switchMap()}>マップを閉じる</Button>
            </Box>
          }
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={onClickMap}
            mapTypeId={google.maps.MapTypeId.HYBRID}
          >
            <Marker position={pin} icon="http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png" >
              {pin &&
                <InfoWindow onCloseClick={() => setPin()} >
                  <Button size="small" variant="contained" onClick={() => {setTab(3); switchMap();}}>投稿内容を入力</Button>
                </InfoWindow>
              }
            </Marker>
            {posts.map((post, i) => (
              <Marker position={{ lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }} onClick={() => onClickMarker(post)} key={i}>
                { (view === post) &&
                  <InfoWindow onCloseClick={() => setView()} >
                    <div>選択中</div>
                  </InfoWindow>
                }
              </Marker>
            ))}
          </GoogleMap>
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '60%' }, height: '100%', position: 'absolute', top: 0, right: 0, overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', position: 'sticky', top: 0, zIndex: '100', backgroundColor: '#fff' }}>
            {!lowMatches &&
              <Box sx={{ backgroundColor: '#fff', p: '5px 10px' }}>
                <Button size="small" variant="contained" color="success" fullWidth onClick={() => switchMap()}>マップを開く</Button>
              </Box>
            }
            <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
              <CustomTab icon={<InfoIcon />} label="基本情報" {...provideProps(0)} />
              <CustomTab icon={<FormatListBulletedIcon />} label="一覧から探す" {...provideProps(1)} />
              <CustomTab icon={<ImageSearchIcon />} label="投稿を見る" {...provideProps(2)} />
              <CustomTab icon={<AddPhotoAlternateIcon />} label="投稿する" {...provideProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0} style={{ height: '100%' }}>
            <MountainIntroduction mountain={props.mountain} />
          </TabPanel>
          <TabPanel value={tab} index={1} style={{ height: '100%' }}>
            <Box sx={{ p: '16px', minHeight: '100%', bgcolor: '#f5f5f5' }} >
              <Box sx={{ textAlign: 'right', mb: '16px' }} >
                <ToggleButtonGroup color="primary" size="small" value={alignment} exclusive onChange={handleChangeToggle} sx={{ bgcolor: '#fff' }}>
                  <ToggleButton value="recent">新着</ToggleButton>
                  <ToggleButton value="like">いいね数</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Stack spacing={3}>
                {alignment == 'recent' && posts.map((post, i) => (
                  <Paper elevation={3} key={i} onClick={() => onClickMarker(post)} sx={{ p: '8px', height: { xs: '84px', sm: '104px' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: view == post ? '#f0f8ff' : 'none', cursor: 'pointer' }} id={"recent-posts-"+i}>
                    <Box sx={{ overflowY: 'hidden' }}>
                      <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                        <AvatarChip user={post.user} />
                        <LikeIndicator post={post} currentUser={props.currentUser} />
                      </Box>
                      <Typography variant={lowMatches ? "body1" : "body2"} sx={{ p: '8px' }}>{post.message}</Typography>
                    </Box>
                    <Typography variant="body2" align="right" sx={{ color: '#808080', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
                  </Paper>
                ))}
                {alignment == 'like' && sortedPosts.map((post, i) => (
                  <Paper elevation={3} key={i} onClick={() => onClickMarker(post)} sx={{ p: '8px', height: { xs: '84px', sm: '104px' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', bgcolor: view == post ? '#f0f8ff' : 'none', cursor: 'pointer' }} id={"like-posts-"+i}>
                    <Box sx={{ overflowY: 'hidden' }}>
                      <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                        <AvatarChip user={post.user} />
                        <LikeIndicator post={post} currentUser={props.currentUser} />
                      </Box>
                      <Typography variant={lowMatches ? "body1" : "body2"} sx={{ p: '8px' }}>{post.message}</Typography>
                    </Box>
                    <Typography variant="body2" align="right" sx={{ color: '#808080', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } }}>{format(new Date(post.created_at), 'yyyy-MM-dd')}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={2} style={{ height: '100%' }}>
            <Box sx={{ position: "relative", height: '100%' }} id="post-view">
              {!view &&
                <Box sx={coverStyle} >
                  <PhotoSizeSelectActualTwoToneIcon fontSize="large"/>
                  <Typography variant="body1">マップ上のピンをクリック!</Typography>
                </Box>
              }
              {view &&
                <>
                  <Box sx={{ p: 4 }}>
                    <Carousel>
                      {view.photos.map((photo, i) => (
                        <Box key={i} >
                          <img src={photo.image.fixed.url} loading="lazy" alt={photo.image.url} style={{ width: '100%', height: 'auto'}} />
                        </Box>
                      ))}
                    </Carousel>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                      <AvatarChip user={view.user} clickable />
                      <LikeButton post={view} postToken={props.postLikeToken} deleteToken={props.deleteLikeToken} currentUser={props.currentUser} />
                    </Box>
                    <Typography variant="body2" sx={{ p: 1 }}>{view.message}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                      <Typography variant="body2" sx={{ color: '#808080'}}>{format(new Date(view.created_at), 'yyyy-MM-dd')}</Typography>
                    </Box>
                  </Box>
                </>
              }
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={3} style={{ height: '100%' }} id="tabpanel-create-post">
            <Box sx={{ position: "relative", height: '100%' }} >
              {!props.currentUser &&
                <Box sx={coverStyle} >
                  <Button color="primary" variant="contained" href="/login">ログイン</Button>
                  <Typography variant="body1">投稿にはログインが必要です</Typography>
                </Box>
              }
              <Box sx={{ p: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <HelpToCreatePost/>
                </Box>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>撮影地点を決める</Typography>
                <Box sx={{ py: 2, px: 1, mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>マップをクリックもしくは下記に緯度•経度を入力してマーカーを設置する</Typography>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <TextField sx={{ flexGrow: 1, mr: 1 }} id="lat" label="緯度" type="number" size="small" margin="normal" inputRef={inputLat} />
                    <TextField sx={{ flexGrow: 1, ml: 1 }} id="lng" label="経度" type="number" size="small" margin="normal" inputRef={inputLng} />
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Button onClick={onSetMarker} variant="outlined" size={highMatches ? 'medium' : 'small'} sx={{ maxWidth: "300px" }}>マーカーを設置</Button>
                  </Box>
                </Box>
                <form>
                  <Typography variant="h6">メッセージを残す</Typography>
                  <input defaultValue={props.mountain.id} type="hidden" />
                  <input defaultValue={pin ? pin.lat : ''} type="hidden" />
                  <input defaultValue={pin ? pin.lng : ''} type="hidden" />
                  <Box sx={{ px: 2, mb: 3 }}>
                    <InputMessage value={message} onChange={handleChangeMessage} />
                  </Box>
                  <Typography variant="h6">写真を追加する (最大10枚)</Typography>
                  <Box sx={{ py: 2, px: 1, mb: 5 }}>
                    <UploadPhotos images={images} setImages={setImages} size={highMatches ? 'medium' : 'small'} sx={{ mb: '8px' }} />
                  </Box>
                  <Box sx={{ position: 'relative' }}>
                    <Button id="btn-submit-post" onClick={handleOnSubmit} disabled={!pin || !images.length || loading}  variant="contained" size={highMatches ? 'medium' : 'small'} fullWidth >この内容で投稿する</Button>
                    {loading &&
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    }
                  </Box>
                </form>
              </Box>
            </Box>
          </TabPanel>
        </Box>
        <FlashX message_type={flashMessageType} message={flashMessage} open={open} setOpen={setOpen} />
      </Box>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner />
};

export default MountainMap
