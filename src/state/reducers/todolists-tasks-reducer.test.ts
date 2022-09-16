import {tasksReducer} from "./task/tasks-reducer";
import { todolistsReducer} from "./todolist/todolists-reducer";
import {AddTodolistAC} from "../actions/todolist-actions";
import {TasksType, TodolistsType} from "../../App";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistsType[] = [];

    const action = AddTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});
