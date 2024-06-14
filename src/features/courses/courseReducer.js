import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COURSE_URL = "http://localhost:3500/course"

export const fetchCourses = createAsyncThunk("course/fetchCourses", async( ) => {
    const res = await axios.get(COURSE_URL)
    console.log(res)
    return res.data.courses
})

const initialState = {
    courses: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const courseSlice =createSlice({
    name:"course",
    initialState,
    reducers:{
        setUser : {
            reducer(state,action){
                state.user = action.payload  
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchCourses.pending,(state,action) => {
            state.status = "loading"
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.courses =state.courses.concat(action.payload)
        })
        .addCase(fetchCourses.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const getAllCourses = (state) => state.course.courses
export const getCourseStatus = (state) => state.course.status
export const getCourseError = (state) => state.course.error



export default courseSlice.reducer