import React from 'react'
import { useSelector } from 'react-redux'
import { getState } from '../Redux-Store/DataSlice'
import { getCurrentRequest } from './Main';
import nodata from "../Assects/nodata.jpg";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';

const Response = () => {
  const state = useSelector(getState);
  const reqItem = getCurrentRequest(state);
  function getResponseType(res: any) {
    const contentType = res.responseType;
    console.log(contentType);
    switch (contentType) {
      case 'application/json':
        return 'json';
      case 'text/html':
        return 'html';
      case 'text/plain':
        return 'text';
      case 'text/javascript':
        return 'javascript';
      default:
        return 'text';
    }
  };
  function getValue(res: any) {
    const contentType = res?.responseType;
    const response = res?.body;
    if (contentType === 'application/json') {
      return JSON.stringify(response, null, 2);
    }
    return response; //
  }

  return (
    <div className='px-5 borer border-t-green-500'>
      <p className='text-center  text-md my-2'>
        <p>Response</p>
        {reqItem?.response == null && <img className='mx-auto h-[500px] ' src={'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=826&t=st=1720766438~exp=1720767038~hmac=1af715e586864fdf2c39761fe1ffed4c6141c777941e14d1620efa15debacef4'} alt="" />}
        {reqItem?.response && reqItem?.response?.succes == true ? <AceEditor
          mode={getResponseType(reqItem.response) || "html"}
          theme="github"
          name="json-editor"
          value={getValue(reqItem.response)}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="
          400px"
          setOptions={{
            useWorker: false, // Disable syntax checking
            showLineNumbers: true,
            tabSize: 2,
          }} /> : <p className='text-red-500'>{reqItem?.response?.message}</p>}
      </p>
    </div>
  )
}

export default Response




