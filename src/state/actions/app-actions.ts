import {ACTIONS_TYPE} from "../types/action-types";
import {RequestStatusType} from "../types/app-types";


export const SetAppStatus = (status: RequestStatusType): any => {
    return {
        type: ACTIONS_TYPE.SET_APP_STATUS,
        payload: {status,},
    }
}
