import {ACTIONS_TYPE} from "../types/action-types";
import {todolistAPI} from "../../api/todolist-api";
import {
    IAddTodolist,
    IChangeTodolistFilter,
    IChangeTodolistTitle,
    FilterType, IGetTodolistResponse,
    IRemoveTodolist, ISetTodolists, ThunkType
} from "../types/todolist-types";
import {SetAppStatus} from "./app-actions";


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
export const ChangeTodolistTitleAC = (todolistId: string, title: string): IChangeTodolistTitle => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
        payload: {todolistId, title,},
    }
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterType): IChangeTodolistFilter => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER,
        payload: {todolistId, filter,},
    }
}
export const SetTodolistsAC = (todolists: IGetTodolistResponse[]): ISetTodolists => {
    return {
        type: ACTIONS_TYPE.SET_TODOLISTS,
        payload: {todolists}
    }
}

export const FetchTodolists = (): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await todolistAPI.getTodolist()
        data.status === 200 && dispatch(SetTodolistsAC(data.data))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const RemoveTodolist = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await todolistAPI.deleteTodolist(todolistId)
        data.status === 200 && dispatch(RemoveTodolistAC(todolistId))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const AddTodolist = (title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await todolistAPI.createTodolist(title)
        data.status === 200 && dispatch(AddTodolistAC(data.data.data.item.id, title))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const UpdateTodolistTitle = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await todolistAPI.updateTodolist(todolistId, title)
        data.status === 200 && dispatch(ChangeTodolistTitleAC(todolistId, title))
        dispatch(SetAppStatus('succeeded'))
    }
}



