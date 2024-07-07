import { createSlice } from "@reduxjs/toolkit";



export interface Headers {
    key: string,
    value: string,
    description: string,
}
export interface ApiRequest {
    name: string,
    url: string,
    method: string,
    Params: string,
    Authorization: string,
    Headers: Array<Headers>,
    Body: string,
}
export interface SubCollections {
    name: string,
    requests: Array<ApiRequest>
}
export interface Collections {
    name: string,
    collections: Array<SubCollections>,
    data: Date,
}
const initialState: Array<Collections> = [];

const DataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        

    }
});


