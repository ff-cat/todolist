import {tasksReducer} from './reducers/tasks-reducer';
import {todolistsReducer} from './reducers/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;