import "./Navbar.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "~/assets/images/logoMain.jpg";

export default function Navbar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/gioi-thieu", label: "Giới thiệu" },
    { path: "/dich-vu", label: "Dịch vụ" },
    { path: "/san-pham", label: "Sản phẩm" },
    { path: "/lien-he", label: "Liên hệ" },
    { path: "/blog", label: "Blog" },
  ];

  return (
    <header className="navbar-default">
      <div className="navbar-default__container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="navbar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="navbar-search">
          <SearchIcon />
        </div>

        {/* <div className="navbar-right">
          <div className="navbar-social">
            <div className="navbar-social__item">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
            </div>
            <div className="navbar-social__item">
      
              <a href="mailto:pitshongthinh@gmail.com">
                <EmailIcon />
              </a>
            </div>

            <div className="navbar-social__item">
       
              <a href="tel:1900633179">
                <PhoneIcon />
              </a>
            </div>
            <div className="navbar-social__item">
  
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
}
