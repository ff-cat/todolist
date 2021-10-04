import axios from "axios"

export type TodolistsResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type TasksResponseType = {
    error: string | null
    totalCount: number
    item: TaskType[]
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f272445b-402b-4b0f-ba99-09cb5a98a4e4'
    },
})

export const todolistsAPI = {

    getTodolists() {
        return instance.get<TodolistsResponseType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TodolistsResponseType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(title: string, todolistId: string) {
        return instance.put<{ title: string }, ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(title: string, todolistId: string) {
        return instance.post<{ title: string }, ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(title: string, taskId: string, todolistId: string) {
        return instance.put<{ title: string }, ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}