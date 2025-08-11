import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    info: localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : null,
    settings: false,
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("account", JSON.stringify(action.payload.account));
      state.info = action.payload.account;
    },
    logout(state) {
      localStorage.removeItem("account");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.info = null;
    },
    signup(state, action) {},
    signin(state, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      // localStorage.setItem('user', JSON.stringify(action.payload.infoUserResponse))
      // state.accessToken = action.payload.accessToken
      // state.refreshToken = action.payload.refreshToken
      state.current = action.payload.infoUserResponse;
    },
    // signinAdmin(state, action) {
    //   localStorage.setItem("accessTokenAdmin", action.payload.accessToken);
    //   localStorage.setItem("refreshTokenAdmin", action.payload.refreshToken);
    // },
    // setProfile(state, action) {
    //   localStorage.setItem("user", JSON.stringify(action.payload.data));
    // },
    // logout(state) {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("accessToken");
    //   localStorage.removeItem("refreshToken");
    //   state.current = null;
    // },
    // editInfo(state, action) {
    //   state.current = action.payload;
    // },
    // updateHost(state) {
    //   state.settings = true;
    // },
    refreshToken(state, action) {
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    updateProfile(state, action) {
      state.info = action.payload;
      localStorage.setItem("account", JSON.stringify(action.payload));
    }
  },
});

export default accountSlice;
