import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {
    ADD_TODOLIST,
    addTodolistAC, changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistID1:string
let todolistID2:string
let startState: Array<TodolistsType>


beforeEach(()=> {

    todolistID1 = v1()
    todolistID2 = v1()
     startState  = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}]

})



test("correct Todolist should be removed", () => {


    const endState = todolistsReducer(startState,removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})


test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'


    const endState = todolistsReducer(startState, changeTitleTodolistAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = 'completed'


    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistID2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

