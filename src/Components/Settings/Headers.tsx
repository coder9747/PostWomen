import { useDispatch, useSelector } from 'react-redux'
import { addMoreRequestHeadersInput, ApiRequest, getState, updateRequestHeaderInput } from '../../Redux-Store/DataSlice'
import { getCurrentRequest } from '../Main';

const Headers = () => {
    const state = useSelector(getState);
    const reqItem = getCurrentRequest(state) as ApiRequest;
    const dispatch = useDispatch();
    const handleInputText = (idx: number, value: string, key: number) => {
        dispatch(updateRequestHeaderInput({ idx, value, key }));
    };
    const handlePlusClick = ()=>
    {
        dispatch(addMoreRequestHeadersInput());
    }
    return (
        <div className='px-5'>
            <i onClick={handlePlusClick} className='fa-solid fa-plus my-2'></i>
            <div className='flex gap-1 flex-col'>
                {reqItem.requestSettings[3].values?.map((item: [string, string], idx: number) => {
                    return <div className='flex  w-[80%] gap-1'>
                        <input onChange={(e) => handleInputText(idx, e.target.value, 0)} placeholder='key' className='w-1/2 h-7 outline-none  borer border-slate-300 border p-1' type='text' value={item[0]} />
                        <input onChange={(e) => handleInputText(idx, e.target.value, 1)} placeholder='value' className='w-1/2 h-7 outline-none borer border-slate-300 border p-1' value={item[1]} type="text" />
                        <button className='h-5 rounded text-[10px] text-white w-12 bg-red-500'>Remove</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Headers
