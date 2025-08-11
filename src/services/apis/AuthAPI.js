    import axios from "../axios";

    const AuthAPI = {
        login: async (data) => {
            const res = await axios.post(`/auth/sign-in`, data);
            return res.data;
        },
        ///auth/create/teacher create-teacher
        createTeacher: async (data) => {
            const res = await axios.post(`/auth/create/teacher`, data);
            return res.data;
        },
        //sign-up {{HOSTING}}/auth/register/student
        registerStudent: async (data) => {
            const res = await axios.post(`/auth/register/student`, data);
            return res.data;
        },
        //change-password /auth/password
        changePassword: async (data) => {
            const res = await axios.post(`/auth/password`, data);
            return res.data;
        },
        //edit-profile /auth/profile
        editProfile: async (data) => {
            const res = await axios.put(`/auth/profile`, data);
            return res.data;
        },
        ///auth/profile/account
        getProfile: async () => {
            const res = await axios.get(`/auth/profile/account`);
            return res.data;
        },
    }

    export default AuthAPI;