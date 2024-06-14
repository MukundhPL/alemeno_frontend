import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"   

const initialState = {
    user: '',
    enrollments:[],
    status:'idle',   //'idle' | 'loading' | 'succeeded' | 'failed'
    error:null
}

export const fetchEnrollments = createAsyncThunk("course/fetchEnrollments", async(args,{getState} ) => {
    const state = getState()
    const res = await axios.post("http://localhost:3500/users/enrollments",{
        id:state.user.user
    })  
    console.log(res)
    return res.data.enrollments
})
export const markCompleted = createAsyncThunk("course/markComplete",async({course_id,student_id})=>{
    try{
        const res = await axios.put("http://localhost:3500/users/complete",{
            course_id:course_id,
            student_id:student_id
        })
        console.log(res.data.enrollment)
        return res.data.enrollment
    }       
    catch(err){
        console.log(err)
        return
    }
})
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:{
            reducer(state,action){
                state.user = action.payload 
                state.status='idle'  
                state.error=null
            }
        },
        
    },
    extraReducers(builder){
        builder
            .addCase(fetchEnrollments.pending,(state,action)=>{
                state.status='loading'
            })
            .addCase(fetchEnrollments.fulfilled,(state,action)=>{
                state.status ="succeeded"
                const enrollments = action.payload
                state.enrollments = [...enrollments]
            })
            .addCase(fetchEnrollments.rejected,(state,action)=>{
                state.status ='failed'
                state.error = action.error.message
            })
            .addCase(markCompleted.fulfilled,(state,action)=>{
                if(!action.payload){
                    console.log(action.payload)
                    alert("Update could not complete")
                }
                const  {course_id,student_id} = action.payload
                const enrollments =state.enrollments.filter(enroll=>(enroll.course_id!==course_id))
                state.enrollments=[...enrollments,action.payload]
            })
    }
})

export const {setUser} = userSlice.actions
export const  getUser = (state) => state.user.user
export const  getUserEnrollments = (state) => state.user.enrollments
export const  getUserStatus = (state) => state.user.status
export const  getUserError = (state) => state.user.error
export default userSlice.reducer