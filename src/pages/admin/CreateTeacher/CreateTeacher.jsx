// CreateTeacher.jsx

import "./CreateTeacher.scss";
import React, { useState } from "react";
import AuthAPI from "~/services/apis/AuthAPI";
import FramePage from "~/components/FramePage/FramePage";
import { useSnackbar } from "notistack";
import Button from "~/components/Button/Button";
const CreateTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    avatar: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    role: "TEACHER",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await AuthAPI.createTeacher(teacherData)
      .then((res) => {
        enqueueSnackbar("Thêm giáo viên thành công", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Thêm giáo viên thất bại", { variant: "error" });
      });
  };

  return (
    <FramePage>
      <div className="create-teacher">
        <h1 className="create-teacher__title">Thêm Giáo Viên Mới</h1>
        <form className="create-teacher__form" onSubmit={handleSubmit}>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="firstName">
              Tên
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={teacherData.firstName}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="lastName">
              Họ
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={teacherData.lastName}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="sex">
              Giới Tính
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              value={teacherData.sex}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
         
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="address">
              Địa Chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={teacherData.address}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={teacherData.email}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="password">
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={teacherData.password}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <div className="create-teacher__form-group">
            <label className="create-teacher__label" htmlFor="phone">
              Số Điện Thoại
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={teacherData.phone}
              onChange={handleChange}
              className="create-teacher__input"
            />
          </div>
          <Button type="submit" className="create-teacher__button">
            Thêm Giáo Viên
          </Button>
        </form>
      </div>
    </FramePage>
  );
};

export default CreateTeacher;
