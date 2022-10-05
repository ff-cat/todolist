import {stopSubmit} from "redux-form"
import {IUserData, IInitialization, ISetUserData, ThunkType} from "../types/auth-types"
import {ACTIONS_TYPE} from "../types/action-types";
import {authAPI} from "../../api/auth-api";

export const SetAuthUserData = (data: IUserData, isAuth: boolean): ISetUserData => ({
    type: ACTIONS_TYPE.SET_USER_DATA,
    payload: {data, isAuth},
})

export const InitializationSuccess = (): IInitialization => ({
    type: ACTIONS_TYPE.INITIALIZATION_SUCCESS
})


export const FetchAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.me()
        dispatch(InitializationSuccess())
        data.resultCode === 0 && dispatch(SetAuthUserData(data.data, true))
    }
}

export const LogIn = (email: string, password: string, rememberMe: boolean = false): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.login(email, password, rememberMe)
        data.resultCode === 0
            ? await dispatch(FetchAuthUserData())
            : dispatch(stopSubmit('login', {_error: data.messages}))
    }
}

export const LogOut = (): ThunkType => {
    return async (dispatch) => {
        const data = await authAPI.logout()
        data.resultCode === 0 && dispatch(SetAuthUserData({id: null, email: null, login: null}, false))
    }
}
