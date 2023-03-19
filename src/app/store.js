import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../components/features/userSlice';
import questionReducer from "../components/features/questionSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer
    }
})