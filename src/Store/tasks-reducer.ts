import {v1} from "uuid";
import {TasksStateType, TodolistsType} from "../App";
import {
    ADD_TODOLIST,
    AddTodolistActionType,
    REMOVE_TODOLIST,
    RemoveTodolistActionType, todolistID1,
    todolistID2
} from "./todolists-reducer";


export const REMOVE_TASK = "REMOVE_TASK"
export const ADD_TASK = "ADD_TASK"
export const CHANGE_STATUS_TASK= "CHANGE_STATUS_TASK"
export const CHANGE_TASK_TITLE= "CHANGE_TASK_TITLE"
// export const CHANGE_FILTER_TODOLIST = "CHANGE_FILTER_TODOLIST"


export type  RemoveTaskActionType = {
    taskId: string
    todoListId: string
    type: typeof REMOVE_TASK
}

export type  AddTaskActionType = {
    todoListId: string
    title: string
    type: typeof ADD_TASK
}

export type  ChangeStatusTaskActionType = {
    isDone: boolean
    type: typeof CHANGE_STATUS_TASK
    todoListId: string
    taskId: string
}

export type  ChangeTaskTitleActionType = {
    title:string
    type: typeof CHANGE_TASK_TITLE
    todoListId: string
    taskId: string
}



export type TasksActionType = RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType
    | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const removeTaskAC = (taskId:string, todoListID: string):RemoveTaskActionType=> ({
    taskId: taskId,
    todoListId: todoListID,
    type: REMOVE_TASK})


export const addTaskAC = (title:string, todoListId:string):AddTaskActionType => ({
    todoListId: todoListId,
    title: title,
    type: ADD_TASK})


export const changeTaskStatusAC = (taskId:string, isDone:boolean, todolistId:string, ):
    ChangeStatusTaskActionType => ({
    taskId: taskId,
    isDone: isDone,
    todoListId: todolistId,
    type: CHANGE_STATUS_TASK
     })


export const changeTaskTitleAC = (taskId:string, title:string, todolistId:string, ):ChangeTaskTitleActionType => ({
    taskId: taskId,
    title: title,
    todoListId: todolistId,
    type: CHANGE_TASK_TITLE
})

//
// export const changeFilterTodolistAC = (todolistId:string, filter: FilterValuesType):ChangeFilterTodolistActionType => ({
//     filter: filter,
//     id:todolistId,
//     type: CHANGE_FILTER_TODOLIST})
const  initialState: TasksStateType = {
    [todolistID1]: [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},

],
    [todolistID2]: [
    {id: v1(), title: 'Rest API', isDone: true},
    {id: v1(), title: 'GraphQL', isDone: false},
]
}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {


    let copyState
    switch (action.type) {

        case REMOVE_TASK:
            copyState = {
                ...state, [action.todoListId]: state[action.todoListId].filter
                (i => i.id !== action.taskId)
            }
            return copyState

        case ADD_TASK:
            return {
                ...state, [action.todoListId]: [{id: v1(), title: action.title, isDone: false},
                    ...state[action.todoListId]]
            }

        case CHANGE_STATUS_TASK:
            copyState = {
                ...state, [action.todoListId]: state[action.todoListId].map((i) => {
                    if (i.id === action.taskId) {
                        return ({...i, isDone: action.isDone})
                    } else {
                        return i
                    }
                })
            }
            return copyState

        case CHANGE_TASK_TITLE:
            copyState = {
                ...state, [action.todoListId]: state[action.todoListId].map((i) => {
                    if (i.id === action.taskId) {
                        return ({...i, title: action.title})
                    } else {
                        return i
                    }
                })
            }
            return copyState

        case  ADD_TODOLIST:
            return {[action.id]: [], ...state}

        case REMOVE_TODOLIST:
            copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return {...state}
    }
}

