import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {RemoveTask, UpdateTask} from "../../state/actions/task-actions";

type PropsType = {
    todolistId: string
    taskId: string
    title: string
    status: number
}

export const Task = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    return <div
        key={props.taskId}
        className={props.status ? 'is-done' : ''}>
        <Checkbox
            color='primary'
            checked={Boolean(props.status)}
            onChange={useCallback(() => {
                dispatch(UpdateTask(props.todolistId, props.taskId,{status: Number(!Boolean(props.status))}))
            }, [dispatch, props.todolistId, props.taskId])}
        />
        <EditableSpan
            title={props.title}
            onChange={useCallback((title) => {
                dispatch(UpdateTask(props.todolistId, props.taskId, {title: title}))
            }, [dispatch, props.todolistId, props.taskId])}/>
        <IconButton
            onClick={useCallback(() => {
                dispatch(RemoveTask(props.todolistId, props.taskId))
            }, [dispatch, props.todolistId, props.taskId])}>
            <Delete/>
        </IconButton>
    </div>
})