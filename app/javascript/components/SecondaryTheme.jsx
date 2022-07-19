import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SecondaryTheme = ({children}) => {
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default SecondaryTheme
