import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewQueryParams, getState, updateQueryParameterInRequest } from '../../Redux-Store/DataSlice'
import { getCurrentRequest } from '../Main';

const Params = () => {
    const state = useSelector(getState);
    const reqItem = getCurrentRequest(state);
    const dispatch = useDispatch();
    const handleQueryChange = (idx: number, value: string, key: number): void => {
        dispatch(updateQueryParameterInRequest({ key, idx, value }));
    }
    return (
        <div className='px-5'>
            <div className='my-2   '>
                <i onClick={() => dispatch(addNewQueryParams())} className='fa-solid text-lg fa-plus'></i>
            </div>
            <div className=' flex flex-col gap-2  '>
                {
                    reqItem?.requestSettings[0].values?.map((item: [string, string], idx: number) => {
                        return <div className='flex border items-center gap-2 border-slate-200  w-[80%] justify-center  h-10  flex-wrap'>
                            <input onChange={(e) => handleQueryChange(idx, e.target.value, 0)} placeholder='key' value={item[0]} className='grow  focus:border p-[5px] outline-none' type="text" />
                            <input onChange={(e) => handleQueryChange(idx, e.target.value, 1)} placeholder='value' value={item[1]} className='grow focus:border p-[5px] outline-none' type="text" />
                            <button className='  p-1 text-[12px] h-6  text-white   bg-red-500 rounded '>Remove</button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Params
