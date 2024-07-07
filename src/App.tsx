import React, { useState } from 'react'

const App = () => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isPlusClicked, setPlusClicked] = useState<boolean>(true);

  return (
    <div className='h-screen flex flex-col'>
      <div className='text-center bg-secondary py-2 text-sm'>My WorkSpace </div>
      <div className='bg-gray-200 h-[1px]'></div>
      <ul className='flex  gap-2  px-1 bg-secondary'>
        <li>File</li>
        <li>Edit</li>
        <li>View</li>
        <li>Help</li>
      </ul>
      <div className='grid grid-cols-12 h-full bg-black'>
        <div className='col-span-2 grid grid-cols-12 bg-gray-50'>
          <div className='col-span-4 border flex flex-col p-2 gap-1'>
            <div onClick={() => setSelectedIndex(0)} className={`flex flex-col rounded-sm text-sm justify-center items-center p-3 ${selectedIndex == 0 ? "bg-gray-200 " : null}`}>
              <i className="fa-solid fa-book"></i>
              <p className='text-[12px]'>Collections</p>
            </div>
            <div onClick={() => setSelectedIndex(1)} className={`flex flex-col rounded-sm text-sm justify-center items-center p-3 ${selectedIndex == 1 ? "bg-gray-200 " : null}`}>
              <i className="fa-solid fa-box"></i>
              <p className='text-[12px]'>Enviroments</p>
            </div>
            <div onClick={() => setSelectedIndex(2)} className={`flex flex-col rounded-sm text-sm justify-center items-center p-3 ${selectedIndex == 2 ? "bg-gray-200 " : null}`}>
              <i className="fa-solid fa-rotate-left"></i>
              <p className='text-[12px]'>History</p>
            </div>
            <div onClick={() => setSelectedIndex(3)} className={`flex flex-col rounded-sm text-sm justify-center items-center p-3 ${selectedIndex == 3 ? "bg-gray-200 " : null}`}>
              <i className="fa-solid fa-book"></i>
              <p className='text-[12px]'>Collections</p>
            </div>
          </div>
          <div className='col-span-8 border '>
            <div className='h-8 border flex justify-start px-2 items-center'>
              <i className="fa-solid fa-plus text-gray-500"></i>
              <i className="fa-solid fa-filter text-gray-500 ms-5"></i>
            </div>
            <div className='p-1 flex'>
              <input className='h-6 w-full outline-none  text-sm' type="text" />
              <button className='h-6  border  p-1 text-sm'>Add</button>
            </div>
          </div>
        </div>
        <div className='col-span-10 bg-white'>


        </div>

      </div>
    </div>
  )
}

export default App
