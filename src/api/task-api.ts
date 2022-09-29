import axios from "axios";
import {GetTasksResponseType, RequestTaskType, TaskType} from "../state/types/task-types";
import {apiKey} from "./auth-api";

export type ResponseType<I> = {
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
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, RequestTaskObj: RequestTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, RequestTaskObj)
    },
}