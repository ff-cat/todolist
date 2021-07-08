import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string
        isDone: boolean
        todolistId: string
    }
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string
        title: string
        todolistId: string
    }
}

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)]
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    payload: {taskId, todolistId},
})
export const AddTaskAC = (title: string, todolistId: string): AddTaskAT => ({
    type: 'ADD-TASK',
    payload: {title, todolistId},
})
export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    payload: {taskId, isDone, todolistId},
})
export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    payload: {taskId, title, todolistId},
})