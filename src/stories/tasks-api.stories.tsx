import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/api";

export default {
    title: 'TASKS-API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasks = (todolistId: string) => {
        tasksAPI.getTasks(todolistId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={() => {
                getTasks(todolistId)
            }}>get tasks
            </button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const createTask = (title: string, todolistId: string) => {
        tasksAPI.createTask(title, todolistId)
            .then(response => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'task title'}
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {setTodolistId(e.currentTarget.value)}}
            />
            <button onClick={() => {
                createTask(title, todolistId)
            }}>create task
            </button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const deleteTask =  (taskId: string, todolistId: string) => {
        tasksAPI.deleteTask(taskId, todolistId)
            .then(response => {
                setState(response.data)
            })
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={'task id'}
                value={taskId}
                onChange={(e) => {setTaskId(e.currentTarget.value)}}
            />
            <input
                placeholder={'todolist id'}
                value={todolistId}
                onChange={(e) => {setTodolistId(e.currentTarget.value)}}
            />
            <button onClick={() => {
                deleteTask(taskId, todolistId)
            }}>delete task
            </button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '25a6e86c-eac4-45d2-aadb-d2ab6b9e0cca'
        tasksAPI.updateTask(todolistId, '4c244dc5-bdf3-4eec-b095-f3a2e840d8d1', '777777777777777777')
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
