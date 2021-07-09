import React from 'react';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(taskId: string, todolistId: string) {
        dispatch(RemoveTaskAC(taskId, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(AddTaskAC(title, todolistId))
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(ChangeTaskStatusAC(taskId, isDone, todolistId))
    }
    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        dispatch(ChangeTaskTitleAC(taskId, title, todolistId))
    }

    function removeTodolist(todolistId: string) {
        let action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)
    }
    function changeTodolistTitle(todolistId: string, title: string) {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }
    function changeTodolistFilter(todolistId: string, filter: FilterType) {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeTodolistFilter}
                                            addTask={addTask}
                                            changeStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
