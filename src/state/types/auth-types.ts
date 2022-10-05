import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";
import {ACTIONS_TYPE} from "./action-types";

export interface IAuth {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    initializationSuccess: boolean
}
export interface IUserData {
    id: number | null
    email: string | null
    login: string | null
}
export interface ISetUserData {
    type: ACTIONS_TYPE.SET_USER_DATA
    payload: { data: IUserData, isAuth: boolean }
}
export interface IInitialization {
    type: ACTIONS_TYPE.INITIALIZATION_SUCCESS
}

export type AuthActionsType = ISetUserData | IInitialization
export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, AuthActionsType>
