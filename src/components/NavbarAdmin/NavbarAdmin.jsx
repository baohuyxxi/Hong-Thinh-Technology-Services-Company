import "./NavbarAdmin.scss";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "~/assets/images/logoMain.jpg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function NavbarAdmin() {
  return (
    <header className="navbar-default">
      <div className="navbar-default__container">
        <div className="slide-menu">
          <Link to="/" className="slide-menu__item">
            <HomeOutlinedIcon />
            <span>Trang chủ</span>
          </Link>
          <Link to="/introduce" className="slide-menu__item">
            <span>Giới thiệu</span>
          </Link>
          <Link to="/teaching-staff" className="slide-menu__item">
            <span>Đội ngũ giáo viên</span>
          </Link>
          <Link to="/courses" className="slide-menu__item">
            <span>Khóa học</span>
          </Link>
          <Link to="/homework" className="slide-menu__item">
            <span>Bài kiểm tra</span>
          </Link>
          <Link to="#z" className="slide-menu__item">
            <span>Toán vui</span>
          </Link>
          <Link to="#z" className="slide-menu__item">
            <span>Thi thử</span>
          </Link>
          <Link to="/exams" className="slide-menu__item">
            <span>Đề thi </span>
          </Link>
          <Link to="#z" className="slide-menu__item">
            <span>Tài liệu</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
