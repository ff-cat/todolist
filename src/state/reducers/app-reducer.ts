import {ACTIONS_TYPE} from "../types/action-types";
import {AppReducerActionsTypes, IApp, RequestStatusType} from "../types/app-types";

const initialState: IApp = {
    status: 'idle' as RequestStatusType
}

export const appReducer = (state: IApp = initialState, action: AppReducerActionsTypes): IApp => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_APP_STATUS:
            return {...state, status: action.payload.status}
        default:
            return state
    }
}


