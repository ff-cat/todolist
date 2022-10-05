import {RootStateType} from "../store";
import {ACTIONS_TYPE} from "./action-types";
import {ThunkAction} from "redux-thunk";
import {ISetAppStatus} from "./app-types";


export interface ITodolists {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterType
}
export interface IGetTodolistResponse {
    id: string
    addedDate: string
    order: number
    title: string
}
export interface IRemoveTodolist {
    type: ACTIONS_TYPE.REMOVE_TODOLIST
    payload: {
        todolistId: string
    }
}
export interface IAddTodolist {
    type: ACTIONS_TYPE.ADD_TODOLIST
    payload: {
        todolistId: string
        title: string
    }
}
export interface IChangeTodolistTitle {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE
    payload: {
        todolistId: string
        title: string
    }
}
export interface IChangeTodolistFilter {
    type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER
    payload: {
        todolistId: string
        filter: FilterType
    }
}
export interface ISetTodolists {
    type: ACTIONS_TYPE.SET_TODOLISTS
    payload: {
        todolists: IGetTodolistResponse[]
    }
}

export type TodolistReducerActionsType =
    IRemoveTodolist
    | IAddTodolist
    | IChangeTodolistTitle
    | IChangeTodolistFilter
    | ISetTodolists
    | ISetAppStatus
export type FilterType = 'all' | 'active' | 'completed'
export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TodolistReducerActionsType>