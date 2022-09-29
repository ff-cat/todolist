import {ACTIONS_TYPE} from "../types/action-types";
import {RequestStatusType, SetAppStatusAT} from "../types/app-types";


export const SetAppStatus = (status: RequestStatusType): SetAppStatusAT => ({
    type: ACTIONS_TYPE.SET_APP_STATUS,
    payload: {status,},
})

