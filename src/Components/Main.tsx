import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiRequest, getState, initialState, updateCurrentRequestSettingIndex, updateRequestDataUrl, updateRequestMethodChange, updateRequestProtocol } from '../Redux-Store/DataSlice';
import Params from './Settings/Params';

interface Change {
    method: boolean,
    protocol: boolean,
};

const methods = [{
    name: 'GET',
    color: '#FFB200'
}, {
    name: 'POST',
    color: '#EB5B00'
}, {
    name: 'PUT',
    color: '#B60071'
}, {
    name: 'PATCH',
    color: '#77E4C8'
}, {
    name: 'DELETE',
    color: 'red'
}, {
    name: 'HEAD',
    color: '#009FBD'
}, {
    name: 'OPTIONS',
    color: '#667BC6'
}];




const Main = () => {
    const state: initialState = useSelector(getState);
    const dispatch = useDispatch();
    const [changeInfo, setChangeInfo] = useState<Change>({
        method: false,
        protocol: false,
    });
    const reqItem = getCurrentRequest(state);

    function handleMethodChange(method: string) {
        dispatch(updateRequestMethodChange(method));
        setChangeInfo({ ...changeInfo, method: false });
    }

    function handeProtoColChange(protocol: string) {
        dispatch(updateRequestProtocol(protocol));
        setChangeInfo({ ...changeInfo, protocol: false });
    }

    return (
        reqItem &&
        <div className='relative'>
            <div className='flex h-10 border items-center px-5'>
                <img className='h-5' alt='http img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17aug6sTeQ2UAUSnqpeCBtnp59qHC4hWE_w&s" />
                {state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null && <div className='flex w-48 justify-around text-sm  text-gray-500'>
                    <p className='text-gray-500'>{state.folders[state.activeCollection]?.name}</p>
                    <p>/</p>
                    <p>{state.folders[state.activeCollection]?.collections[state.activeSubcollection]?.name}</p>
                    <p>/</p>
                    <p>{state.folders[state.activeCollection]?.collections[state.activeSubcollection]?.requests[state.activeRequestIndex]?.name}</p>
                </div>}
            </div>
            <div className='h-12 border flex  items-center'>
                <input onClick={() => setChangeInfo({ ...changeInfo, method: true })} value={reqItem.method} style={{ color: getColors(reqItem.method) }} className='border font-medium outline-none text-center h-full w-36  grid place-items-center' />
                {
                    changeInfo.method && <ul className='absolute left-1 bg-white shadow-md w-36 h-60 flex flex-col justify-around p-2 z-10 top-24'>
                        {
                            methods.map((item) => {
                                return (
                                    <li key={item.name} onClick={() => handleMethodChange(item.name)} style={{ color: item.color }} className={`hover:bg-slate-100 rounded p-1  font-semibold text-[15px] ${item.name == reqItem.method && 'bg-slate-100'}`}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
                {
                    changeInfo.protocol && <ul className='h-28 flex justify-around flex-col p-2 absolute bg-white rounded left-40 top-24 w-28 border font-medium  shadow  '>
                        <li onClick={() => handeProtoColChange('http')} className={`hover:bg-slate-100 ${reqItem.method == 'http' ? 'bg-sate-100' : null} p-1 rounded text-emerald-600`}>http</li>
                        <li onClick={() => handeProtoColChange('https')} className={`hover:bg-slate-100 ${reqItem.method == 'https' ? 'bg-sate-100' : null} p-1 rounded font-medium text-yellow-600`}>https</li>
                        <li onClick={() => handeProtoColChange('ws')} className={`hover:bg-slate-100 font-medium ${reqItem.method == 'ws' ? 'bg-sate-100' : null} p-1 rounded text-red-600`}>ws</li>
                    </ul>
                }

                <div className='h-full relative' onClick={() => setChangeInfo({ ...changeInfo, protocol: true })}>
                    <input value={`${reqItem.protocol}://`} className='h-full border w-20 text-center outline-none' />
                </div>
                <input value={reqItem.url} onChange={(e) => { dispatch(updateRequestDataUrl(e.target.value)) }} className='h-full outline-none ps-2 border grow grid-rows-11' type="text" />
                <button className='w-36 h-full  bg-orange-500 text-white'>SEND</button>
            </div>
            <ul className='h-10 justify-start gap-5 items-center ps-5 overflow-y-scroll flex    '>
                {reqItem && reqItem.requestSettings.map((item: any, idx: number) => {
                    return <p onClick={() => dispatch(updateCurrentRequestSettingIndex(idx))} className={` border-b p-1 text-sm  ${reqItem.activeRequestSettingsIndex == idx ? 'border-b-orange-500' : null}`}>{item.name}</p>
                })}
            </ul>
            {
                getActiveSettingComponent(reqItem)
            }
        </div>
    )
}
export default Main;

export function getCurrentRequest(state: initialState) {
    if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
        return state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex];
    };
    return null;
}

function getColors(method: string | undefined) {
    return methods.find((item) => item.name == method)?.color
}

function getActiveSettingComponent(requestItem: ApiRequest): JSX.Element {
    if (requestItem.activeRequestSettingsIndex == 0) {
        return <Params />
    }
}