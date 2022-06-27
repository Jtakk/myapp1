import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const LoadError = () => {
  return (
    <Box>
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        マップコンテンツの読み込みに失敗しました。
      </Alert>
    </Box>
  );
};

export default LoadError
