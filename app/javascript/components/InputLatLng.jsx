import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const InputLatLng = ({onSetMarker}) => {
  const [unit, setUnit] = React.useState('decimal');
  const handleChangeToggle = (event, newUnit) => {
    setUnit(newUnit);
  };
  const inputLatDecimal = React.useRef(null);
  const inputLngDecimal = React.useRef(null);
  const inputLatD = React.useRef(null);
  const inputLatM = React.useRef(null);
  const inputLatS = React.useRef(null);
  const inputLngD = React.useRef(null);
  const inputLngM = React.useRef(null);
  const inputLngS = React.useRef(null);
  const handleChangeInputDecimal = () => {
    if (inputLatDecimal.current.value && inputLngDecimal.current.value) {
      const point = { lat: parseFloat(inputLatDecimal.current.value), lng: parseFloat(inputLngDecimal.current.value) };
      onSetMarker(point);
      console.log("更新");
    }
  };
  const handleChangeInputDMS = () => {
    if (inputLatD.current.value && inputLngD.current.value) {
      const convertedLat = parseFloat(inputLatD.current.value) + (inputLatM.current.value/60) + (inputLatS.current.value/3600);
      const convertedLng = parseFloat(inputLngD.current.value) + (inputLngM.current.value/60) + (inputLngS.current.value/3600);
      const point = { lat: convertedLat, lng: convertedLng };
      onSetMarker(point);
      console.log("更新");
    }
  };

  return (
    <Box sx={{ mt: "8px" }}>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="body2" sx={{ display: "inline", mr: "4px", fontSize: "0.8rem" }}>入力タイプ:</Typography>
        <ToggleButtonGroup color="primary" size="small" value={unit} exclusive onChange={handleChangeToggle} sx={{ bgcolor: '#fff' }}>
          <ToggleButton value="decimal">小数</ToggleButton>
          <ToggleButton value="dms">度•分•秒</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {unit == 'decimal' &&
        <Box sx={{ pt: "12px" }}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", mb: "8px" }}>
            <Typography variant="body2" sx={{ width: "36px", mr: "4px", fontSize: { xs: "0.8rem", md: "0.875rem" } }}>緯度:</Typography>
            <TextField
              sx={{ flexGrow: 1, maxWidth: "250px" }}
              id="lat"
              type="number"
              size="small"
              margin="none"
              placeholder="例) 35.3608"
              inputRef={inputLatDecimal} />
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", mb: "8px" }}>
            <Typography variant="body2" sx={{ width: "36px", mr: "4px", fontSize: { xs: "0.8rem", md: "0.875rem" } }}>経度:</Typography>
            <TextField
              sx={{ flexGrow: 1, maxWidth: "250px" }}
              id="lng"
              type="number"
              size="small"
              margin="none"
              placeholder="例) 138.7275"
              inputRef={inputLngDecimal} />
          </Box>
          <Box sx={{ textAlign: "center"}}>
            <Button onClick={handleChangeInputDecimal} variant="outlined" size="small" sx={{ maxWidth: "300px" }}>マーカーを設置</Button>
          </Box>
        </Box>
      }
      {unit == 'dms' &&
        <Box sx={{ pt: "12px" }}>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", mb: "8px" }}>
            <Typography variant="body2" sx={{ width: "36px", mr: { md: "4px" }, fontSize: { xs: "0.8rem", md: "0.875rem" } }}>緯度:</Typography>
            <TextField
              sx={{ flex: 1, mr: "4px", maxWidth: "100px" }}
              label="度"
              type="number"
              size="small"
              inputRef={inputLatD}
              InputProps={{ endAdornment: <InputAdornment position="end">°</InputAdornment>, }}
            />
            <TextField
              sx={{ flex: 1, mr: "4px", maxWidth: "100px" }}
              label="分"
              type="number"
              size="small"
              inputRef={inputLatM}
              InputProps={{ endAdornment: <InputAdornment position="end">'</InputAdornment>, }}
            />
            <TextField
              sx={{ flex: 1, maxWidth: "100px" }}
              label="秒"
              type="number"
              size="small"
              inputRef={inputLatS}
              InputProps={{ endAdornment: <InputAdornment position="end">"</InputAdornment>, }}
            />
          </Box>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", mb: "8px" }}>
            <Typography variant="body2" sx={{ width: "36px", mr: { md: "4px" }, fontSize: { xs: "0.8rem", md: "0.875rem" } }}>経度:</Typography>
            <TextField
              sx={{ flex: 1, mr: "4px", maxWidth: "100px" }}
              label="度"
              type="number"
              size="small"
              inputRef={inputLngD}
              InputProps={{ endAdornment: <InputAdornment position="end">°</InputAdornment>, }}
            />
            <TextField
              sx={{ flex: 1, mr: "4px", maxWidth: "100px" }}
              label="分"
              type="number"
              size="small"
              inputRef={inputLngM}
              InputProps={{ endAdornment: <InputAdornment position="end">'</InputAdornment>, }}
            />
            <TextField
              sx={{ flex: 1, maxWidth: "100px" }}
              label="秒"
              type="number"
              size="small"
              inputRef={inputLngS}
              InputProps={{ endAdornment: <InputAdornment position="end">"</InputAdornment>, }}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button onClick={handleChangeInputDMS} variant="outlined" size="small" sx={{ maxWidth: "300px" }}>マーカーを設置</Button>
          </Box>
        </Box>
      }
    </Box>
  );
};

export default InputLatLng
