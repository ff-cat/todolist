import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    payload: { todolistId: string }
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    payload: { title: string }
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todolistId: string
        title: string
    }

}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todolistId: string
        filter: FilterType
    }


}

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.payload.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    payload: {todolistId},
})
export const AddTodolistAC = (title: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    payload: {title},
    todolistId: v1(),
})
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title},
})
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {todolistId, filter},
})
