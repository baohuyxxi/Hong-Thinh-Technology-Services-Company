import React, { useState } from 'react';
import AuthAPI from '~/services/apis/AuthAPI';
import { useSnackbar } from 'notistack';
import DialogLoading from '~/components/DialogLoading/DialogLoading';
import FramePage from '~/components/FramePage/FramePage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '~/components/Button/Button';
import './ChangePasswordPage.scss';

export default function ChangePasswordPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      enqueueSnackbar('Mật khẩu mới không khớp', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      await AuthAPI.changePassword(formData);
      enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Đổi mật khẩu thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FramePage>
      <div className="change-password-page">
        <h1>Đổi Mật Khẩu</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Mật Khẩu Hiện Tại</label>
            <TextField
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrentPassword((prev) => !prev)}>
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Mật Khẩu Mới</label>
            <TextField
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword((prev) => !prev)}>
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Xác Nhận Mật Khẩu Mới</label>
            <TextField
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmNewPassword((prev) => !prev)}>
                      {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button size="large" onClick={handleSubmit}>Đổi mật khẩu</Button>
        </form>
        {loading && <DialogLoading />}
      </div>
    </FramePage>
  );
}
