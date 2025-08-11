import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import "./UpdateImage.scss";

export default function UpdateImage({
  imageFile,
  modalOpen,
  setModalOpen,
  setImageFile,
}) {
  const [slideValue, setSlideValue] = useState(10);

  const cropRef = useRef(null);
  const handleSave = async () => {
    if (imageFile) {
      setModalOpen(false);
      const scaledImage = cropRef.current.getImageScaledToCanvas().toDataURL();
      const scaledImageFile = await fetch(scaledImage)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], "scaledImage.jpg", { type: "image/jpeg" })
        );
      setImageFile(scaledImageFile);
    }
  };
  const handleCancel = () => {
    // setImageFile(null);  
    setModalOpen(false);
  };
  return (
    <>
      <Modal open={modalOpen} className="modal-update-image">
        <Box className="box-update-image">
          <header>Select Image</header>
          <AvatarEditor
            className="avatar-editor"
            ref={cropRef}
            scale={slideValue / 10}
            rotate={0}
            image={imageFile}
          />
          <Slider
            className="slider"
            min={10}
            max={50}
            defaultValue={slideValue}
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
          />
          <hr className="divider"></hr>
          <Box>
            <Button
              className="button cancel"
              variant="outlined"
              onClick={handleCancel}
            >
              Trở lại
            </Button>
            <Button
              className="button save"
              variant="contained"
              onClick={handleSave}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
