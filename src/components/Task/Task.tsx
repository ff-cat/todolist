import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../../state/actions/task-actions";

type PropsType = {
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
}

export const Task = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    return <div
        key={props.taskId}
        className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            color='primary'
            checked={props.isDone}
            onChange={useCallback(() => {
                dispatch(ChangeTaskStatusAC(props.todolistId, props.taskId))
            }, [dispatch, props.todolistId, props.taskId])}
        />
        <EditableSpan
            title={props.title}
            onChange={useCallback((title) => {
                dispatch(ChangeTaskTitleAC(props.todolistId, props.taskId, title))
            }, [dispatch, props.todolistId, props.taskId])}/>
        <IconButton
            onClick={useCallback(() => {
                dispatch(RemoveTaskAC(props.todolistId, props.taskId))
            }, [dispatch, props.todolistId, props.taskId])}>
            <Delete/>
        </IconButton>
    </div>
})