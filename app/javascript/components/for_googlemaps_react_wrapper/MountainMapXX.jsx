import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import TextField from '@mui/material/TextField';
import InputMessage from './InputMessage';
import UploadPhotos from './UploadPhotos';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import Grid from '@mui/material/Grid';
import FlashX from './FlashX';
import Modal from '@mui/material/Modal';
import Carousel from './Carousel';

const containerStyle = {
  width: '50%',
  height: '100%',
};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MountainMap = (props) => {
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

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
    console.log(resData);
    console.log(resPost);
    console.log(resFlash);
    setFlashMessageType(resFlash.message_type);
    setFlashMessage(resFlash.message);
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", height: "80vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GMA_KEY}>
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
      </LoadScript>
      <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
            <Tab icon={<ImageSearchIcon />} label="投稿を見る" {...provideProps(0)} />
            <Tab icon={<AddPhotoAlternateIcon />} label="投稿する" {...provideProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0} style={{ height: '100%' }}>
          <Box sx={{ position: "relative", height: '100%' }}>
            {!view &&
              <Box
                sx={{
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
                }}
              >
                <PhotoSizeSelectActualTwoToneIcon fontSize="large"/>
                <Typography variant="body1">マップ上のピンをクリック!</Typography>
              </Box>
            }
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">メッセージ</Typography>
              {view && <Typography variant="body2">{view.message}</Typography>}
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">投稿写真一覧</Typography>
              <Grid container spacing={2}>
                {view && view.photos.map((photo, i) => (
                  <Grid item key={i} xs={6} sm={4} md={3}>
                    <img src={photo.image.thumb.url} loading="lazy" alt={photo.image.url}/>
                  </Grid>
                ))}
              </Grid>
              <Button onClick={handleOpenModal} >open modal</Button>
              <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                  <Carousel/>
                </Box>
              </Modal>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1} style={{ height: '100%' }}>
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

export default MountainMap
