import axios from "axios";
import {IGetTodolistResponse} from "../state/types/todolist-types";
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

export const todolistAPI = {
    getTodolist() {
        return instance.get<IGetTodolistResponse[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<IResponse<IGetTodolistResponse>>(`todo-lists`, {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<IResponse<IGetTodolistResponse>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<IResponse<{}>>(`todo-lists/${todolistId}`)
    }
}

