import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap,faBars  } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
        <div>
          <div className='static flex items-center   bg-sky-600 py-3 text-white text-3xl font-bold  w-full justify-between '>
            <Link to='/'><FontAwesomeIcon className='mr-2 ml-5' icon={faGraduationCap}/>Alemeno</Link>
            <div className='flex gap-2 text-lg max-lg:text-sm'>
              <Link to='/'><p className=' text-white mr-5'>Dashboard</p></Link>
              <Link to='/course'><p className=' text-white mr-5'>List</p></Link>

              </div>

          </div>
          <div className='flex items-center fixed top-0 bg-sky-600 py-3 text-white text-3xl font-bold  w-full justify-between'>
              <Link to='/'><FontAwesomeIcon className='mr-2 ml-5' icon={faGraduationCap}/>Alemeno</Link>
              <div className='flex gap-2 text-lg max-lg:text-sm'>
                <Link to='/'><p className=' text-white mr-5'>Dashboard</p></Link>
                <Link to='/course'><p className=' text-white mr-5'>List</p></Link>
              </div>
          </div>
        </div>

    
  )
}

export default Nav