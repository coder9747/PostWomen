import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCollection, addRequest, addSubCollection, ApiRequest, changeActiveCollection, changeActiveRequestIndex, changeActiveSubCollection, Collections, getState, initialState, requestNameChange, SubCollections, updateAllActiveIndex } from './Redux-Store/DataSlice';
import Main from './Components/Main';
import Response from './Components/Response';
import Split from 'react-split'


const App = () => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isPlusClicked, setPlusClicked] = useState<boolean>(false);
  const [subDirAddNumber, setSubDirAddNumber] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [subDirName, setSubDirName] = useState<string>('test');
  const dispatch = useDispatch();
  const state: initialState = useSelector(getState);
  console.log(state);
  const handleAddCollection = useCallback(() => {
    if (name) {
      dispatch(addCollection({ name }));
      setPlusClicked(false);
      setName("");
    }
    else {
      alert("name is Empty");
    }

  }, [name]);

  const handleAddSubCollection = () => {
    dispatch(addSubCollection({
      name: subDirName,
    }));
    setSubDirAddNumber(null);
  };
  //function triggered when SubFolder Plus Clicked
  const handleSubPlusClicked = (idx: number) => {
    if (idx == subDirAddNumber) {
      setSubDirAddNumber(null);
    }
    else {
      setSubDirName('');
      setSubDirAddNumber(idx)
    }
  };
  //function triggered when Folder Plus Clicked
  const handleActiveDirChange = (idx: number) => {
    if (state.activeCollection == idx) {
      dispatch(changeActiveCollection(null));
    }
    else {
      dispatch(changeActiveCollection(idx));
      setSubDirAddNumber(null);
    }

  };
  //function triggered when subDir Add Request
  const handleSubDirArrowClicked = (idx: number) => {
    if (state.activeSubcollection == idx) {
      dispatch(changeActiveSubCollection(null));
    }
    else {
      dispatch(changeActiveSubCollection(idx));
    }
  };
  //function triggered when apiRequest Add Clicked
  const handleAddRequest = (idx: number) => {
    dispatch(addRequest({ idx }));
  }
  //function triggered when apRequest Switch
  const handleActiveRequestChange = (idx: number): void => {
    dispatch(changeActiveRequestIndex(idx))
  };
  const handleChangePresentActiveWindow = (array: [number, number, number]) => {
    dispatch(updateAllActiveIndex(array));
  };
  const  handleRequestNameChange = (value:string) => {
     dispatch(requestNameChange(value))

  };

  return (
    <div className='h-screen flex flex-col '>
      <div className='text-center bg-secondary py-2 text-sm'>My WorkSpace </div>
      <div className='bg-gray-200 h-[1px]'></div>
      <ul className='flex  gap-2  px-1 bg-secondary'>
        <li>File</li>
        <li>Edit</li>
        <li>View</li>
        <li>Help</li>
      </ul>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-2 grid grid-cols-12 '>
          {/* <div className='col-span-4 border flex flex-col p-2 gap-1 text-white transition-all'>
            <div onClick={() => setSelectedIndex(0)} className={`flex gap-3 flex-col rounded-xl text-sm justify-center items-center p-3 ${selectedIndex == 0 ? "bg-primary" : 'text-black'}`}>
              <i className="fa-solid fa-book"></i>
              <p className='text-[12px]'>Collections</p>
            </div>
            <div onClick={() => setSelectedIndex(1)} className={`flex flex-col gap-3 rounded-xl text-sm justify-center items-center p-3 ${selectedIndex == 1 ? "bg-primary" : 'text-black'}`}>
              <i className="fa-solid fa-box"></i>
              <p className='text-[12px]'>Enviroments</p>
            </div>
            <div onClick={() => setSelectedIndex(2)} className={`flex gap-3 flex-col rounded-xl text-sm justify-center items-center p-3 ${selectedIndex == 2 ? "bg-primary" : 'text-black'}`}>
              <i className="fa-solid fa-rotate-left"></i>
              <p className='text-[12px]'>History</p>
            </div>
            <div onClick={() => setSelectedIndex(3)} className={`flex gap-3 flex-col rounded-xl text-sm justify-center items-center p-3 ${selectedIndex == 3 ? "bg-primary" : 'text-black'}`}>
              <i className="fa-solid fa-book"></i>
              <p className='text-[12px]'>Collections</p>
            </div>
          </div> */}
          <div className='col-span-12 border '>
            <div className='h-8 border flex justify-start px-2 items-center'>
              <i onClick={() => setPlusClicked((pre) => !pre)} className={`fa-solid fa-plus ${isPlusClicked ? 'text-primary' : null} text-gray-500`}></i>
              <i className="fa-solid fa-filter text-gray-500 ms-5"></i>
            </div>
            {isPlusClicked && <div className='p-1 flex justify-between'>
              <input value={name} onChange={(e) => setName(e.target.value)} className='h-6 w-full bg-gray-200 p-1 outline-none   text-sm' type="text" />
              <button onClick={handleAddCollection} className='h-6  border  p-1 text-[10px] text-white ms-1 rounded bg-primary '>Add</button>
            </div>}
            {
              state.folders.map((item: Collections, idx: number) => {
                return (<div>
                  <div id={String(idx)} className='flex justify-between gap-2 h-10 text-sm items-center px-2 border'>
                    <div className='w-10 flex justify-between'>
                      {state.activeCollection == idx ? <i onClick={() => handleActiveDirChange(null)} className="fa-solid fa-arrow-down text-primary"></i> : <i onClick={() => handleActiveDirChange(idx)} className="fa-solid fa-arrow-right"></i>}
                      {state.activeCollection == idx ? <i className="fa-solid fa-folder-open text-primary"></i> : <i className="fa-solid fa-folder"></i>}
                    </div>
                    <p>{item.name}</p>
                    <i onClick={() => { handleSubPlusClicked(idx); dispatch(changeActiveCollection(idx)) }} className="fa-solid border text-[11px] fa-plus"></i>
                  </div>
                  {state.activeCollection != null && state.activeCollection == idx && <div className='ps-5'>
                    {subDirAddNumber != null && subDirAddNumber == idx && <div className='p-1 flex justify-between'>
                      <input placeholder='Enter Subdir Name' value={subDirName} onChange={(e) => setSubDirName(e.target.value)} className='h-6 w-full bg-gray-200 p-1 outline-none   text-sm' type="text" />
                      <button onClick={handleAddSubCollection} className='h-6  border  p-1 text-[10px] text-white ms-1 rounded bg-primary '>Add</button>
                    </div>}
                    {
                      item.collections.map((item: SubCollections, idxChild: number) => {
                        return (
                          <div>
                            <div className='flex relative border items-center gap-2 h-8 text-[13px]'>
                              {
                                (state.activeCollection == idx && state.activeSubcollection == idxChild) ?
                                  <i onClick={() => dispatch(changeActiveSubCollection(null))} className="fa-solid fa-arrow-down text-primary"></i> :
                                  <i onClick={() => handleSubDirArrowClicked(idxChild)} className="fa-solid fa-arrow-right"></i>
                              }
                              {
                                (state.activeCollection == idx && state.activeSubcollection == idxChild) ?
                                  <i className="fa-solid fa-folder-open text-primary"></i> :
                                  <i className="fa-solid fa-folder"></i>
                              }
                              <p>{item.name}</p>
                              <i onClick={() => handleAddRequest(idxChild)} className='absolute right-1
                           fa-solid fa-plus'></i>
                            </div>
                            {state.activeCollection != null && state.activeCollection == idx && state.activeSubcollection == idxChild && <div className='ms-5'>
                              {
                                item.requests.map((item: ApiRequest, idx: number) => {
                                  return <div onClick={() => handleActiveRequestChange(idx)} className={`flex ${state.activeRequestIndex == idx && 'bg-slate-700 border border-r-3 border-r-red-500 text-white'}  border h-7 ps-1 justify-start items-center gap-2 text-[12px]`}>
                                    <p className={`${item.method == "GET" && "text-orange-500"}`}>{item.method}</p>
                                    <p>{item.name}</p>
                                  </div>
                                })
                              }
                            </div>}
                          </div>);
                      })
                    }
                  </div>}
                </div>)
              })
            }
          </div>
        </div>
        <div className='col-span-10  to-black'>
          <div className='flex  h-10 border items-center justify-start'>
            {
              getActiveStates(state).map((data: [ApiRequest, [number, number, number]]) => {
                const [item, [folderIndex, subFolderIndex, requestIndex]] = data;
                const isActiveBorder = checkActiveBorder([[folderIndex, subFolderIndex, requestIndex], [state.activeCollection, state.activeSubcollection, state.activeRequestIndex]]);
                return (<div onClick={() => handleChangePresentActiveWindow([folderIndex, subFolderIndex, requestIndex])} className={`flex
                  ${isActiveBorder ? "border-b-orange-500" : null}
                w-36 justify-around h-full gap-2 py-2 border text-[12px] border-b-2`}>
                  <p className=''>{item.method}</p>
                  <input onChange={(e)=>handleRequestNameChange(e.target.value)} className='w-16 outline-none ' value={item.name?.length<20?item.name:item.name.slice(20)+'...'} type="text" />
                  <p><i className="fa-solid fa-xmark"></i></p>
                </div>)
              })
            }
          </div>
            <Main />
            <Response />
        </div>

      </div>
    </div>
  )
}

export default App



function getActiveStates(state: initialState) {
  const arr: Array<[ApiRequest, [number, number, number]]> = [];
  state.folders.forEach((item: Collections, folderIdx: number) => {
    item.collections.forEach((subCollection: SubCollections, subCollectionIndex: number) => {
      subCollection.requests.forEach((apiRequestItem: ApiRequest, requestIndex: number) => {
        const indexArray: [number, number, number] = [folderIdx, subCollectionIndex, requestIndex];
        if (apiRequestItem.active) arr.push([apiRequestItem, indexArray]);
      });
    });
  });
  return arr;
}

function checkActiveBorder(array: [[number, number, number], [number | null, number | null, number | null]]) {
  const [[folderIndex, subFolderIndex, requestIndex], [requestFolderIndex, requestSubFolderIndex, requestRequestIndex]] = array;
  return (
    folderIndex == requestFolderIndex &&
    subFolderIndex == requestSubFolderIndex &&
    requestIndex == requestRequestIndex
  );
}