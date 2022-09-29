import {AuthActionsType, AuthType} from "../types/auth-types";
import {ACTIONS_TYPE} from "../types/action-types";

let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    initializationSuccess: false
}

export const authReducer = (state: AuthType = initialState, action: AuthActionsType): AuthType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_USER_DATA:
            return {
                ...state,
                ...action.payload.data,
                isAuth: action.payload.isAuth
            }
        case ACTIONS_TYPE.INITIALIZATION_SUCCESS:
            return {
                ...state,
                initializationSuccess: true
            }
        default:
            return state
    }
}