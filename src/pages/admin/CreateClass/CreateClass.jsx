import React, { useState, useRef } from "react";
import { useSnackbar } from "notistack";
import AdminAPI from "~/services/apis/AdminAPI";
import ImageAPI from "~/services/apis/ImageAPI";
import UpdateImage from "~/components/UpdateImage/UpdateImage";
import Button from "~/components/Button/Button";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import FramePage from "~/components/FramePage/FramePage";
import "./CreateClass.scss";

const CreateClass = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      [
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/webp",
        "image/jpg",
      ].includes(file.type)
    ) {
      setImageFile(file);
      setModalOpen(true);
    } else {
      enqueueSnackbar("Định dạng hình ảnh không hợp lệ", { variant: "error" });
    }
    inputRef.current.value = "";
  };

  const handleChangeImage = () => {
    inputRef.current.click();
  };

  const handleImageUpload = async () => {
    try {
      if (imageFile) {
        const response = await ImageAPI.uploadSingle(imageFile);
        setClassData((prevData) => ({ ...prevData, image: response.url }));
      }
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi tải lên hình ảnh", {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleImageUpload(); // Upload image before sending data
      await AdminAPI.createClass(classData);
      enqueueSnackbar("Tạo lớp học thành công", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Đã xảy ra lỗi khi tạo lớp học", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FramePage>
      <div className="create-class">
        <h1 className="create-class__title">Tạo lớp học</h1>
        <form className="create-class__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="class-name" className="form-group__label">
              Tên lớp học
            </label>
            <input
              type="text"
              id="class-name"
              name="name"
              value={classData.name}
              onChange={handleChange}
              required
              className="form-group__input"
              placeholder="Nhập tên lớp học"
            />
          </div>
          <div className="form-group">
            <label htmlFor="class-description" className="form-group__label">
              Mô tả
            </label>
            <textarea
              id="class-description"
              name="description"
              value={classData.description}
              onChange={handleChange}
              required
              className="form-group__textarea"
              placeholder="Nhập mô tả lớp học"
            />
          </div>
          <div className="form-group">
            <label htmlFor="class-image" className="form-group__label">
              Hình ảnh
            </label>
            <div
              className="form-group__image-upload"
              onClick={handleChangeImage}
            >
              {classData.image ? (
                <img
                  src={classData.image}
                  alt="Class Preview"
                  className="form-group__image-upload__image-preview"
                />
              ) : (
                <button type="button" className="form-group__image-upload__button">
                  Chọn hình ảnh
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png, image/bmp, image/webp, image/jpg"
              ref={inputRef}
              onChange={handleImgChange}
              hidden
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="create-class__submit-button"
          >
            Tạo lớp học
          </Button>
        </form>
        <UpdateImage
          modalOpen={modalOpen}
          imageFile={imageFile}
          setModalOpen={setModalOpen}
          setImageFile={setImageFile}
        />
        {loading && <DialogLoading />}
      </div>
    </FramePage>
  );
};

export default CreateClass;
