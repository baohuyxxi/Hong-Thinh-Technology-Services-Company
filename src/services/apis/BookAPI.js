import axios from "../axios";

const BookAPI = {
  getBook: async (bookId) => {
    const res = await axios.get(`/class/book/${bookId}`);
    return res.data;
  },
  addBook: async (data) => {
    const res = await axios.post(`/class/${data.classId}/book`, data);
    return res.data;
  },
  editBook: async (data) => {
    const res = await axios.put(`/class/${data.classId}/book/${data.bookId}`, data);
    return res.data;
  },
  //create-chapter /chapter
  addChapter: async (data) => {
    const res = await axios.post(`/chapter`, data);
    return res.data;
  },
  //edit-chapter /chapter/66b1e39549f8ee08b9604215
  editChapter: async (data, chapterId) => {
    const res = await axios.put(`/chapter/${chapterId}`, data);
    return res.data;
  },
  //get-chapter /chapter/666c3631dc99260fbddf3f11
  getChapter: async (chapterId) => {
    const res = await axios.get(`/chapter/${chapterId}`);
    return res.data;
  },

};

export default BookAPI;
