import {ACTIONS_TYPE} from "../types/action-types";
import {RequestStatusType, ISetAppStatus} from "../types/app-types";


export const SetAppStatus = (status: RequestStatusType): ISetAppStatus => ({
    type: ACTIONS_TYPE.SET_APP_STATUS,
    payload: {status,},
})

