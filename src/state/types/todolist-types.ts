import {RootStateType} from "../store";
import {ACTIONS_TYPE} from "./action-types";
import {ThunkAction} from "redux-thunk";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterType
}

export type GetTodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

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


export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TodolistReducerActionsType>