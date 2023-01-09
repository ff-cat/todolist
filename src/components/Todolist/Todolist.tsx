import {useCallback, useEffect, memo} from "react"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskContainer} from "../Task/TaskContainer";
import {ChangeTodolistFilter, RemoveTodolist, UpdateTodolistTitle,} from "../../state/actions/todolist-actions";
import {AddTask, FetchTasks} from "../../state/actions/task-actions";
import {FilterType} from "../../state/types/todolist-types";
import s from './Todolist.module.css'
import {RequestStatusType} from "../../state/types/app-types";


interface IProps {
    todolistId: string
    todolistTitle: string
    filter: FilterType
    entityStatus: RequestStatusType
}

export const Todolist = memo(({todolistId, todolistTitle, filter, entityStatus}: IProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTasks(todolistId))
    }, [])

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={todolistTitle}
                        updateTitleCallback={useCallback((title) => {
                            dispatch(UpdateTodolistTitle(todolistId, title))
                        }, [dispatch, todolistId])}
                        entityStatus={entityStatus}
                    />
                    <IconButton
                        disabled={entityStatus === 'loading'}
                        onClick={useCallback(() => {
                                dispatch(RemoveTodolist(todolistId))
                            },
                            [dispatch, todolistId])
                        }>
                        <Delete/>
                    </IconButton>
                </h3>
            </div>
            <div>
                <AddItemForm
                    addItemCallback={useCallback((title: string) => {
                            dispatch(AddTask(todolistId, title))
                        },
                        [dispatch, todolistId])}
                    entityStatus={entityStatus}
                />
            </div>
            <div>
                <TaskContainer todolistId={todolistId} filter={filter}/>
            </div>
            <div className={s.filterButtonBlock}>
                <Button
                    onClick={useCallback(() => {
                        dispatch(ChangeTodolistFilter(todolistId, 'all'))
                    }, [dispatch, todolistId])}
                    className={filter === 'all' ? 'active-filter' : ''}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    size='small'
                    color='primary'
                >All
                </Button>
                <Button
                    onClick={useCallback(() => {
                        dispatch(ChangeTodolistFilter(todolistId, 'active'))
                    }, [dispatch, todolistId])}
                    className={filter === 'active' ? 'active-filter' : ''}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    size='small'
                    color='primary'
                >Active
                </Button>
                <Button
                    onClick={useCallback(() => {
                        dispatch(ChangeTodolistFilter(todolistId, 'completed'))
                    }, [dispatch, todolistId])}
                    className={filter === 'completed' ? 'active-filter' : ''}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    size='small'
                    color='primary'
                >Completed
                </Button>
            </div>
        </div>
    )
})