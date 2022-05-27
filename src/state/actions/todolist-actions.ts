import {FilterType} from "../../AppWithRedux";
import {ACTIONS_TYPE} from "./action-types";
import {v1} from "uuid";

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
export type TodolistReducerActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: ACTIONS_TYPE.REMOVE_TODOLIST,
        payload: {todolistId,},
    }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: ACTIONS_TYPE.ADD_TODOLIST,
        payload: {todolistId: v1(), title,},
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
