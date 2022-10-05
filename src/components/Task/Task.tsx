import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {RemoveTask, UpdateTask} from "../../state/actions/task-actions";

interface IProps  {
    todolistId: string
    taskId: string
    taskTitle: string
    status: number
}

export const Task = React.memo(({todolistId, taskId, taskTitle, status}: IProps) => {
    const dispatch = useDispatch()

    return <div
        key={taskId}
        className={status ? 'is-done' : ''}>
        <Checkbox
            color='primary'
            checked={Boolean(status)}
            onChange={useCallback(() => {
                dispatch(UpdateTask(todolistId, taskId,{status: Number(!Boolean(status))}))
            }, [dispatch, todolistId, taskId, status])}
        />
        <EditableSpan
            title={taskTitle}
            updateTitleCallback={useCallback((title) => {
                dispatch(UpdateTask(todolistId, taskId, {title: title}))
            }, [dispatch, todolistId, taskId])}/>
        <IconButton
            onClick={useCallback(() => {
                dispatch(RemoveTask(todolistId, taskId))
            }, [dispatch, todolistId, taskId])}>
            <Delete/>
        </IconButton>
    </div>
})