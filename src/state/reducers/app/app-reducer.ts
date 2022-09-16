import {ACTIONS_TYPE} from "../../types/action-types";
import {AppReducerActionsTypes, AppType, RequestStatusType} from "../../types/app-types";

const initialState: AppType = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: AppType = initialState, action: AppReducerActionsTypes): AppType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_APP_STATUS:
            return {...state, status: action.payload.status}
        default:
            return state
    }
}


