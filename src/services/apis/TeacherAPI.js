import axios from "../axios";

export const TeacherAPI = {
  // create-class
  createExam: async (data) => {
    const res = await axios.post('/exam', data);
    return res.data;
  },
  //get-list-exam-by-creater /exam/list-exams/666c3631dc99260fbddf3f11?type=LESSON
  getListExamByCreater: async (id, type='LESSON') => {
    const res = await axios.get(`/exam/list-exams/${id}?type=${type}`);
    return res.data;
  },

  //edit-exam /exam/6669bb7ec2d0e1f07c708ad1
  editExam: async (id, data) => {
    const res = await axios.put(`/exam/${id}`, data);
    return res.data;
  },
};

export default TeacherAPI;
