import axios from "../axios";

export const ChapterAPI = {
  // create-class
  createChapter: async (data) => {
    const res = await axios.post(`/chapter`, data);
    return res.data;
  },
  //edit-chapter /chapter/663c9bbac5e40783c04faa80
  editChapter: async (data,chapterId ) => {
    const res = await axios.put(`/chapter/${chapterId}`, data);
    return res.data;
  },
  //delete-chapter  /chapter/663c9bbac5e40783c04faa80
  deleteChapter: async (chapterId) => {
    const res = await axios.delete(`/chapter/${chapterId}`);
    return res.data;
  },


};

export default ChapterAPI;
