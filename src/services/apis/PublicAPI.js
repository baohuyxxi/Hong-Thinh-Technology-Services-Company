import axios from '../axios';

const PublicAPI = {
    getListTeacher: async () => {
        const res = await axios.get(`/auth/list-teacher`);
        return res.data;
    },
    //get-list-exam /exam/list/exams?type=EXAM
    getListExam: async () => {
        const res = await axios.get(`/exam/list/exams?type=EXAM`);
        return res.data;
    },
    //get-exam /exam/6669d35e2766e2ffef63acbd
    getExam: async (id) => {
        const res = await axios.get(`/exam/${id}`);
        return res.data;
    },

    getTeacher: async (id) => {
        const res = await axios.get(`/user/teacher/${id}`);
        return res.data;
    },
    //get-list-class /class/list-class
    getListClass: async () => {
        const res = await axios.get(`/class/list-class`);
        return res.data;
    },
    //get-one-class /class/one-class/666c3631dc99260fbddf3f11
    getOneClass: async (id) => {
        const res = await axios.get(`/class/one-class/${id}`);
        return res.data;
    },

    //get-chapter-public chapter/book/public/666c3631dc99260fbddf3f11
    getChapterPublic: async (id) => {
        const res = await axios.get(`/chapter/book/public/${id}`);
        return res.data;
    },

}

export default PublicAPI;
