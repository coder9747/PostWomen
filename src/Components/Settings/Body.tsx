import React, { useState } from 'react';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { getCurrentRequest } from '../Main';
import { useDispatch, useSelector } from 'react-redux';
import { getState, updateRequestBody } from '../../Redux-Store/DataSlice';

const Body = () => {
    const [json, setJson] = useState('{}');
    const [error, isError] = useState<boolean>(false);
    const state = useSelector(getState);
    const reqItem = getCurrentRequest(state);
    const dispatch = useDispatch();
    const handleChange = (newJson: string) => {
        dispatch(updateRequestBody(newJson));
        try {
            JSON.parse(newJson);
            isError(false);
        } catch (error) {
            isError(true);
        }
    };
    return (
        <div className='px-5 mt-2'>
            <p className='text-sm text-gray-500 my-2'>Currently Only Supports  Raw Json</p>
            <AceEditor
                mode="json"
                theme="github"
                name="json-editor"
                onChange={handleChange}
                value={reqItem?.requestSettings[1].values}
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="200px"
            />
            {error && <p className='text-red-500 my-2'>Invalid Json</p>}
        </div>
    )
}

export default Body
