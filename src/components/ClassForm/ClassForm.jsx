import React, { useState, useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import ImageAPI from "~/services/apis/ImageAPI";
import AdminAPI from "~/services/apis/AdminAPI";
import UpdateImage from "~/components/UpdateImage/UpdateImage"; // Import UpdateImage component

const ClassForm = ({ classId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [classData, setClassData] = useState({});
  const [imageFile, setImageFile] = useState("null");
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    AdminAPI.getOneClass(classId)
      .then((res) => {
        setClassData(res.data);
        setImageFile(res.data.image);
      })
      .catch((error) => {
        enqueueSnackbar("Đã xảy ra lỗi khi lấy dữ liệu lớp học", {
          variant: "error",
        });
      });
  }, [classId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
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
      alert(t("validate.invalidImageType"));
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
  const handleImageUpload = async () => {
    try {
      const response = await ImageAPI.uploadSingle(selectedImage);
      setClassData({ ...classData, image: response.url });
    } catch (error) {

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classDataUpdate = { ...classData };
    if (typeof imageFile !== "string") {
      await ImageAPI.uploadSingle(imageFile).then((res) => {
        classDataUpdate.image = res.data.link;
        setImageFile(res.data.link);
      });
    }
    await AdminAPI.editClass({ classId, ...classDataUpdate })
      .then((res) => {
        enqueueSnackbar("Lớp học đã được cập nhật", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Đã xảy ra lỗi khi cập nhật lớp học", {
          variant: "error",
        });
      });
  };


  return (
    <form onSubmit={handleSubmit} className="edit-class__form">
      <div className="edit-class__form-group">
        <label htmlFor="class-name" className="edit-class__label">
          Tên lớp học
        </label>
        <input
          type="text"
          id="class-name"
          name="name"
          value={classData.name}
          onChange={handleChange}
          className="edit-class__input"
        />
      </div>
      <div className="edit-class__form-group">
        <label htmlFor="class-description" className="edit-class__label">
          Mô tả
        </label>
        <textarea
          id="class-description"
          name="description"
          value={classData.description}
          onChange={handleChange}
          className="edit-class__textarea"
        />
      </div>
      <div className="edit-class__form-group">
        <label htmlFor="class-image" className="edit-class__label">
          Hình ảnh
        </label>
        <div className="edit-class__image" onClick={handleChangeImage}>
          <img
            src={
              typeof imageFile === "string"
                ? imageFile
                : URL.createObjectURL(imageFile)
            }
            className="edit-class__image-preview"
          />
        </div>
        <input
          hidden
          type="file"
          // accept="image/*"
          accept="image/jpeg, image/png, image/bmp, image/webp, image/jpg"
          ref={inputRef}
          onChange={handleImgChange}
        />
      </div>
      <button type="submit" className="edit-class__button">
        Cập nhật lớp học
      </button>
      <UpdateImage
        modalOpen={modalOpen}
        imageFile={imageFile}
        setModalOpen={setModalOpen}
        setImageFile={setImageFile}
      />
    </form>
  );
};

export default ClassForm;
