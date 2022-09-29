import {ACTIONS_TYPE} from "../types/action-types";
import {TaskReducerActionsType, TasksType} from "../types/task-types";

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TaskReducerActionsType): TasksType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_TASKS:
            return {...state, [action.payload.todolistId]: action.payload.tasks.map(t => ({...t})) }
        case ACTIONS_TYPE.REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(s => s.id !== action.payload.taskId)
            }
        case ACTIONS_TYPE.ADD_TASK:
            return {
                ...state,
                [action.payload.task.todoListId]: [{...action.payload.task}, ...state[action.payload.task.todoListId]]
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
        default:
            return state
    }
}