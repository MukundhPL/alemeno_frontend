import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../features/courses/courseReducer";
import userReducer from "../features/user/userReducer";

export const store = configureStore({
    reducer:{
        course:courseReducer,
        user:userReducer
    }
})