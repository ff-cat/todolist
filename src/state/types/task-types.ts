import {ACTIONS_TYPE} from "./action-types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-types";
import {SetAppStatusAT} from "./app-types";

export type TaskType = {
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
export type RequestTaskType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type UpdateTaskType = {
    title?: string
    description?: string | null
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
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
        task: TaskType
    }
}
export type ChangeTaskTitleAT = {
    type: ACTIONS_TYPE.UPDATE_TASK
    payload: {
        todolistId: string
        taskId: string
        model: RequestTaskType
    }
}
export type SetTasksAT = {
    type: ACTIONS_TYPE.SET_TASKS
    payload: {
        tasks: TaskType[]
        todolistId: string
    }
}
export type TaskReducerActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT
    | SetAppStatusAT

export type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TaskReducerActionsType>

