import "./Banner.scss";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import pathLabels from "~/models/pathLabels ";
import { useLocation, Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "~/assets/images/image1.png";
import image2 from "~/assets/images/image2.png";
import image3 from "~/assets/images/image3.png";

export default function Banner() {
  const imagesToShow = [image1, image2, image3];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    initialSlide: 0,
  };

  return (
    <div className="banner">
      <div className="banner__content row">
        <div className="banner__content__right col l-5 m-5 c-5">
          <Slider {...settings}>
            {imagesToShow.map((image, index) => (
              <div>
                <img key={index} src={image} alt={`Banner ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
