import { configureStore, combineReducers } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
// Import các slices reducer của bạn ở đây
// import userSlice from './userSlice';


const rootReducer = combineReducers({
  // Định nghĩa các reducers của bạn ở đây
  // user: userSlice.reducer,
  account: accountSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
