import React from 'react'

const Sidebar = ({showSidebar}) => {
  return (
        <div className={`h-full  flex-grow-0 fixed top-auto  bg-sky-300 ${showSidebar?'w-[20%]':'hidden '}`}>
            Sidebar
        </div>
  )
}

export default Sidebar