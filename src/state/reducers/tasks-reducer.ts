import {ACTIONS_TYPE} from "../types/action-types";
import {ITasks, TaskReducerActionsType} from "../types/task-types";

const initialState: ITasks = {}

export const tasksReducer = (state: ITasks = initialState, action: TaskReducerActionsType): ITasks => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_TASKS:
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        case ACTIONS_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(s => s.id !== action.payload.taskId)
            }
        case ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task, entityStatus: 'idle'
                }, ...state[action.payload.task.todoListId]]
            }
        case ACTIONS_TYPE.UPDATE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(s => s.id === action.payload.taskId
                    ? {...s, ...action.payload.model} : s)
            }
        case ACTIONS_TYPE.ADD_TODOLIST:
            return {[action.payload.todolistId]: [], ...state}
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            delete state[action.payload.todolistId]
            return {...state}
        case ACTIONS_TYPE.SET_TODOLISTS:
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case ACTIONS_TYPE.CHANGE_TASK_ENTITY_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(s => s.id === action.payload.taskId
                    ? {...s, entityStatus: action.payload.status} : s)
            }
        default:
            return state
    }
}