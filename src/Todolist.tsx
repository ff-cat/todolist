import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import { AddItemForm } from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, id: string) => void
    addTask: (value: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, value: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export function Todolist(props: TodolistPropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const addTask = (title: string) => {
       props.addTask(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.changeTaskTitle(t.id, value, props.id)
                        }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                                    <EditableSpan title={t.title}
                                                  onChange={onChangeTitleHandler}/>
                                    <button onClick={onClickHandler}>x</button>
                                </li>
                            )
                        }
                    )}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

