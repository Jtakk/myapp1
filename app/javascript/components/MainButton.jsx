import React from "react";
import PropTypes from "prop-types";
import { makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    height: 80,
  },
});

const MainButton = () => {
  const classes = useStyles();
  return <Button variant="contained" color="success" className={classes.root}>Hello World</Button>;
};

export default MainButton
