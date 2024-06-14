import React, { useEffect, useState } from 'react'
import { fetchEnrollments,getUser,getUserEnrollments,getUserError,getUserStatus,setUser, } from './userReducer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const SetUser = () => {
    const dispatch=useDispatch()
    const user = useSelector(getUser)
    console.log(user)
    const [usersList,setUsersList] = useState([{student_id:null,name:"Select User"}])
    useEffect(()=>{
        async function get(){
            try{
                const users = await axios.get("http://localhost:3500/users")
                console.log(users.data.users)
                setUsersList([{id:'',name:"Select User"},...users.data.users])
            }
            catch(err){
                alert("Failed to fetch users list")
            }
        }
        get()
        
    },[])  
    const handleSelect = (e) =>{
        console.log(e.target.value)
        dispatch(setUser(e.target.value))
        dispatch(fetchEnrollments())
    }
  return (
    <div className='flex flex-col items-center  w-full mb-11'>
        <p className='text-3xl text-sky-950 font-bold my-5'>Select User:</p>
        <select onChange={handleSelect} className='border-black border-opacity-30 rounded-md w-[50%] h-14 border-2 text-xl text-sky-950 text-center font-medium'>
            {usersList.map(users=>{
                if(users.student_id==user){
                    console.log(users)
                     return <option value={users.student_id} className='' selected >{users.name}</option>
                }
                else {
                    console.log(users.student_id)
                    console.log(user)
                    return <option value={users.student_id} className='' >{users.name}</option>
                }
            })}
        </select>
        
    </div>
  )
}

export default SetUser