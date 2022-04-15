import {v1} from "uuid"
import {TasksType} from "../App"
import {tasksReducer} from "./tasks-reducer"
import {
    AddTaskAC,
    AddTodolistAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    RemoveTodolistAC
} from "./actions";

let todolistId1: string
let todolistId2: string
let startState: TasksType = {}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'REACT', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
            {id: '3', title: 'Meat', isDone: false},
        ]

    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, '2'))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('HTML&CSS')
    expect(endState[todolistId1][1].title).toBe('REACT')
    expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()
})
test('correct task should be added', () => {
    const endState = tasksReducer(startState, AddTaskAC(todolistId2, 'juce'))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juce')
    expect(endState[todolistId2][0].isDone).toBe(false)
})
test('correct task should change its name', () => {
    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId2, '2', "New Task Title"))

    expect(endState[todolistId2][1].title).toBe("New Task Title")
    expect(endState[todolistId1][1].title).toBe('JS')
})
test('correct status of task should be changed', () => {
    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistId2, '2'))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][1].isDone).toBeFalsy()
    expect(endState[todolistId1][1].isDone).toBeTruthy()
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, AddTodolistAC("new todolist"))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, RemoveTodolistAC(Object.keys(startState)[1]))

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
