import React, { useState, useEffect, useRef } from "react";
import AuthAPI from "~/services/apis/AuthAPI";
import { useSnackbar } from "notistack";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import FramePage from "~/components/FramePage/FramePage";
import UpdateImage from "~/components/UpdateImage/UpdateImage";
import ImageAPI from "~/services/apis/ImageAPI";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button/Button";
import accountSlice from "~/redux/accountSlice";
import "./EditProfilePage.scss";

export default function EditProfilePage() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.info);
  const [formData, setFormData] = useState({
    ...account,
  });
  const [imageFile, setImageFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImgChange = (e) => {
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/webp",
      "image/jpg",
    ];
    if (!allowedImageTypes.includes(e.target.files[0].type)) {
      alert("Invalid image type");
      return;
    }
    setImageFile(e.target.files[0]);
    setModalOpen(true);
    inputRef.current.value = "";
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  useEffect(() => {
    if (imageFile && modalOpen === false) {
      setFormData({ ...formData, avatar: imageFile });
    }
  }, [imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (imageFile) {
      await ImageAPI.uploadSingle(imageFile).then((res) => {
        updatedData.avatar = res.data.link;
      });
    }
    await AuthAPI.editProfile(updatedData)
      .then(async () => {
        enqueueSnackbar("Hồ sơ đã được cập nhật", { variant: "success" });
        await AuthAPI.getProfile().then((res) => {
          dispatch(accountSlice.actions.updateProfile(res.data));
        });
      })
      .catch(() => {
        enqueueSnackbar("Đã xảy ra lỗi khi cập nhật hồ sơ", {
          variant: "error",
        });
      });
  };

  return (
    <FramePage>
      <div className="edit-profile-page">
        <h1>Chỉnh sửa hồ sơ</h1>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="row">
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="firstName">Họ</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="lastName">Tên</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="sex">Giới tính</label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
            <div className="col l-6 m-6 c-12">
              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col l-12 m-12 c-12">
              <div className="form-group">
                <label htmlFor="introduction">Giới thiệu</label>
                <textarea
                  id="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col l-12 m-12 c-12">
              <div className="form-group">
                <label>Ảnh đại diện</label>
                <div className="avatar-preview" onClick={handleChangeImage}>
                  {formData.avatar !== "url" ? (
                    typeof formData.avatar === "string" ? (
                      <img src={formData.avatar} alt="Avatar" />
                    ) : (
                      <img
                        src={URL.createObjectURL(formData.avatar)}
                        alt="Avatar"
                      />
                    )
                  ) : (
                    <span>Chọn ảnh</span>
                  )}
                </div>
                <input
                  hidden
                  type="file"
                  accept="image/jpeg, image/png, image/bmp, image/webp, image/jpg"
                  ref={inputRef}
                  onChange={handleImgChange}
                />
              </div>
            </div>
          </div>

          <Button onClick={(e) => handleSubmit}>Lưu thay đổi</Button>
        </form>
        <UpdateImage
          modalOpen={modalOpen}
          imageFile={imageFile}
          setModalOpen={setModalOpen}
          setImageFile={setImageFile}
        />
      </div>
    </FramePage>
  );
}
