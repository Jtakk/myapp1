import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import MountainIntroduction from './MountainIntroduction';
import TextField from '@mui/material/TextField';
import InputMessage from './InputMessage';
import UploadPhotos from './UploadPhotos';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
  const handleOnSubmit = async () => {
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
    }
  };

  const [alignment, setAlignment] = React.useState('recent');
  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };



  const renderMap = () => {
    return (
      <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%'}} >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={onClickMap}
          >
            <Marker position={pin} icon="http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png" >
              {pin &&
                <InfoWindow onCloseClick={() => setPin()} >
                  <Button size="small" variant="contained" onClick={() => setTab(3)}>投稿する</Button>
                </InfoWindow>
              }
            </Marker>
            {posts.map((post, i) => (
              <Marker position={{ lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }} onClick={() => onClickMarker(post)} key={i} >
                { (view === post) &&
                  <InfoWindow onCloseClick={() => setView()} >
                    <div>Checked!</div>
                  </InfoWindow>
                }
              </Marker>
            ))}
          </GoogleMap>
        </Box>
        <Box sx={{ width: '60%', height: '100%', position: 'absolute', top: 0, right: 0, overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', position: 'sticky', top: 0, zIndex: '100', backgroundColor: '#fff' }}>
            <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
              <Tab icon={<InfoIcon />} label="基本情報" {...provideProps(0)} />
              <Tab icon={<FormatListBulletedIcon />} label="一覧から探す" {...provideProps(1)} />
              <Tab icon={<ImageSearchIcon />} label="投稿を見る" {...provideProps(2)} />
              <Tab icon={<AddPhotoAlternateIcon />} label="投稿する" {...provideProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0} style={{ height: '100%' }}>
            <MountainIntroduction mountain={props.mountain} />
          </TabPanel>
          <TabPanel value={tab} index={1} style={{ height: '100%' }}>
            <Box sx={{ p: 2, minHeight: '100%', bgcolor: '#f5f5f5' }} >
              <Box sx={{ textAlign: 'right', mb: 2 }} >
                <ToggleButtonGroup color="primary" size="small" value={alignment} exclusive onChange={handleChangeToggle} sx={{ bgcolor: '#fff' }}>
                  <ToggleButton value="recent">新着</ToggleButton>
                  <ToggleButton value="like">いいね数</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Stack spacing={3}>
                {alignment == 'recent' && posts.map((post, i) => (
                  <Paper elevation={3} key={i} onClick={() => onClickMarker(post)} sx={{ p: 1, bgcolor: view == post ? '#f0f8ff' : 'none', cursor: 'pointer' }}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <AvatarChip user={post.user} />
                      <LikeIndicator post={post} currentUser={props.currentUser} />
                    </Box>
                    <Typography variant="body1">{post.message}</Typography>
                  </Paper>
                ))}
                {alignment == 'like' && sortedPosts.map((post, i) => (
                  <Paper elevation={3} key={i} onClick={() => onClickMarker(post)} sx={{ p: 1, bgcolor: view == post ? '#f0f8ff' : 'none', cursor: 'pointer' }}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <AvatarChip user={post.user} />
                      <LikeIndicator post={post} currentUser={props.currentUser} />
                    </Box>
                    <Typography variant="body1">{post.message}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={2} style={{ height: '100%' }}>
            <Box sx={{ position: "relative", height: '100%' }}>
              {!view &&
                <Box sx={coverStyle} >
                  <PhotoSizeSelectActualTwoToneIcon fontSize="large"/>
                  <Typography variant="body1">マップ上のピンをクリック!</Typography>
                </Box>
              }
              <Box sx={{ p: 4 }}>
                <Carousel>
                  {view && view.photos.map((photo, i) => (
                    <Box key={i} >
                      <img src={photo.image.fixed.url} loading="lazy" alt={photo.image.url} style={{ width: '100%', height: 'auto'}} />
                    </Box>
                  ))}
                </Carousel>
              </Box>
              <Box sx={{ p: 1, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                {view && <AvatarChip user={view.user} />}
                {view && <LikeButton post={view} postToken={props.postLikeToken} deleteToken={props.deleteLikeToken} currentUser={props.currentUser} />}
              </Box>
              <Box sx={{ p: 1 }}>
                {view && <Typography variant="body2">{view.message}</Typography>}
              </Box>
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
              <Box sx={{ p: 4 }}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <TextField sx={{ flexGrow: 1, mr: 1 }} id="lat" label="緯度" type="number" size="small" margin="normal" inputRef={inputLat} />
                  <TextField sx={{ flexGrow: 1, ml: 1 }} id="lng" label="経度" type="number" size="small" margin="normal" inputRef={inputLng} />
                </Box>
                <Button onClick={onSetMarker} variant="outlined" size="small" fullWidth>マーカーをセット</Button>
                <Box>
                  <Typography variant="h6">投稿</Typography>
                  <form>
                    <input defaultValue={props.mountain.id} type="hidden" />
                    <input defaultValue={pin ? pin.lat : ''} type="hidden" />
                    <input defaultValue={pin ? pin.lng : ''} type="hidden" />
                    <InputMessage value={message} onChange={handleChangeMessage} />
                    <UploadPhotos images={images} setImages={setImages} />
                    <Button id="btn-submit-post" onClick={handleOnSubmit} disabled={!pin || !images.length}  variant="contained" fullWidth sx={{ mt: 5 }}>この内容で投稿する</Button>
                  </form>
                </Box>
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
