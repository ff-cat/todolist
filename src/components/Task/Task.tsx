import {memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {RemoveTask, UpdateTask} from "../../state/actions/task-actions";
import {RequestStatusType} from "../../state/types/app-types";

interface IProps {
    todolistId: string
    taskId: string
    taskTitle: string
    status: number
    entityStatus: RequestStatusType
}

export const Task = memo(({todolistId, taskId, taskTitle, status, entityStatus}: IProps) => {
    const dispatch = useDispatch()

    return (
        <div key={taskId} className={status ? 'is-done' : ''}>
            <Checkbox
                disabled={entityStatus === 'loading'}
                color='primary'
                checked={Boolean(status)}
                onChange={useCallback(() => {
                    dispatch(UpdateTask(todolistId, taskId, {status: Number(!status)}))
                }, [dispatch, todolistId, taskId, status])}
            />
            <EditableSpan
                title={taskTitle}
                updateTitleCallback={useCallback((title) => {
                    dispatch(UpdateTask(todolistId, taskId, {title}))
                }, [dispatch, todolistId, taskId])}
                entityStatus={entityStatus}

            />
            <IconButton
                disabled={entityStatus === 'loading'}
                onClick={useCallback(() => {
                    dispatch(RemoveTask(todolistId, taskId))
                }, [dispatch, todolistId, taskId])}>
                <Delete/>
            </IconButton>
        </div>
    )
})