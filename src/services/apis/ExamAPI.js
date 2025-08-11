import axios from "../axios";

export const ExamAPI = {
    //get-list-exam {{HOSTING}}/exam/list/exams?type=TEST&page=1&limit=2

    getListExam: async (type, page = 1, limit = 3) => {
        const res = await axios.get(`/exam/list/exams?type=${type}&page=${page}&limit=${limit}`);
        return res.data;
    },
    //get-exam {{HOSTING}}/exam/66a4e391950eb4b469c2e8dc?page=1&limit=5
    getExam: async (examId, page = 1, limit = 2) => {
        const res = await axios.get(`/exam/${examId}?page=${page}&limit=${limit}`);
        return res.data;
    },
    //create-test /test/666c3ce591a4c9226af9ddc1
    createTest: async (examId) => {
        const res = await axios.post(`/test/${examId}`);
        return res.data;
    },
    // push-answer /test/666c3ce591a4c9226af9ddc1
    pushAnswer: async (examId, data) => {
        const res = await axios.put(`/test/${examId}`, data);
        return res.data;
    },
    // get-test-pending /test/66aa0bf81e71e4b0e336f428/pending
    getTestPending: async (testID) => {
        const res = await axios.get(`/test/${testID}/pending`);
        return res.data;
    },
};

export default ExamAPI;
