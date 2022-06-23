import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Box from '@mui/material/Box';
import Spinner from './Spinner';
import LoadError from './LoadError';
import Container from '@mui/material/Container';
import MountainMap from './MountainMap';
import Marker from './Marker';
import InputMessage from './InputMessage';
import UploadPhotos from './UploadPhotos';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

const MountainMapWrapper = (props) => {
  const { control } = useForm({
    mode: "onChange"
  });
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
  const inputLat = React.useRef(null);
  const inputLng = React.useRef(null);
  const handleClick = () => {
    const point = { lat: parseFloat(inputLat.current.value), lng: parseFloat(inputLng.current.value) };
    setClick(point);
    setCenter(point);
  };

  const [message, setMessage] = React.useState();
  const handleChange = (e) => {
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
          <Box sx={{ display: "flex", height: "500px" }}>
            <MountainMap
              style={{ flexGrow: "1", height: "100%" }}
              center={center}
              zoom={zoom}
              onClick={onClick}
              onIdle={onIdle}
            >
              <Marker position={click} />
            </MountainMap>
            <Box sx={{ overflow: "auto", flexBasis: "250px", height: "100%" }}>
              <label htmlFor="lat">Latitude</label>
              <input type="number" id="lat" name="lat" ref={inputLat}/>
              <label htmlFor="lng">Longitude</label>
              <input type="number" id="lng" name="lng" ref={inputLng}/>
              <button onClick={handleClick}>set Marker</button>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4">投稿</Typography>
                <form>
                  <input defaultValue={props.mountain.id} type="hidden" />
                  <input defaultValue={click ? click.lat : ''} type="hidden" />
                  <input defaultValue={click ? click.lng : ''} type="hidden" />
                  <InputMessage defaultValue="" value={message} onChange={handleChange} />
                  <UploadPhotos images={images} setImages={setImages} />
                  <Button onClick={handleOnSubmit} variant="contained" fullWidth sx={{ mt: 5 }}>投稿する</Button>
                </form>
              </Box>
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
