import { Fragment, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiRequest, changeRequestLoading, getState, initialState, setResponse, updateCurrentRequestSettingIndex, updateRequestDataUrl, updateRequestMethodChange, updateRequestProtocol } from '../Redux-Store/DataSlice';
import Params from './Settings/Params';
import Body from './Settings/Body';
import Authorization from './Settings/Authorization';
import Headers from './Settings/Headers';
import ClipLoader from "react-spinners/ClipLoader";



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
function compactJsonString(jsonString) {
    try {
        // Parse the JSON string to ensure it's valid
        const parsedJson = JSON.parse(jsonString);

        // Stringify the JSON object without any extra spaces or line breaks
        return JSON.stringify(parsedJson);
    } catch (error) {
        // If there's an error, the input is not valid JSON
        throw new Error("Invalid JSON string");
    }
}
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}




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
    async function handleRequestSend() {
        dispatch(changeRequestLoading(true));

        interface Options {
            method: string;
            headers: {
                [key: string]: string;
            };
            body?: string;
        }

        const options: Options = {
            method: reqItem?.method as string,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (reqItem?.requestSettings[2].values) {
            //@ts-ignore
            console.log('run');
            options.headers.Authorization = reqItem?.requestSettings[2].values;
        }
        reqItem?.requestSettings[3].values?.forEach((arr: [string, string]) => {
            if (arr[0].length && arr[1].length) {
                options.headers[arr[0]] = arr[1];
            }
        });

        if (reqItem?.requestSettings[1].values) {
            // options.body = `${compactJsonString(reqItem.requestSettings[1].values)}`;
            options.body = reqItem.requestSettings[1].values;
        }

        const targetUrl = `${reqItem?.protocol}://${reqItem?.url}`;
        const proxyUrl = `http://localhost:3002/proxy?url=${encodeURIComponent(targetUrl)}`;
        try {
            const respone = await fetch(proxyUrl, options);
            const data: { succes: boolean, body: object } = await respone.json();
            dispatch(setResponse(data));
        } catch (error) {
            dispatch(setResponse({ succes: false, message: "Unable To Reach Server" }));
        } finally {
            dispatch(changeRequestLoading(false));
        }
    }
    return (
        reqItem &&
        <div className='relative border  border-b-2 border-b-orange-600 '>
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
                <div onClick={handleRequestSend} className='w-36 h-full flex justify-around items-center  bg-orange-500 text-white'>
                    {reqItem.loading ? <Fragment>     <ClipLoader
                        color={'white'}
                        loading={true}
                        size={29}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className='h-48'
                    />
                        <p className='text-white' onClick={() => dispatch(changeRequestLoading(false))}>Cancel</p></Fragment> : <button >Send</button>}
                </div>
            </div>
            <ul className='h-10 justify-start gap-5 items-center ps-5 overflow-y-scroll flex    '>
                {reqItem && reqItem.requestSettings.map((item: any, idx: number) => {
                    return <p onClick={() => dispatch(updateCurrentRequestSettingIndex(idx))} className={` border-b p-1 text-sm  ${reqItem.activeRequestSettingsIndex == idx ? 'border-b-orange-500' : null}`}>{item.name}</p>
                })}
            </ul>

            <div className=' overflow-y-scroll'>
                {getActiveSettingComponent(reqItem)}
            </div>

        </div>
    )
}
export default Main;

export function getCurrentRequest(state: initialState) {
    if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
        return state.folders[state.activeCollection]?.collections[state.activeSubcollection]?.requests[state.activeRequestIndex];
    };
    return null;
}

function getColors(method: string | undefined) {
    return methods.find((item) => item.name == method)?.color
}

function getActiveSettingComponent(requestItem: ApiRequest) {
    if (requestItem.activeRequestSettingsIndex == 0) {
        return <Params />
    }
    else if (requestItem.activeRequestSettingsIndex == 1) {
        return <Body />
    }
    else if (requestItem.activeRequestSettingsIndex == 2) {
        return <Authorization />
    }
    else if (requestItem.activeRequestSettingsIndex == 3) {
        return <Headers />
    }
}