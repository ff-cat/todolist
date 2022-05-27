import React, {useCallback} from 'react'
import './App.css'
import {TaskType} from "./components/Todolist/Todolist"
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {AddTodolistAC} from "./state/actions/todolist-actions";

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: TaskType[]
}


function AppWithRedux() {
    const dispatch = useDispatch()

    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={useCallback((title) => {
                        let action = AddTodolistAC(title)
                        dispatch(action)
                    }, [dispatch])}/>
                </Grid>
                    <TodolistContainer/>
            </Container>
        </div>
    )
}

export default AppWithRedux;
