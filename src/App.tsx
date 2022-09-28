import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TodolistContainer} from "./components/Todolist/TodolistContainer";
import {AddTodolist, FetchTodolists} from "./state/actions/todolist-actions";
import {useAppSelector} from "./state/hooks";


export const App = () => {
    const {status} = useAppSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTodolists())
    }, [])

    return (
        <div className='App'>
            <AppBar position='static'>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
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

