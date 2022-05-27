import {ACTIONS_TYPE} from "./action-types";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-actions";


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

export type TaskReducerActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT

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