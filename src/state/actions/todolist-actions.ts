import {ACTIONS_TYPE} from "./action-types";
import {GetTodolistResponseType, todolistAPI} from "../../api/todolist-api";
import {RootStateType} from "../store";
import {ThunkAction} from "redux-thunk";
import {FilterType} from "../reducers/todolists-reducer";

export type RemoveTodolistAT = {
    type: ACTIONS_TYPE.REMOVE_TODOLIST
    payload: {
        todolistId: string
    }
}
export type AddTodolistAT = {
    type: ACTIONS_TYPE.ADD_TODOLIST
    payload: {
        todolistId: string
        title: string
    }
}
export type ChangeTodolistTitleAT = {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE
    payload: {
        todolistId: string
        title: string
    }
}
export type ChangeTodolistFilterAT = {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER
    payload: {
        todolistId: string
        filter: FilterType
    }
}
export type SetTodolistsAT = {
    type: ACTIONS_TYPE.SET_TODOLISTS
    payload: {
        todolists: GetTodolistResponseType[]
    }
}
export type TodolistReducerActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistsAT


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: ACTIONS_TYPE.REMOVE_TODOLIST,
        payload: {todolistId,},
    }
}
export const AddTodolistAC = (todolistId: string, title: string): AddTodolistAT => {
    return {
        type: ACTIONS_TYPE.ADD_TODOLIST,
        payload: {todolistId, title,},
    }
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
        payload: {todolistId, title,},
    }
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterType): ChangeTodolistFilterAT => {
    return {
        type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER,
        payload: {todolistId, filter,},
    }
}

export const SetTodolistsAC = (todolists: GetTodolistResponseType[]): SetTodolistsAT => {
    return {
        type: ACTIONS_TYPE.SET_TODOLISTS,
        payload: {todolists}
    }
}


type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TodolistReducerActionsType>


export const SetTodolists = (): ThunkType => {
    return async (dispatch) => {
        const data = await todolistAPI.getTodolist()
        data.status === 200 && dispatch(SetTodolistsAC(data.data))
    }
}

export const RemoveTodolist = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        const data = await todolistAPI.deleteTodolist(todolistId)
        data.status === 200 && dispatch(RemoveTodolistAC(todolistId))
    }
}

export const AddTodolist = (title: string): ThunkType => {
    return async (dispatch) => {
        const data = await todolistAPI.createTodolist(title)
        data.status === 200 && dispatch(AddTodolistAC(data.data.data.item.id, title))
    }
}

export const UpdateTodolistTitle = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        const data = await todolistAPI.updateTodolist(todolistId, title)
        data.status === 200 && dispatch(ChangeTodolistTitleAC(todolistId, title))
    }
}



