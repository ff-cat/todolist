import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from "../api/todolist-api";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': 'f272445b-402b-4b0f-ba99-09cb5a98a4e4'
    },
})

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('React is AWESOME').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist('15cb7bfb-93c4-44f1-857b-0559f7456ae9').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        todolistAPI.updateTodolist('15cb7bfb-93c4-44f1-857b-0559f7456ae9', 'OOQWEIUUUU)))))REACT MTF')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
