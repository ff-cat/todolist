import {Provider} from "react-redux";
import {RootStateType} from "../../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/reducers/tasks-reducer";
import {todolistsReducer} from "../../state/reducers/todolists-reducer";
import {v1} from "uuid";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../../state/reducers/app-reducer";
import {authReducer} from "../../state/reducers/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    todolists: [
        {addedDate: '', order: 0, id: "todolistId1", title: "What to learn", filter: "all"},
        {addedDate: '', order: 0, id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: v1(),
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "HTML&CSS",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15863"
            },
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: v1(),
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "REACT",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
        ],
        ["todolistId2"]: [
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: v1(),
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "Milk",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: v1(),
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "Bread",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
        ]
    },
    app: {
        status: 'idle',
        error: null
    },
    auth: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        initializationSuccess: false
    },
    form: {

    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}