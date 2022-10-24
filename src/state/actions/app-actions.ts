import {ACTIONS_TYPE} from "../types/action-types";
import {RequestStatusType, ISetAppStatus, ISetAppError} from "../types/app-types";


export const SetAppStatus = (status: RequestStatusType): ISetAppStatus => ({
    type: ACTIONS_TYPE.SET_APP_STATUS,
    payload: {status,},
})

export const SetAppError = (error: string | null): ISetAppError => ({
    type: ACTIONS_TYPE.SET_APP_ERROR,
    payload: {error,},
})

