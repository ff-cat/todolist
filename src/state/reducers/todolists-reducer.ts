import {ACTIONS_TYPE} from "../types/action-types";
import {TodolistReducerActionsType, TodolistsType} from "../types/todolist-types";

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[] = initialState, action: TodolistReducerActionsType): TodolistsType[] => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(s => s.id !== action.payload.todolistId)
        case ACTIONS_TYPE.ADD_TODOLIST:
            return [{
                addedDate: '',
                order: 0,
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }, ...state]
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(s => s.id === action.payload.todolistId ? {...s, title: action.payload.title} : s)
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(s => s.id === action.payload.todolistId ? {...s, filter: action.payload.filter} : s)
        case ACTIONS_TYPE.SET_TODOLISTS:
            return action.payload.todolists.map(tl => ({
                addedDate: '',
                order: 0,
                id: tl.id,
                title: tl.title,
                filter: 'all'
            }))
        default:
            return state
    }
}