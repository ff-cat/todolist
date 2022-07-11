import React from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../../state/store";
import {Task} from "./Task";
import {TasksType} from "../../state/reducers/tasks-reducer";

type PropsType = {
    todolistId: string
    filter: string
}

export const TaskContainer = React.memo((props: PropsType) => {
    const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

    let tasksForTodolist = tasks[props.todolistId]
    if (props.filter === 'active') {
        tasksForTodolist = tasks[props.todolistId].filter(t => !Boolean(t.status))
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks[props.todolistId].filter(t => Boolean(t.status))
    }
    return (
        <div>
            {
                tasksForTodolist.map(task =>
                    <Task
                        key={task.id}
                        todolistId={props.todolistId}
                        taskId={task.id}
                        title={task.title}
                        status={task.status}
                    />
                )
            }
        </div>
    )
})