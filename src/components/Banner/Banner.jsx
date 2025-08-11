import React from "react";
import Slider from "react-slick";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import pathLabels from "~/models/pathLabels ";
import { useLocation, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "~/assets/images/image1.png";
import image2 from "~/assets/images/image2.png";
import image3 from "~/assets/images/image3.png";

export default function Banner() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbPaths = pathnames.map((_, index) => {
    return `/${pathnames.slice(0, index + 1).join("/")}`;
  });

  // Mảng đường dẫn ảnh
  const imagesToShow = [image1, image2, image3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="banner">
      <div className="banner__content row">
        <div className="col l-7 m-7 c-7">
          {pathLabels[pathnames[0]] !== undefined && (
            <h1 className="banner__title">{pathLabels[pathnames[0]]}</h1>
          )}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className="banner__breadcrumbs"
          >
            <Link to="/">
              <HomeIcon />
            </Link>
            {pathnames.length === 0 ? (
              <span>Trang chủ</span>
            ) : (
              pathnames.map((name, index) => {
                const label = pathLabels[name];
                const path = breadcrumbPaths[index];
                return (
                  label && (
                    <Link to={path} key={path}>
                      {label}
                    </Link>
                  )
                );
              })
            )}
          </Breadcrumbs>
        </div>

        <div className="banner__content__right col l-5 m-5 c-5">
          <Slider {...settings}>
            {imagesToShow.map((imgSrc, idx) => (
              <div key={idx}>
                <img src={imgSrc} alt={`Banner slide ${idx + 1}`} className="img" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
