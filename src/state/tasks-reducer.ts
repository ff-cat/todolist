import {TaskType} from '../Todolist';
import {v1} from 'uuid';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';
import {TasksStateType} from '../App';

type ActionsType = RemoveTaskAT | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId];
            stateCopy[action.payload.todolistId] = tasks.filter(t => t.id !== action.payload.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            const tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [newTask, ...tasks]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = todolistTasks
                .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = todolistTasks
                .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;
        }
        default:
            return state;
    }
}

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
        todolistId: string
        title: string
    }
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}

export const RemoveTask = (taskId: string, todolistId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    payload: {taskId, todolistId},
})
export const AddTask = (title: string, todolistId: string): AddTaskAT => ({
        type: 'ADD-TASK',
        payload: {title, todolistId},
})
export const ChangeTaskStatus = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => ({
        type: 'CHANGE-TASK-STATUS',
        payload: {isDone, todolistId, taskId},
})
export const ChangeTaskTitle = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => ({
        type: 'CHANGE-TASK-TITLE',
        payload: {title, todolistId, taskId},
})

