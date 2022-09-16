import {ACTIONS_TYPE} from "../types/action-types";
import {taskAPI} from "../../api/task-api";
import {RootStateType} from "../store";
import {
    AddTaskAT,
    ChangeTaskTitleAT,
    RemoveTaskAT,
    RequestTaskType,
    SetTasksAT,
    TaskType,
    ThunkType, UpdateTaskType
} from "../types/task-types";
import {SetAppStatus} from "./app-actions";


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
export const UpdateTaskAC = (todolistId: string, taskId: string, model: RequestTaskType): ChangeTaskTitleAT => {
    return {
        type: ACTIONS_TYPE.UPDATE_TASK,
        payload: {todolistId, taskId, model,},
    }
}
export const SetTasksAC = (todolistId: string, tasks: TaskType[]): SetTasksAT => {
    return {
        type: ACTIONS_TYPE.SET_TASKS,
        payload: {todolistId, tasks},
    }
}


export const FetchTasks = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await taskAPI.getTasks(todolistId)
        data.status === 200 && dispatch(SetTasksAC(todolistId, data.data.items))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const RemoveTask = (todolistId: string, taskId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await taskAPI.deleteTask(todolistId, taskId)
        data.status === 200 && dispatch(RemoveTaskAC(todolistId, taskId))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const AddTask = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        const data = await taskAPI.createTask(todolistId, title)
        data.status === 200 && dispatch(AddTaskAC(data.data.data.item))
        dispatch(SetAppStatus('succeeded'))
    }
}
export const UpdateTask = (todolistId: string, taskId: string, domainModel: UpdateTaskType): ThunkType => {
    return async (dispatch, getState: () => RootStateType) => {
        dispatch(SetAppStatus('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const apiModel: RequestTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        const data = await taskAPI.updateTask(todolistId, taskId, apiModel)
        data.status === 200 && dispatch(UpdateTaskAC(todolistId, taskId, apiModel))
        dispatch(SetAppStatus('succeeded'))
    }
}