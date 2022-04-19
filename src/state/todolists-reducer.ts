import {TodolistsType} from "../components/AppWithRedux";
import {ACTIONS_TYPE, TodolistReducerActionsType} from "./actions";
import {v1} from "uuid";

export let todolistId1 = v1()
export let todolistId2 = v1()
const initialState: TodolistsType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all',},
    {id: todolistId2, title: 'What to buy', filter: 'all',},
]

export const todolistsReducer = (state: TodolistsType[] = initialState, action: TodolistReducerActionsType): TodolistsType[] => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            return state.filter(s => s.id !== action.payload.todolistId)
        case ACTIONS_TYPE.ADD_TODOLIST:
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(s => s.id === action.payload.todolistId ? {...s, title: action.payload.title} : s)
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER:
            return state.map(s => s.id === action.payload.todolistId ? {...s, filter: action.payload.filter} : s)
        default:
            return state
    }
}