import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {AddTodolist, SetTodolists} from "./state/actions/todolist-actions";


export const AppWithRedux = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SetTodolists())
    }, [])

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
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={useCallback((title) => {
                        dispatch(AddTodolist(title))
                    }, [dispatch])}/>
                </Grid>
                <TodolistContainer/>
            </Container>
        </div>
    )
}

