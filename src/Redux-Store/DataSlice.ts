import { createSlice } from "@reduxjs/toolkit";
import queryString from 'query-string';
export type Params = {
    name: string,
    values?: Array<[string, string]>
}
export type Body = {
    name: string,
    values?: string,
}
export type Authorization = {
    name: string,
    values?: string,
}
export type Headers = {
    name: string,
    values?: Array<[string, string]>
}

export interface requestSettings {
    requestSettings: [Params, Body, Authorization, Headers],
    activeRequestSettingsIndex: number,
}

export interface ApiRequest extends requestSettings {
    name: string,
    active: boolean,
    url?: string,
    protocol: string,
    method?: string,
    response: any,
    loading: boolean,
}
export interface SubCollections {
    name: string,
    requests: Array<ApiRequest>
}
export interface Collections {
    name: string,
    collections: Array<SubCollections>,
    date: Date,
}
export interface initialState {
    activeCollection: null | number,
    folders: Array<Collections>,
    activeSubcollection: number | null,
    activeRequestIndex: number | null,
}
const initialState: initialState = {
    activeCollection: null,
    activeSubcollection: null,
    folders: [{
        name: "TEST",
        collections: [{
            name: "GET",
            requests: [{
                method: "GET",
                name: "Untitled",
                active: false,
                url: 'dummyjson.com/test',
                protocol: "http",
                activeRequestSettingsIndex: 0,
                requestSettings: [{ name: "Params", values: [['', '']] }, { name: "Body", values: `` }, { name: "Authorization" }, { name: "Headers", values: [['', '']] }],
                response: null,
                loading: false,
            }
            ]
        },

        {
            name: "POST",
            requests: [{
                method: "POST",
                name: "Untitled",
                active: false,
                url: 'dummyjson.com/test',
                protocol: "http",
                activeRequestSettingsIndex: 0,
                requestSettings: [{ name: "Params", values: [['', '']] }, { name: "Body", values: `` }, { name: "Authorization" }, { name: "Headers", values: [['', '']] }],
                response: null,
                loading: false,
            }
            ]
        },
        {
            name: "DELETE",
            requests: [{
                method: "DELETE",
                name: "Untitled",
                active: false,
                url: 'dummyjson.com/test',
                protocol: "http",
                activeRequestSettingsIndex: 0,
                requestSettings: [{ name: "Params", values: [['', '']] }, { name: "Body", values: `` }, { name: "Authorization" }, { name: "Headers", values: [['', '']] }],
                response: null,
                loading: false,
            }
            ]
        },
        {
            name: "PUT",
            requests: [{
                method: "PUT",
                name: "Untitled",
                active: false,
                url: 'dummyjson.com/test',
                protocol: "http",
                activeRequestSettingsIndex: 0,
                requestSettings: [{ name: "Params", values: [['', '']] }, { name: "Body", values: `` }, { name: "Authorization" }, { name: "Headers", values: [['', '']] }],
                response: null,
                loading: false,
            }
            ]
        }

        ], date: new Date(),
    }],
    activeRequestIndex: null,
}
const DataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addCollection(state, action) {
            const { name }: { name: string } = action.payload;
            state.folders.push({ name, collections: [], date: new Date() });
            //for firstCollection set activeCollection activeSubcollection to 0 0
            if (state.folders.length == 1) {
                state.activeCollection = 0;
                state.activeSubcollection = 0;
            }
        },
        changeActiveCollection(state, action) {
            state.activeCollection = action.payload;
            //reset old state 
            // state.activeSubcollection = 0;
            // state.activeRequestIndex = 0;
        },
        addSubCollection(state, action) {
            const { name } = action.payload;
            const idx = state.activeCollection as number;
            state.folders[idx].collections.push({ name, requests: [] });
        },
        changeActiveSubCollection(state, action) {
            state.activeSubcollection = action.payload;
            state.activeRequestIndex = 0;
        },
        addRequest(state, action) {
            const { idx } = action.payload;
            if (state.activeCollection != null) {
                state.folders[state.activeCollection].collections[idx]
                    .requests.push({
                        method: "GET",
                        name: "Untitled",
                        active: false,
                        url: '',
                        protocol: "http",
                        activeRequestSettingsIndex: 0,
                        requestSettings: [{ name: "Params", values: [['', '']] }, { name: "Body", values: `` }, { name: "Authorization" }, { name: "Headers", values: [['', '']] }],
                        response: null,
                        loading: false,
                    });
            }
        },
        changeActiveRequestIndex(state, action) {
            state.activeRequestIndex = action.payload as number;
            if (state.activeCollection !== null && state.activeSubcollection !== null && state.activeRequestIndex != null && action.payload != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[action.payload].active = true;
            }
        },
        updateAllActiveIndex(state, action) {
            const [fIndex, Sindex, reqIndex] = action.payload;
            state.activeCollection = fIndex;
            state.activeSubcollection = Sindex;
            state.activeRequestIndex = reqIndex;
        },
        updateRequestDataUrl(state, action) {
            const value = action.payload as string;
            if (state.activeCollection != null && state.activeRequestIndex != null && state.activeSubcollection != null) {
                const url = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex];
                if (url) {
                    url.url = value;
                    const isQuery = url.url.split("?");
                    if (isQuery.length > 1) {
                        const query = queryString.parse(isQuery[1]);
                        const newValues = Object.entries(query).reduce((pre, acc) => {
                            //@ts-ignore
                            pre.push(acc);
                            return pre;
                        }, []);
                        url.requestSettings[0].values = newValues;
                    }
                }
            }
        },
        updateRequestProtocol(state, action) {
            const protocol = action.payload as string;
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].protocol = protocol;
            }
        },
        updateRequestMethodChange(state, action) {
            if (state.activeCollection != null && state.activeRequestIndex != null && state.activeSubcollection != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].method = action.payload as string;
            }
        },
        updateCurrentRequestSettingIndex(state, action) {
            if (state.activeCollection != null && state.activeRequestIndex != null && state.activeSubcollection != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].activeRequestSettingsIndex = action.payload;
            }
        },
        addNewQueryParams(state) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                const values = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].requestSettings[0].values;
                if (values) {
                    values.push(['', '']);
                }
            }
        },
        updateQueryParameterInRequest(state, action) {
            const { value, idx, key }: { value: string, idx: number, key: number } = action.payload;
            console.log(value, idx, key);
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                const values = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].requestSettings[0].values;
                if (values) {
                    values[idx][key] = value;
                }
                const queryParams = values?.reduce((acc, pre) => {
                    //@ts-ignore
                    acc[pre[0]] = pre[1];
                    return acc;
                }, {});
                //@ts-ignore
                const queryStringFields = queryString.stringify(queryParams);
                const fullUrl = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].url?.split("?")[0];
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].url = `${fullUrl}?${queryStringFields}`;




            }

        },
        updateRequestBody(state, action) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                const val = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].requestSettings;
                if (val) {
                    val[1].values = `${action.payload}`;
                };
            }
        },
        updateRequestHeaderInput(state, action) {
            const { idx, value, key }: { idx: number, value: string, key: number } = action.payload;
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                const val = state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].requestSettings[3].values;
                if (val) {
                    val[idx][key] = value;
                }
            }

        },
        addMoreRequestHeadersInput(state) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                const val = state.folders[state.activeSubcollection].collections[state.activeSubcollection]
                    .requests[state.activeRequestIndex].requestSettings[3].values;
                val?.push(['', '']);
            }
        },
        requestNameChange(state, action) {
            const value = action.payload;
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].name = value;
            }
        },
        changeRequestLoading(state, action) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].loading = action.payload;
            }
        },
        changeAuthorizationValue(state, action) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].requestSettings[2].values = action.payload;
            }
        },
        setResponse(state, action) {
            if (state.activeCollection != null && state.activeSubcollection != null && state.activeRequestIndex != null) {
                state.folders[state.activeCollection].collections[state.activeSubcollection].requests[state.activeRequestIndex].response = action.payload;
            }
        }


    }
});
export const getState = (state: any) => state.DataSlice;

export const {
    addCollection,
    changeActiveCollection,
    addSubCollection,
    changeActiveSubCollection,
    addRequest,
    changeActiveRequestIndex,
    updateAllActiveIndex,
    updateRequestDataUrl,
    updateRequestProtocol,
    updateRequestMethodChange,
    updateCurrentRequestSettingIndex,
    addNewQueryParams,
    updateQueryParameterInRequest,
    updateRequestBody,
    updateRequestHeaderInput,
    addMoreRequestHeadersInput,
    requestNameChange,
    changeRequestLoading,
    changeAuthorizationValue,
    setResponse

} = DataSlice.actions;

export default DataSlice.reducer;
