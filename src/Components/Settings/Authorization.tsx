import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeAuthorizationValue, getState } from '../../Redux-Store/DataSlice'
import { getCurrentRequest } from '../Main';

const Authorization = () => {
    const state = useSelector(getState);
    const reqItem = getCurrentRequest(state);
    const dispatch = useDispatch();
    const handleChange = (e: any) => {
        const val = e.target.value;
        dispatch(changeAuthorizationValue(val));
        
    }
    return (
        <div className='px-5 flex flex-col gap-2 text-sm'>
            <p className='text-slate-500 '>Currently Only Supports JWT  </p>
            <label htmlFor="token">Token</label>
            <textarea value={reqItem?.requestSettings[2]?.values || ""} onChange={handleChange} id='token' className='w-96 h-28 border border-slate-200  p-2 '>
            </textarea>
        </div>
    )
}

export default Authorization
