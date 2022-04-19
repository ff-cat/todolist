import React, {useCallback} from "react"
import {FilterType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {
    AddTaskAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "../state/actions";
import {TaskContainer} from "./TaskContainer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolistId: string
    title: string
    filter: FilterType
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    return (
        <div className="App">
            <div>
                <div>
                    <h3>
                        <EditableSpan
                            title={props.title}
                            onChange={useCallback((title) => {
                                dispatch(ChangeTodolistTitleAC(props.todolistId, title))
                            }, [dispatch, props.todolistId])}
                        />
                        <IconButton
                            onClick={useCallback(() => {
                                dispatch(RemoveTodolistAC(props.todolistId))
                            }, [dispatch, props.todolistId])}
                        >
                            <Delete/>
                        </IconButton>
                    </h3>
                </div>
                <div>
                    <AddItemForm addItem={useCallback((title: string) => {
                        dispatch(AddTaskAC(props.todolistId, title))
                    }, [dispatch, props.todolistId])}
                    />
                </div>
                <div>
                    <TaskContainer todolistId={props.todolistId} filter={props.filter}/>
                </div>
                <div>
                    <Button
                        onClick={useCallback(() => {
                            dispatch(ChangeTodolistFilterAC(props.todolistId, 'all'))
                        }, [dispatch, props.todolistId])}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                        variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        size='small'
                        color='primary'
                    >All
                    </Button>
                    <Button
                        onClick={useCallback(() => {
                            dispatch(ChangeTodolistFilterAC(props.todolistId, 'active'))
                        }, [dispatch, props.todolistId])}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        size='small'
                        color='primary'
                    >Active
                    </Button>
                    <Button
                        onClick={useCallback(() => {
                            dispatch(ChangeTodolistFilterAC(props.todolistId, 'completed'))
                        }, [dispatch, props.todolistId])}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        size='small'
                        color='primary'
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})