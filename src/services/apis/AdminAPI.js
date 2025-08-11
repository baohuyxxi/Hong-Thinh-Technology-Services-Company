import axios from "../axios";

export const AdminAPI = {
  // create-class
  createClass: async (data) => {
    const res = await axios.post(`class`, data);
    return res.data;
  },
  // edit-class
  editClass: async (data) => {
    const res = await axios.put(`class/${data.classId}`, data);
    return res.data;
  },
  //   add-book
  addBook: async (data) => {
    const res = await axios.post(`/class/${data.classId}/book`, data);
    return res.data;
  },
  // edit-book
  editBook: async (data) => {
    const res = await axios.put(`/class/${data.classId}/book/${data.bookId}`, data);
    return res.data;
  },
  getListClass: async () => {
    const res = await axios.get(`/class/list-class`);
    return res.data;
  },
  //get-one-class
  ///class/one-class/663c8a359fa46b05d8f8869d
  getOneClass: async (classId) => {
    const res = await axios.get(`/class/one-class/${classId}`);
    return res.data;
  },
  //add-teacher /class/663c8a359fa46b05d8f8869d/teacher/in
  addTeacher: async (data) => {
    const res = await axios.put(`/class/${data.classId}/teacher/in`, data);
    return res.data;
  },
  //remove-teacher /class/663391b23d98978a63484097/teacher/out
  removeTeacher: async (data) => {
    const res = await axios.put(`/class/${data.classId}/teacher/out`, data);
    return res.data;
  },

  //{{HOSTING}}/class/663c8a359fa46b05d8f8869d/student/in add-student
  addStudent: async (data) => {
    const res = await axios.post(`/class/${data.classId}/student/in`, data);
    return res.data;
  },
  //remove-student /class/663391b23d98978a63484097/student/out
  removeStudent: async (data) => {
    const res = await axios.post(`/class/${data.classId}/student/out`, data);
    return res.data;
  },
};

export default AdminAPI;
