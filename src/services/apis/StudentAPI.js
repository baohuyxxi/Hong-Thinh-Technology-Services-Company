import axios from "../axios";

export const StudentAPI = {
    // my-class /class/my-class
    getMyClass: async () => {
        const res = await axios.get('/class/my-class');
        return res.data;
    },
    // class-detail /class/:id
    getOneClass: async (id) => {
        const res = await axios.get(`/class/one-class/${id}`);
        return res.data;
    },
    //get-book /class/book/667340f4216cf18602cba678
    getBook: async (id) => {
        const res = await axios.get(`/class/book/${id}`);
        return res.data;
    },
    //get-test-finish /test/completed/66a932fda41eb70eaf58e663
    getTestFinish: async (testID) => {
        const res = await axios.get(`/test/completed/${testID}`);
        return res.data;
    },
}
export default StudentAPI;