import "./UserMenu.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import accountSlice from "~/redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const account = useSelector((state) => state.account.info);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(accountSlice.actions.logout());
    navigate("/");
    handleMenuClose();
  };

  return (
    <div className="user-menu">
      <Button edge="end" color="inherit" onClick={handleMenuOpen}>
        {account.avatar === "url" ? (
          <AccountCircle />
        ) : (
          <Avatar src={account.avatar} alt="User Avatar" />
        )}

        <span>{` ${account.lastName}`}</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/edit-profile" className="user-menu-item">
            <EditIcon />
            <span>Chỉnh sửa tài khoản</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/change-password" className="user-menu-item">
            <LockIcon />
            <span>Đổi mật khẩu</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout} className="user-menu-item">
          <LogoutIcon />
          <span>Đăng xuất</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
