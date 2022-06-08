import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

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
        taskAPI.createTask('86afffa2-d5c3-4c07-ae33-150a87a15863', '222222222-1111111111').then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.updateTask('86afffa2-d5c3-4c07-ae33-150a87a15863', 'fcd6e18e-25cc-49e5-9389-2c8576fddd45', 'Imagine')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <button onClick={deleteTask}>delete</button>
        </div>
    </div>
}
