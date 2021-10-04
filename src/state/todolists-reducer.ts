import {v1} from 'uuid';
import {FilterType, TodolistType} from '../App';

type ActionsType = RemoveTodolistAT | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    payload: { todolistId: string }
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterType
    }
}

export const RemoveTodolist = (todolistId: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    payload: {todolistId},
})
export const AddTodolist = (title: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    payload: {title, todolistId: v1()},
})
export const ChangeTodolistTitle = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {id, title},
})
export const ChangeTodolistFilter = (id: string, filter: FilterType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter},
})

