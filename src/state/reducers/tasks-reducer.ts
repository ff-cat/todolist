import {ACTIONS_TYPE} from "../actions/action-types";
import {TaskReducerActionsType} from "../actions/task-actions";
import {TaskType} from "../../api/task-api";

export type TasksType = {
    [key: string]: TaskType[]
}
const initialState: TasksType = {
}

export const tasksReducer = (state: TasksType = initialState, action: TaskReducerActionsType): TasksType => {
    switch (action.type) {
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
        case ACTIONS_TYPE.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(s => s.id === action.payload.taskId
                    ? {...s, title: action.payload.title} : s)
            }
        case ACTIONS_TYPE.CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(s => s.id === action.payload.taskId
                    ? {...s, status: Number(!Boolean(s.status))} : s)
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
        case ACTIONS_TYPE.SET_TASKS:
            return {...state, [action.payload.todolistId]: action.payload.tasks
                        .map(t => ({...t})) }
        default:
            return state
    }
}