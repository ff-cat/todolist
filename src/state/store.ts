import {tasksReducer} from './reducers/tasks-reducer';
import {todolistsReducer} from './reducers/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from "./reducers/app-reducer";
import {authReducer} from "./reducers/auth-reducer";
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
    form: formReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

// @ts-ignore
window.store = store;