import axios from "axios";
import {IGetTasksResponse, IRequestTask, ITask} from "../state/types/task-types";
import {apiKey} from "./auth-api";

interface IResponse<I> {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: {
        item: I
    }
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': apiKey
    },
})

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<IGetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<IResponse<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`).then(res=> res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<IResponse<ITask>>(`todo-lists/${todolistId}/tasks`, {title}).then(res=> res.data)
    },
    updateTask(todolistId: string, taskId: string, RequestTaskObj: IRequestTask) {
        return instance.put<IResponse<ITask>>(`todo-lists/${todolistId}/tasks/${taskId}`, RequestTaskObj).then(res=> res.data)
    },
}