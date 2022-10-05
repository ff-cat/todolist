import {ACTIONS_TYPE} from "./action-types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";
import {IAddTodolist, IRemoveTodolist, ISetTodolists} from "./todolist-types";
import {ISetAppStatus} from "./app-types";

export interface ITask {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string
}
export interface IRequestTask {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
export interface IGetTasksResponse {
    error: string | null
    totalCount: number
    items: ITask[]
}
export interface ITasks {
    [key: string]: ITask[]
}
export interface IUpdateTask {
    title?: string
    description?: string | null
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}
export interface IRemoveTask {
    type: ACTIONS_TYPE.REMOVE_TASK
    payload: {
        todolistId: string
        taskId: string
    }
}
export interface IAddTask {
    type: ACTIONS_TYPE.ADD_TASK
    payload: {
        task: ITask
    }
}
export interface IChangeTaskTitle {
    type: ACTIONS_TYPE.UPDATE_TASK
    payload: {
        todolistId: string
        taskId: string
        model: IRequestTask
    }
}
export interface ISetTasks {
    type: ACTIONS_TYPE.SET_TASKS
    payload: {
        tasks: ITask[]
        todolistId: string
    }
}

export type TaskReducerActionsType =
    IRemoveTask
    | IAddTask
    | IChangeTaskTitle
    | IAddTodolist
    | IRemoveTodolist
    | ISetTodolists
    | ISetTasks
    | ISetAppStatus
export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TaskReducerActionsType>

