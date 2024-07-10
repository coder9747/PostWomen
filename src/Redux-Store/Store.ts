import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "./DataSlice";


const localMiddleware = (state:any) => {
    console.log(state);
}


const Store = configureStore({
    reducer: { DataSlice },
    
});

export default Store;