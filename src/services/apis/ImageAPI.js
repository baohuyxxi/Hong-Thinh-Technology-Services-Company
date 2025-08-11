import axios from "../axios";

export const ImageAPI = {
  uploadSingle: async (data) => {
    let formData = new FormData();
    formData.append("file", data);
    const res = await axios.post("/image/single", formData);
    return res.data;
  },
  uploadMultiple: async (data) => {
    let formData = new FormData();
    data.forEach((file) => {
      formData.append("files", file);
    });
    const res = await axios.post("/image/multi", formData);
    return res.data;
  },
};
export default ImageAPI;
