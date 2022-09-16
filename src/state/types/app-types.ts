import {ACTIONS_TYPE} from "./action-types";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppType = {
    status: RequestStatusType
}

export type SetAppStatusAT = {
    type: ACTIONS_TYPE.SET_APP_STATUS
    payload: {
        status: RequestStatusType
    }
}

export type AppReducerActionsTypes = SetAppStatusAT