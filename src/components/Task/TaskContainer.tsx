import {memo, useEffect} from "react";
import {Task} from "./Task";
import {useAppSelector} from "../../state/hooks";
import {FetchTasks} from "../../state/actions/task-actions";
import {useDispatch} from "react-redux";

interface IProps  {
    todolistId: string
    filter: string
}

export const TaskContainer = memo(({todolistId, filter}: IProps) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTasks(todolistId))
    }, [])

    const tasks = useAppSelector(state => state.tasks)

    let tasksForTodolist = tasks[todolistId]
    if (filter === 'active') tasksForTodolist = tasks[todolistId].filter(t => !Boolean(t.status))
    if (filter === 'completed') tasksForTodolist = tasks[todolistId].filter(t => Boolean(t.status))

    return (
        <div>
            {
                tasksForTodolist.map(task =>
                    <Task
                        key={task.id}
                        todolistId={todolistId}
                        taskId={task.id}
                        taskTitle={task.title}
                        status={task.status}
                        entityStatus={task.entityStatus}
                    />
                )
            }
        </div>
    )
})