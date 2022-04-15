import {TasksType} from "../components/AppWithRedux";
import {v1} from "uuid";
import {ACTIONS_TYPE, TaskReducerActionsType} from "./actions";
// import {todolistId1, todolistId2} from "./todolists-reducer";

const initialState: TasksType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'REACT', isDone: false},
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'Bread', isDone: true},
    //     {id: v1(), title: 'Meat', isDone: false},
    // ],
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
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
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
                    ? {...s, isDone: !s.isDone} : s)
            }
        case ACTIONS_TYPE.ADD_TODOLIST:
            return {[action.payload.todolistId]: [], ...state}
        case ACTIONS_TYPE.REMOVE_TODOLIST:
            delete state[action.payload.todolistId]
            return {...state}
        default:
            return state
    }
}