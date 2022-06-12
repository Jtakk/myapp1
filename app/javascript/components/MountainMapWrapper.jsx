import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Box from '@mui/material/Box';
import Spinner from './Spinner';
import LoadError from './LoadError';
import Container from '@mui/material/Container';
import MountainMap from './MountainMap';
import Marker from './Marker';

const MountainMapWrapper = (props) => {
  const [center, setCenter] = React.useState({
    lat: parseFloat(props.mountain.latitude),
    lng: parseFloat(props.mountain.longitude),
  });
  const [zoom, setZoom] = React.useState(props.mountain.zoom);
  const [click, setClick] = React.useState();
  const onClick = (e) => {
    setClick(e.latLng);
  };
  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };
  const inputLat = React.useRef(null);
  const inputLng = React.useRef(null);
  const handleClick = () => {
    const point = new google.maps.LatLng(inputLat.current.value, inputLng.current.value);
    setClick(point);
    setCenter(point);
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
