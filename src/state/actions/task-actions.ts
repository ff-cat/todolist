import {ACTIONS_TYPE} from "../types/action-types";
import {taskAPI} from "../../api/task-api";
import {RootStateType} from "../store";
import {
    IAddTask,
    IChangeTaskTitle,
    IRemoveTask,
    IRequestTask,
    ISetTasks,
    ITask,
    ThunkType, IUpdateTask, IChangeTaskEntityStatus
} from "../types/task-types";
import {SetAppError, SetAppStatus} from "./app-actions";
import {RequestStatusType} from "../types/app-types";


export const RemoveTaskAC = (todolistId: string, taskId: string): IRemoveTask => {
    return {
        type: ACTIONS_TYPE.REMOVE_TASK,
        payload: {todolistId, taskId,},
    }
}
export const AddTaskAC = (task: ITask): IAddTask => {
    return {
        type: ACTIONS_TYPE.ADD_TASK,
        payload: {task},
    }
}
export const UpdateTaskAC = (todolistId: string, taskId: string, model: IRequestTask): IChangeTaskTitle => {
    return {
        type: ACTIONS_TYPE.UPDATE_TASK,
        payload: {todolistId, taskId, model,},
    }
}
export const SetTasksAC = (todolistId: string, tasks: ITask[]): ISetTasks => {
    return {
        type: ACTIONS_TYPE.SET_TASKS,
        payload: {todolistId, tasks},
    }
}

export const SetTaskEntityStatus = (todolistId: string, taskId: string, status: RequestStatusType): IChangeTaskEntityStatus => {
    return {
        type: ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS,
        payload: {todolistId, taskId, status}
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
        dispatch(SetTaskEntityStatus(todolistId, taskId, 'loading'))
        try {
            const data = await taskAPI.deleteTask(todolistId, taskId)
            data.resultCode === 0 && dispatch(RemoveTaskAC(todolistId, taskId))
            dispatch(SetAppStatus('succeeded'))
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
        } finally {
            dispatch(SetTaskEntityStatus(todolistId, taskId, 'idle'))
        }

    }
}
export const AddTask = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        dispatch(SetAppStatus('loading'))
        try {
            const data = await taskAPI.createTask(todolistId, title)
            if (data.resultCode === 0) {
                dispatch(AddTaskAC(data.data.item))
                dispatch(SetAppStatus('succeeded'))
            } else {
                dispatch(SetAppError(data.messages[0]))
                dispatch(SetAppStatus('succeeded'))
            }
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
        }
    }
}
export const UpdateTask = (todolistId: string, taskId: string, domainModel: IUpdateTask): ThunkType => {
    return async (dispatch, getState: () => RootStateType) => {
        dispatch(SetAppStatus('loading'))
        dispatch(SetTaskEntityStatus(todolistId, taskId, 'loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const apiModel: IRequestTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        try {
            const data = await taskAPI.updateTask(todolistId, taskId, apiModel)
            if (data.resultCode === 0) {
                dispatch(UpdateTaskAC(todolistId, taskId, apiModel))
                dispatch(SetAppStatus('succeeded'))
            } else {
                dispatch(SetAppError(data.messages[0]))
                dispatch(SetAppStatus('succeeded'))
            }
        } catch (error: any) {
            dispatch(SetAppError(error.message))
            dispatch(SetAppStatus('succeeded'))
        } finally {
            dispatch(SetTaskEntityStatus(todolistId, taskId, 'idle'))
        }

    }
}