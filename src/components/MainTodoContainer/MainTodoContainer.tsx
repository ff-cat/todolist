import {Container, Grid} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import React, {useCallback} from "react";
import {AddTodolist} from "../../state/actions/todolist-actions";
import {TodolistContainer} from "../Todolist/TodolistContainer";
import {useDispatch} from "react-redux";

export const MainTodoContainer = () => {
    const dispatch = useDispatch()

    const onAddTodolist = useCallback((title) => {
        dispatch(AddTodolist(title))
    }, [dispatch])

    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItemCallback={onAddTodolist}/>
            </Grid>
            <TodolistContainer/>
        </Container>
    )
}

