import React from 'react';
import { styled } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomDiv = styled('div')({
  '&::before': { color: "black!important", fontSize: "30px!important" }
});

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CustomDiv
      className={className}
      style={{ ...style, display: "block", height: "30px", width: "30px" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <CustomDiv
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

const Carousel = ({children}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider {...settings} >
      {children}
    </Slider>
  );
};

export default Carousel
