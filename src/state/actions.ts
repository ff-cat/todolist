import {FilterType} from "../components/AppWithRedux";
import {v1} from "uuid";

export enum ACTIONS_TYPE {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',

    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
}

export type RemoveTaskAT = {
    type: ACTIONS_TYPE.REMOVE_TASK
    payload: {
        todolistId: string
        taskId: string
    }
}
export type AddTaskAT = {
    type: ACTIONS_TYPE.ADD_TASK
    payload: {
        todolistId: string
        title: string
    }

}
export type ChangeTaskTitleAT = {
    type: ACTIONS_TYPE.CHANGE_TASK_TITLE
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}
export type ChangeTaskStatusAT = {
    type: ACTIONS_TYPE.CHANGE_TASK_STATUS
    payload: {
        todolistId: string
        taskId: string
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: ACTIONS_TYPE.REMOVE_TASK,
        payload: {todolistId, taskId,},
    }
}
export const AddTaskAC = (todolistId: string, title: string): AddTaskAT => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        payload: {todolistId, title,},
    }
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_TITLE,
        payload: {todolistId, taskId, title,},
    }
}
export const ChangeTaskStatusAC = (todolistId: string, taskId: string): ChangeTaskStatusAT => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_STATUS,
        payload: {todolistId, taskId,},
    }
}

export type TaskReducerActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT

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

export type TodolistReducerActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
