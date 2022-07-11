import {ACTIONS_TYPE} from "./action-types";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolist-actions";
import {TaskType, taskAPI} from "../../api/task-api";
import {RootStateType} from "../store";
import {ThunkAction} from "redux-thunk";


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
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT


export const RemoveTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: ACTIONS_TYPE.REMOVE_TASK,
        payload: {todolistId, taskId,},
    }
}
export const AddTaskAC = (task: TaskType): AddTaskAT => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        payload: {task},
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
export const SetTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksAT => {
    return {
        type: ACTIONS_TYPE.SET_TASKS,
        payload: {todolistId, tasks},
    }
}


type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, TaskReducerActionsType>

export const SetTasks = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        const data = await taskAPI.getTasks(todolistId)
        data.status === 200 && dispatch(SetTasksAC(todolistId, data.data.items))
    }
}

export const RemoveTask = (todolistId: string, taskId: string): ThunkType => {
    return async (dispatch) => {
        const data = await taskAPI.deleteTask(todolistId, taskId)
        data.status === 200 && dispatch(RemoveTaskAC(todolistId, taskId))
    }
}

export const AddTask = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        const data = await taskAPI.createTask(todolistId, title)
        data.status === 200 && dispatch(AddTaskAC(data.data.data.item))
    }
}

export const UpdateTaskTitle = (todolistId: string, taskId: string, title: string): ThunkType => {
    return async (dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const model = {...task, title: title}
        const data = await taskAPI.updateTask(todolistId, taskId, model)
        data.status === 200 && dispatch(ChangeTaskTitleAC(todolistId, taskId, title))
    }
}

export const UpdateTaskStatus = (todolistId: string, taskId: string,): ThunkType => {
    return async (dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const model = {...task, status: Number(!Boolean(task.status))}
        const data = await taskAPI.updateTask(todolistId, taskId, model)
        console.log(data)
        data.status === 200 && dispatch(ChangeTaskStatusAC(todolistId, taskId))
    }
}