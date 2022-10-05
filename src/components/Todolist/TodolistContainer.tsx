import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {useDispatch} from "react-redux";
import {FetchTodolists} from "../../state/actions/todolist-actions";
import {useAppSelector} from "../../state/hooks";

export const TodolistContainer = React.memo(() => {
    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTodolists())
    }, [])

    return (
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolistId={tl.id}
                                    todolistTitle={tl.title}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
})