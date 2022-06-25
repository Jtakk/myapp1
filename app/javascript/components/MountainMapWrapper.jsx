import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import Spinner from './Spinner';
import LoadError from './LoadError';
import Container from '@mui/material/Container';
import MountainMap from './MountainMap';
import Marker from './Marker';
import TextField from '@mui/material/TextField';
import InputMessage from './InputMessage';
import UploadPhotos from './UploadPhotos';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import Grid from '@mui/material/Grid';

const MountainMapWrapper = (props) => {
  const [posts, setPosts] = React.useState([...props.posts]);
  const [center, setCenter] = React.useState({
    lat: parseFloat(props.mountain.latitude),
    lng: parseFloat(props.mountain.longitude),
  });
  const [zoom, setZoom] = React.useState(props.mountain.zoom);
  const [click, setClick] = React.useState();
  const onClick = (e) => {
    setClick(e.latLng.toJSON());
  };
  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
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
  const handleClick = () => {
    const point = { lat: parseFloat(inputLat.current.value), lng: parseFloat(inputLng.current.value) };
    setClick(point);
    setCenter(point);
  };

  const [view, setView] = React.useState();
  const onClickMarker = (post) => {
    setView(post);
    console.log("ピンをクリック");
  };

  const [message, setMessage] = React.useState("");
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const [images, setImages] = React.useState([]);

  const handleOnSubmit = async () => {
    const data = new FormData();
    data.append('post[mountain_id]', props.mountain.id);
    data.append('post[latitude]', click.lat);
    data.append('post[longitude]', click.lng);
    data.append('post[message]', message);
    images.map((image) => {
      data.append('photo[image][]', image);
    });
    const fetch_params = { method: 'POST', headers: { 'X-CSRF-Token': props.token }, body: data };
    const res = await fetch('/posts', fetch_params);
    console.log(res);
  };

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />;
      case Status.FAILURE:
        return <LoadError />;
      case Status.SUCCESS:
        return (
          <Box sx={{ display: "flex", height: "80vh", width: "100%" }}>
            <MountainMap
              style={{ width: "50%", height: "100%" }}
              center={center}
              zoom={zoom}
              onClick={onClick}
              onIdle={onIdle}
            >
              <Marker position={click} icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
              {posts.map((post, i) => (
                <Marker position={{ lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }} onClick={() => onClickMarker(post)} key={i} />
              ))}
            </MountainMap>
            <Box sx={{ width: "50%", height: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
                  <Tab icon={<ImageSearchIcon />} label="投稿を見る" {...provideProps(0)} />
                  <Tab icon={<AddPhotoAlternateIcon />} label="投稿する" {...provideProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tab} index={0}>
                <Box sx={{ position: "relative" }}>
                  <Box sx={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 100, backgroundColor: '#dcdcdc', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} display={view ? "none" : "block"}>
                    <PhotoSizeSelectActualTwoToneIcon fontSize="large"/>
                    <Typography variant="body1">マップ上のピンをクリック!</Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">メッセージ</Typography>
                    {view && <Typography variant="body2">{view.message}</Typography>}
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">投稿写真一覧</Typography>
                    <Grid container spacing={2}>
                      {view && view.photos.map((photo, i) => (
                        <Grid item key={i} xs={6} sm={4} md={3}>
                          <img src={photo.image.thumb.url} style="width:50px;height:50px;" loading="lazy" alt=""/>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <TextField sx={{ flexGrow: 1, mr: 1 }} id="lat" label="緯度" type="number" size="small" margin="normal" inputRef={inputLat} />
                  <TextField sx={{ flexGrow: 1, ml: 1 }} id="lng" label="経度" type="number" size="small" margin="normal" inputRef={inputLng} />
                </Box>
                <Button onClick={handleClick} variant="outlined" size="small" fullWidth>マーカーをセット</Button>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h4">投稿</Typography>
                  <form>
                    <input defaultValue={props.mountain.id} type="hidden" />
                    <input defaultValue={click ? click.lat : ''} type="hidden" />
                    <input defaultValue={click ? click.lng : ''} type="hidden" />
                    <InputMessage value={message} onChange={handleChangeMessage} />
                    <UploadPhotos images={images} setImages={setImages} />
                    <Button onClick={handleOnSubmit} disabled={!click || !images.length}  variant="contained" fullWidth sx={{ mt: 5 }}>投稿する</Button>
                  </form>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_GMA_KEY} render={render} />
  );
};

export default MountainMapWrapper
