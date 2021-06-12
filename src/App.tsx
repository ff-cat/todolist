import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    } else tasksForTodolist = tasks

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }
    function changeFilter(value: FilterType) {
            setFilter(value)
    }
    function addTask(value: string) {
        let newTask = {id: v1(), title: value, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)

    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
