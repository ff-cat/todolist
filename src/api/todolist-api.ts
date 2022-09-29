import axios from "axios";
import {GetTodolistResponseType} from "../state/types/todolist-types";
import {apiKey} from "./auth-api";


type ResponseType<I> = {
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
        return instance.get<GetTodolistResponseType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<GetTodolistResponseType>>(`todo-lists`, {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<GetTodolistResponseType>>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    }
}

