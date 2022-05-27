import React from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {TodolistsType} from "../../AppWithRedux";

export const TodolistContainer = React.memo(() => {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
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