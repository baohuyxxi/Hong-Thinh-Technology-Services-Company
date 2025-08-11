import { data } from "jquery";
import axios from "../axios";

export const LessonAPI = {
  // create-lesson /chapter/663cac528cac1f4202cc04f4/lesson
  createLesson: async (data, chapterId) => {
    const res = await axios.post(`/chapter/${chapterId}/lesson`, data);
    return res.data;
  },
  ///edit-lesson chapter/663c9bbac5e40783c04faa80/lesson/663c9fab66889e22651d51b8
  editLesson: async (data, chapterId, lessonId ) => {
    const res = await axios.put(
      `/chapter/${chapterId}/lesson/${lessonId}`,
      data
    );
    return res.data;
  },
  //delete-lesson /chapter/663c9bbac5e40783c04faa80/lesson/663c9fab66889e22651d51b8

  deleteLesson: async (chapterId, lessonId) => {
    const res = await axios.delete(
      `/chapter/${chapterId}/lesson/${lessonId}`
    );
    return res.data;
  },
};

export default LessonAPI;
