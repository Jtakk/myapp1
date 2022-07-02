import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
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
    const fetch_params = { method: 'POST', headers: { 'X-CSRF-Token': props.token }, body: data };
    const res = await fetch('/posts', fetch_params);
    if (!res.ok) {
      console.error('通信エラー');
      return;
    }
    const resData = await res.json();
    const resPost = resData.post;
    const resFlash = resData.flash;
    if (resPost) {
      setPosts([...posts, resPost]);
      setPin();
      setMessage("");
      setImages([]);
      setTab(0);
      setView(resPost);
    }
    setFlashMessageType(resFlash.message_type);
    setFlashMessage(resFlash.message);
    setOpen(true);
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
            <Marker position={pin} icon="http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png" />
            {posts.map((post, i) => (
              <Marker position={{ lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }} onClick={() => onClickMarker(post)} key={i} />
            ))}
          </GoogleMap>
        </Box>
        <Box sx={{ width: '60%', height: '100%', position: 'absolute', top: 0, right: 0, overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', position: 'sticky', top: 0, zIndex: '100', backgroundColor: '#fff' }}>
            <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
              <Tab icon={<InfoIcon />} label="基本情報" {...provideProps(0)} />
              <Tab icon={<FormatListBulletedIcon />} label="写真一覧" {...provideProps(1)} />
              <Tab icon={<ImageSearchIcon />} label="投稿を探す" {...provideProps(2)} />
              <Tab icon={<AddPhotoAlternateIcon />} label="投稿する" {...provideProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0} style={{ height: '100%' }}>
            <MountainIntroduction mountain={props.mountain} />
          </TabPanel>
          <TabPanel value={tab} index={1} style={{ height: '100%' }}>

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
              <Box sx={{ p: 1 }}>
                {view && <AvatarChip src={view.user.avatar.thumb.url} alt={view.user.avatar.url} label={view.user.name} />}
              </Box>
              <Box sx={{ p: 1 }}>
                {view && <Typography variant="body2">{view.message}</Typography>}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={3} style={{ height: '100%' }}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <TextField sx={{ flexGrow: 1, mr: 1 }} id="lat" label="緯度" type="number" size="small" margin="normal" inputRef={inputLat} />
              <TextField sx={{ flexGrow: 1, ml: 1 }} id="lng" label="経度" type="number" size="small" margin="normal" inputRef={inputLng} />
            </Box>
            <Button onClick={onSetMarker} variant="outlined" size="small" fullWidth>マーカーをセット</Button>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4">投稿</Typography>
              <form>
                <input defaultValue={props.mountain.id} type="hidden" />
                <input defaultValue={pin ? pin.lat : ''} type="hidden" />
                <input defaultValue={pin ? pin.lng : ''} type="hidden" />
                <InputMessage value={message} onChange={handleChangeMessage} />
                <UploadPhotos images={images} setImages={setImages} />
                <Button onClick={handleOnSubmit} disabled={!pin || !images.length}  variant="contained" fullWidth sx={{ mt: 5 }}>投稿する</Button>
              </form>
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
