import {ACTIONS_TYPE} from "../types/action-types";
import {TodolistReducerActionsType, ITodolist} from "../types/todolist-types";

const initialState: ITodolist[] = []

export const todolistsReducer = (state: ITodolist[] = initialState, action: TodolistReducerActionsType): ITodolist[] => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_TODOLISTS:
            return action.payload.todolists.map(tl => ({
                addedDate: '',
                order: 0,
                id: tl.id,
                title: tl.title,
                filter: 'all',
                entityStatus: 'idle'
            }))
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(s => s.id !== action.payload.todolistId)
        case ACTIONS_TYPE.ADD_TODOLIST:
            return [{
                addedDate: '',
                order: 0,
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all',
                entityStatus: 'idle'
            }, ...state]
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(s => s.id === action.payload.todolistId ? {...s, ...action.payload} : s)
        case ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(s => s.id === action.payload.todolistId ? {...s, entityStatus: action.payload.status} : s)
        default:
            return state
    }
}