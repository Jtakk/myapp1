import React from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';

const LinkButton = (props) => {
  return <Button variant="outlined" color="success" href={props.url}>{props.name}</Button>;
};

export default LinkButton
