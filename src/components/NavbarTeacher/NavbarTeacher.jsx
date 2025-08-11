import "./NavbarTeacher.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function NavbarTeacher() {
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
