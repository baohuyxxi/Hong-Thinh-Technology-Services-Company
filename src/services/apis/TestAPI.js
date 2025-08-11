import axios from "../axios";

export const TestAPI = {
    //get-all-test-of-exam {{HOSTING}}/test/666c3ce591a4c9226af9ddc1
    getAllTestOfExam: async (examId) => {
        const res = await axios.get(`/test/${examId}`);
        return res.data;
    },
    //get-test-detail {{HOSTING}}/test/666c3d0a91a4c9226af9ddc4/detail
    getTestDetail: async (testId) => {
        const res = await axios.get(`/test/${testId}/detail`);
        return res.data;
    },
};
export default TestAPI;