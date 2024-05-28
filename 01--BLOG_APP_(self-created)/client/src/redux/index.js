import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
