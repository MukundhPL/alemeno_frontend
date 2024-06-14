import TimeAgo from 'javascript-time-ago'
import React, { useEffect,} from 'react'
import { getUser,getUserEnrollments,getUserError,getUserStatus ,markCompleted} from './userReducer'
import { getAllCourses,getCourseStatus,getCourseError,fetchCourses } from '../courses/courseReducer'
import { useDispatch, useSelector } from 'react-redux'
import RootPage from './SetUser'
import { Link } from 'react-router-dom'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo= new TimeAgo('en-US')
const Dashboard = () => {
    const dispatch = useDispatch()
    const courses = useSelector(getAllCourses)
    const courseStatus =useSelector(getCourseStatus)
    const courseError =useSelector(getCourseError)
    const user = useSelector(getUser)
    const enrollments = useSelector(getUserEnrollments)
    const status = useSelector(getUserStatus)
    const error = useSelector(getUserError)
    useEffect(()=>{ 
        if(courseStatus ==='idle'){
            dispatch(fetchCourses())
        }
    },[status,courseStatus,dispatch])

    let content 
    const markComp=(course_id,student_id)=>{
        
            console.log(course_id,student_id)
            dispatch(markCompleted({course_id,student_id}))
        
            

    }
    const DashboardItem=(course)=>{
        
        return(
            
            <div className='hover:bg-slate-300 bg-slate-900  bg-opacity-20 border-slate-300 border-2 rounded-lg w-full h-max pb-2 flex flex-col'>
                <div style={{backgroundImage:`url(../${course.image})`}}className={`w-full bg-cover h-[300px] rounded-t-lg `}/>
                
                <div className='h-[20%] ml-2'>
                    <div className='text-3xl font-semibold color flex justify-between mx-1 my-1'>
                        <Link to = {`/course/${course.course_id}`}><span className='hover:underline'>{course.name}</span></Link>
                        {course.completionStatus==='In Progress'?<button onClick={(e)=>{if(course.progress>=100)markComp(course.course_id,course.student_id);else alert("Progress is not 100%")}} className='text-base text-center text-green-600 flex justify-center items-center border-green-600 border-2  rounded-lg p-1 '>{course.completionStatus}</button>:<span className='text-base text-center text-white flex justify-center items-center bg-green-600  rounded-lg p-1 '>{course.completionStatus}</span>}
                    </div>
                    <p className='mx-1'>{course.instructor}</p>
                    <div className='flex items-center justify-between mt-2'>
                        <div id="progress-bar" className=" border-2 border-black h-3.5  rounded-xl w-[85%]">
                            <div style={{width:`${Math.min(Math.max(parseInt(course.progress),0),100)}%`}} className={`bg-green-600 h-full rounded-xl   `}></div> 
                        </div>
                        <span className='mr-2 text-lg font-semibold'>{`${Math.min(Math.max(parseInt(course.progress),0),100)}%`}</span>
                    </div>
                    <p className={`mx-1 font-semibold ${timeAgo.format(new Date(course.dueDate),"round").includes("ago")?"text-red-600":""} `}>{course.completionStatus==="Completed"?<span className='text-green-500'>Completed</span>:`Due ${timeAgo.format(new Date(course.dueDate),"round")}`}&nbsp;</p>
                </div>
            </div>
           
        )
    }

    if(status==='loading'||courseStatus==='loading'){
        content=<p className='text-center'>Loading...</p>

    }
    else if (status==='failed'||courseStatus==='failed'){
        alert("Failed to fetch details from server")
    }
    else if(status==='succeeded'&&courseStatus==='succeeded'&&!enrollments){
        content =<p className='text-center'>No enrollments found</p>
    }
    else if(status==='succeeded'&&courseStatus==='succeeded'&&enrollments){
        
        content = (<div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 w-full  px-5 items-center justify-center '>
                        {enrollments.map((course,ind)=>{
                            
                            const courseDetails = courses.find(cour=>course.course_id===cour.course_id)
                            const {course_id,...details} ={...courseDetails}
                            
                            console.log(courseDetails)
                            return <DashboardItem  key={ind} {...course} {...details}/>
                            })}
                    </div>
                )
    }

    return (
        <div className=' h-full w-full'>
            <RootPage/>
                <div className=' w-full  h-full '>
                    {content}
                </div>
            </div>
        
    )
}

export default Dashboard