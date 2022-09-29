import React, {useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../state/store";
import {TodolistsType} from "../../state/types/todolist-types";
import {FetchTodolists} from "../../state/actions/todolist-actions";

export const TodolistContainer = React.memo(() => {
    const todolists = useSelector<RootStateType, TodolistsType[]>(state => state.todolists)
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
                                    title={tl.title}
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