import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";
import {ACTIONS_TYPE} from "./action-types";

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    initializationSuccess: boolean
}
export type UserDataType = {
    id: number | null
    email: string | null
    login: string | null
}
export type SetUserDataAT = {
    type: ACTIONS_TYPE.SET_USER_DATA
    payload: { data: UserDataType, isAuth: boolean }
}
export type InitializationAT = {
    type: ACTIONS_TYPE.INITIALIZATION_SUCCESS
}
export type AuthActionsType = SetUserDataAT | InitializationAT
export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AuthActionsType>
