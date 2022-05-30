import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'Task-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks('86afffa2-d5c3-4c07-ae33-150a87a15863').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.createTask('86afffa2-d5c3-4c07-ae33-150a87a15863', 'Know').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask('86afffa2-d5c3-4c07-ae33-150a87a15863', 'ed7aac0b-288a-4cb3-8be8-419c07cc2522', 'Imagine')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask('6a0bea14-3f40-480c-abd7-69e651a0081c', '6ae64523-cd6d-4bed-b8d0-32c15c0b5f9c')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
