import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap,faBars,faCalendar,faClock,faLocation,faUser,faFileText,faSignIn } from '@fortawesome/free-solid-svg-icons'
import { getAllCourses,getCourseStatus,getCourseError,fetchCourses } from './courseReducer'
import { useEffect } from 'react'
import axios from 'axios'
import Accordion from '../../components/Accordion'

  
const CourseDetailsPage = () => {

    const dispatch = useDispatch()
    const courses = useSelector(getAllCourses)
    const status = useSelector(getCourseStatus)
    const err = useSelector(getCourseError)
    const {id} = useParams()

    useEffect(()=>{ 
        if(status ==='idle'){
            dispatch(fetchCourses())
        }
    },[status,dispatch])

    const details =courses.find(course => {return course.course_id===id})

    const [prerequisites,setPrerequisites] = useState([]) 
    const [courseContent,setCourseContent] = useState([]) 
    useEffect(()=>{
        
        if(details){
            async function data(){
                try{
                    const prereqs = await axios.post('http://localhost:3500/prerequisite',{
                        course_id : id,
                    })
                    console.log(prereqs.data.prerequisites)
                    setPrerequisites(prereqs.data.prerequisites)
                    const contents  = await axios.post('http://localhost:3500/course/contents',{
                        course_id : id,
                    })
                    console.log(contents.data.contents)
                    setCourseContent(contents.data.contents)
                }

                catch(err){
                    alert("Failed to fetch data from server")
                }
            }
            data()
            console.log(prerequisites)
            
        }
    },[details])
    const CourseDetails = ({name,instructor,description,enrollmentStatus,schedule,duration,location,dueDate}) =>{
        return(
            <div>
                <p className='text-3xl text-sky-950 font-bold my-5'>{name}</p>
                <div className='rounded-2xl bg-sky-400 hover:bg-sky-500  p-5 font-medium text-white'>
                    <p>🙍🏻‍♂️ Instructor : {instructor}</p>    
                    <p>📄 Description : {description}</p>
                    <p>{enrollmentStatus==='Open'?'✅':enrollmentStatus==='In Progress'?'🚧':'⛔'}Enrollment : {enrollmentStatus}</p>
                    <p>📅 Schedule : {schedule}</p>
                    <p>📆 End Date: {new Date(dueDate).toISOString().split('T')[0]}</p>
                    <p>🕙 Duration : {duration}</p>
                    <p>🗺️ Location : {location}</p>
                </div>

                <div className='rounded-2xl bg-sky-400 hover:bg-sky-500  p-5 font-medium text-white my-5 '>
                    <p className='text-2xl'>Prerequistes :</p>  
                    
                    {prerequisites.length?
                    prerequisites.map(prereq => {
                    
                       return <Link to={`/course/${prereq.id}`} className='list-item ml-5'><p key={prereq.id} className='hover:underline'>{prereq.name}</p></Link>
                    })
                    :<p>No prerequisites</p>}
                </div>
                <Accordion title={'Syllabus:'} color={400} content={
                    courseContent.map(x=> <Accordion title={`Week ${x.week}`}  content={
                    <div className='ml-2 mt-2'>
                        <p className='text-white text-2xl font-medium'>{x.title}</p>
                        <p className='text-white text-lg font-medium mt-1'>{x.content}</p>
                    </div>
                    } color={300}/>)
                }/>
 
                    
                
            </div>
        )
    }
    let content 
    if(status==='loading'){
        content = <p>Loading...</p>
    }
    else if (status==='succeeded'&&!details){

        content = <p>Course not found</p>
    }
    else if (status==='succeeded'&&details){

        content = <CourseDetails {...details}/>
    }
    else if (status==='failed'){
        alert(err)
    }
    
    return (
        <section className='w-full mx-[10%]'>
            {content}
        </section>
    )
}

export default CourseDetailsPage