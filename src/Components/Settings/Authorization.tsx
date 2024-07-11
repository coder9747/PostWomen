import React from 'react'

const Authorization = () => {
    return (
        <div className='px-5 flex flex-col gap-2 text-sm'>
            <p className='text-slate-500 '>Currently Only Supports JWT  </p>
            <label htmlFor="token">Token</label>
            <textarea id='token' className='w-96 h-28 border border-slate-200  p-2 '>
            </textarea>
        </div>
    )
}

export default Authorization
