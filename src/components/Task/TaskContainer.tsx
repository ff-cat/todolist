import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {TasksType} from "../../AppWithRedux";
import {Task} from "./Task";

type PropsType = {
    todolistId: string
    filter: string
}

export const TaskContainer = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    let tasksForTodolist = tasks[props.todolistId]
    if (props.filter === 'active') {
        tasksForTodolist = tasks[props.todolistId].filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks[props.todolistId].filter(t => t.isDone)
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
                        isDone={task.isDone}
                    />
                )
            }
        </div>
    )
})