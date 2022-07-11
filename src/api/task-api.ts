import axios from "axios";

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
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
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
        'API-KEY': 'f272445b-402b-4b0f-ba99-09cb5a98a4e4'
    },
})

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, RequestTaskObj: RequestTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, RequestTaskObj)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
}