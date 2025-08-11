import axios from "../axios";

export const DocumentAPI = {
  // Upload a PDF document
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload/document", formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default DocumentAPI;
