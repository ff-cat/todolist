import {ACTIONS_TYPE} from "../types/action-types";
import {todolistAPI} from "../../api/todolist-api";
import {
    IAddTodolist,
    IChangeTodolistFilter,
    IChangeTodolistTitle,
    FilterType, IGetTodolistResponse,
    IRemoveTodolist, ISetTodolists, ThunkType, IChangeTodolistEntityStatus
} from "../types/todolist-types";
import {SetAppError, SetAppStatus} from "./app-actions";
import {RequestStatusType} from "../types/app-types";


export const RemoveTodolistAC = (todolistId: string): IRemoveTodolist => {
    return {
        type: ACTIONS_TYPE.REMOVE_TODOLIST,
        payload: {todolistId,},
    }
}
export const AddTodolistAC = (todolistId: string, title: string): IAddTodolist => {
    return {
        type: ACTIONS_TYPE.ADD_TODOLIST,
        payload: {todolistId, title,},
    }
}
export const ChangeTodolistTitle = (todolistId: string, title: string): IChangeTodolistTitle => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
        payload: {todolistId, title,},
    }
}
export const ChangeTodolistFilter = (todolistId: string, filter: FilterType): IChangeTodolistFilter => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER,
        payload: {todolistId, filter,},
    }
}
export const SetTodolists = (todolists: IGetTodolistResponse[]): ISetTodolists => {
    return {
        type: ACTIONS_TYPE.SET_TODOLISTS,
        payload: {todolists}
    }
}
export const SetTodolistEntityStatus = (todolistId: string, status: RequestStatusType): IChangeTodolistEntityStatus => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS,
        payload: {todolistId, status}
    }
}


export const FetchTodolists = (): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await todolistAPI.getTodolist()
        data.status === 200 && dispatch(SetTodolists(data.data))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const RemoveTodolist = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        dispatch(SetTodolistEntityStatus(todolistId, 'loading'))
        try {
            const data = await todolistAPI.deleteTodolist(todolistId)
            data.resultCode === 0 && dispatch(RemoveTodolistAC(todolistId))
            dispatch(SetAppStatus('succeeded'))
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
            dispatch(SetTodolistEntityStatus(todolistId, 'idle'))
        }
    }
}
export const AddTodolist = (title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        try {
            const data = await todolistAPI.createTodolist(title)
            if (data.resultCode === 0) {
                dispatch(AddTodolistAC(data.data.item.id, title))
                dispatch(SetAppStatus('succeeded'))
            } else {
                dispatch(SetAppError(data.messages[0]))
                dispatch(SetAppStatus('succeeded'))
            }
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
        }

    }
}
export const UpdateTodolistTitle = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        dispatch(SetTodolistEntityStatus(todolistId, 'loading'))
        try {
            const data = await todolistAPI.updateTodolist(todolistId, title)
            data.resultCode === 0 && dispatch(ChangeTodolistTitle(todolistId, title))
            dispatch(SetAppStatus('succeeded'))
            dispatch(SetTodolistEntityStatus(todolistId, 'idle'))
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
            dispatch(SetTodolistEntityStatus(todolistId, 'idle'))
        }
    }
}



