import {ACTIONS_TYPE} from "./action-types";

export interface IApp {
    status: RequestStatusType
}
export interface ISetAppStatus {
    type: ACTIONS_TYPE.SET_APP_STATUS
    payload: {
        status: RequestStatusType
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerActionsTypes = ISetAppStatus