import {Container, Grid} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import React, {useCallback} from "react";
import {AddTodolist} from "../../state/actions/todolist-actions";
import {TodolistContainer} from "../Todolist/TodolistContainer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../state/hooks";
import {Navigate} from "react-router-dom";

export const MainTodoContainer = () => {
    const {isAuth} = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    const onAddTodolist = useCallback((title) => {
        dispatch(AddTodolist(title))
    }, [dispatch])

    return isAuth ? (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItemCallback={onAddTodolist}/>
            </Grid>
            <TodolistContainer/>
        </Container>
    ) : <Navigate to="/login" replace/>
}

