import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/api";

export default {
    title: 'TODOLISTS-API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const createTask = (title: string) => {
        todolistsAPI.createTodolist(title)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolist title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={() => {
                createTask(title)
            }}>create todolist
            </button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const deleteTodolist = (todolistId: string) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <button onClick={() => {
                deleteTodolist(todolistId)
            }}>delete todolist
            </button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const updateTodolist = (title: string, todolistId: string) => {
        todolistsAPI.updateTodolist(title, todolistId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolist title'}
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {setTodolistId(e.currentTarget.value)}}
            />
            <button onClick={() => {
                updateTodolist(title, todolistId)
            }}>update todolist
            </button>
        </div>
    </div>
}
