import React, { useState } from "react";
import "./SignUp.scss";
import FramePage from "~/components/FramePage/FramePage";
import AuthAPI from "~/services/apis/AuthAPI";
import { useSnackbar } from "notistack";
import { validateSignUpForm } from "~/utils/validate";
import { initialFormData, initialFormErrors } from "~/models/signUpFormModel";
import { useDispatch } from "react-redux";
import accountSlice from "~/redux/accountSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await AuthAPI.registerStudent(formData);
        enqueueSnackbar("Đăng ký thành công", { variant: "success" });

        // Automatically log in after successful registration
        const loginData = { account: formData.email, password: formData.password };
        const loginResponse = await AuthAPI.login(loginData);
        dispatch(accountSlice.actions.login(loginResponse.data));
        enqueueSnackbar("Đăng nhập thành công", { variant: "success" });
        navigate("/");

        setFormData(initialFormData);
      } catch (error) {
        enqueueSnackbar("Đăng ký hoặc đăng nhập thất bại", { variant: "error" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <FramePage>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="sign-up-form__group">
          <label htmlFor="firstName">Họ</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="sign-up-form__group">
          <label htmlFor="lastName">Tên</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="sign-up-form__group">
          <label htmlFor="sex">Giới tính</label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        {/* <div className="sign-up-form__group">
          <label htmlFor="avatar">Avatar URL</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div> */}

        <div className="sign-up-form__group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="sign-up-form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="sign-up-form__group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="sign-up-form__group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <button type="submit">Đăng ký</button>
      </form>
    </FramePage>
  );
}
