import {v1} from "uuid"
import {tasksReducer} from "../tasks-reducer"
import {
    AddTaskAC,
    UpdateTaskAC,
    RemoveTaskAC,
} from "../../actions/task-actions";
import {AddTodolistAC, RemoveTodolistAC} from "../../actions/todolist-actions";
import {ITasks} from "../../types/task-types";

let todolistId1: string
let todolistId2: string
let startState: ITasks = {}

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        [todolistId1]: [
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: '1',
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "HTML&CSS",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: '2',
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "JS",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
        ],
        [todolistId2]: [
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: '1',
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "Milk",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
            {
                addedDate: "2022-07-09T12:18:19.477",
                deadline: null,
                description: null,
                id: '2',
                order: 0,
                priority: 1,
                startDate: null,
                status: 0,
                title: "Bread",
                todoListId: "86afffa2-d5c3-4c07-ae33-150a87a15862"
            },
        ]

    }
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, '2'))

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe('HTML&CSS')
    expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()
})
test('correct task should be added', () => {
    const endState = tasksReducer(startState, AddTaskAC({
        addedDate: "2022-07-09T12:18:19.477",
        deadline: null,
        description: null,
        id: '2',
        order: 0,
        priority: 1,
        startDate: null,
        status: 0,
        title: 'juice',
        todoListId: todolistId2
    },))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe('juice')
    expect(Boolean(endState[todolistId2][0].status)).toBe(false)
})
test('correct task should change its name', () => {
    const endState = tasksReducer(startState, UpdateTaskAC(todolistId2, '2', {
        title: "New Task Title",
        description: null,
        status: 0,
        priority: 1,
        startDate: '2022',
        deadline: null,
    }))

    expect(endState[todolistId2][1].title).toBe("New Task Title")
    expect(endState[todolistId1][1].title).toBe('JS')
})
test('correct status of task should be changed', () => {
    const endState = tasksReducer(startState, UpdateTaskAC(todolistId2, '2', {
        title: "New Task Title",
        description: null,
        status: 1,
        priority: 1,
        startDate: '2022',
        deadline: null,
    }))

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][1].status).toBe(1)
    expect(endState[todolistId1][1].status).toBe(0)
})
test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, AddTodolistAC("todolistId3", 'Moon'))

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
