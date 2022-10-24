import {ACTIONS_TYPE} from "./action-types";

export interface IApp {
    status: RequestStatusType
    error: string | null
}
export interface ISetAppStatus {
    type: ACTIONS_TYPE.SET_APP_STATUS
    payload: {
        status: RequestStatusType
    }
}
export interface ISetAppError {
    type: ACTIONS_TYPE.SET_APP_ERROR
    payload: {
        error: string | null
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerActionsTypes = ISetAppStatus | ISetAppError