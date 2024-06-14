import React from 'react'
import { Link } from 'react-router-dom'
import { getAllCourses, getCourseError,getCourseStatus,fetchCourses } from './courseReducer'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect,useState } from 'react'

const CourseItem = ({course_id,name,instructor}) =>{
    return (
        <div className='w-full  bg-sky-300 my-1 rounded-[5px] flex flex-col hover:bg-sky-500 p-2' key={course_id}>
            <Link to={`/course/${course_id}`}><p className='ml-5 text-2xl hover:underline'>{name}</p></Link>
            <p className='ml-5 text-lg mt-1'>Instructor : {instructor}</p>
        </div>
    )
}
const CourseList = () => {
    const [search,setSearch] = useState('') 
    const dispatch = useDispatch()
    const courses = useSelector(getAllCourses)
    const status = useSelector(getCourseStatus)
    const err = useSelector(getCourseError)
    console.log(courses)
    useEffect(()=>{
        if(status ==='idle'){
            dispatch(fetchCourses())
        }
    },[status,dispatch])

    let content
    const [sortBy,setSortBy] = useState('name') //name||instructor
    if(status==='loading'){
        content = <p>Loading...</p>
    }
    else if (status==='succeeded'){
        const orderedCourses = courses.slice().sort((a,b)=>{
            
            if(a[sortBy].toLowerCase()<b[sortBy].toLowerCase())return -1
            else if(a[sortBy].toLowerCase()>b[sortBy].toLowerCase()) return 1
            return 0
        })
        console.log(orderedCourses)
        content =   (<div>
                        <div className='flex'>
                            <input className='w-full h-11 border-2 border-black border-opacity-35 rounded-lg pl-2 mb-5' placeholder='Search' onChange={(e)=>setSearch(e.target.value)}/> 
                            <select className='h-11 ml-2 rounded-lg p-1 border-opacity-35 border-black border-2' onChange={(e)=>setSortBy(e.target.value)}>
                                <option value="name" >Name</option>
                                <option value="instructor" >Instructor</option>
                            </select>
                        </div>
                        {orderedCourses.map(course => {if(course.name.toLowerCase().includes(search.toLowerCase())||course.instructor.toLowerCase().includes(search.toLowerCase()))return(<CourseItem key={course.course_id} {...course}/>) })}
                    </div>)
    }
    else if (status==='failed'){
        alert(err)
    }
return (
    <section className='w-full mx-[10%]'>
        <p className='text-3xl text-sky-950 font-bold my-5'>Courses</p>

        {content}
    </section>
  )
}

export default CourseList