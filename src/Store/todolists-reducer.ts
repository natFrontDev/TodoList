
import {v1} from "uuid";
import {FilterValuesType} from "../App";


export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_TITLE_TODOLIST = "CHANGE_TITLE_TODOLIST"
export const CHANGE_FILTER_TODOLIST = "CHANGE_FILTER_TODOLIST"



export type  RemoveTodolistActionType = {
    id: string
    type: typeof REMOVE_TODOLIST
}

export type  AddTodolistActionType = {
    title: string
    type: typeof ADD_TODOLIST
}

export type  ChangeTiTleTodolistActionType = {
    title: string
    type: typeof CHANGE_TITLE_TODOLIST
    id: string
}


export type  ChangeFilterTodolistActionType = {
    filter: FilterValuesType
    type: typeof CHANGE_FILTER_TODOLIST
    id: string
}

// export type unfollowUserType = {
//     type: typeof UNFOLLOW
//     userId: number
// }
//
// export type setUsersType = {
//     type: typeof SET_USERS
//     newUsers: Array<UserPropsType>
// }
export type TodolistsActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTiTleTodolistActionType | ChangeFilterTodolistActionType

export const removeTodolistAC = (todolistId:string):RemoveTodolistActionType => ({
    id: todolistId,
    type: REMOVE_TODOLIST})


export const addTodolistAC = (title:string):AddTodolistActionType => ({
    title: title,
    type: ADD_TODOLIST})


export const changeTitleTodolistAC = (todolistId:string, title:string):ChangeTiTleTodolistActionType => ({
    title: title,
    id:todolistId,
    type: CHANGE_TITLE_TODOLIST})

export const changeFilterTodolistAC = (todolistId:string, filter: FilterValuesType):ChangeFilterTodolistActionType => ({
    filter: filter,
    id:todolistId,
    type: CHANGE_FILTER_TODOLIST})



type TodolistType = {
    id:string,
    title: string,
    filter: FilterValuesType
}



export const todolistsReducer = (state: Array<TodolistType>,action:TodolistsActionType): Array<TodolistType>=> {

    let copyState
    switch (action.type) {
        case REMOVE_TODOLIST:
            copyState = state.filter(i=> i.id !== action.id)
            return copyState
        case ADD_TODOLIST:
            return [...state, {id:v1(), title:action.title, filter: "all"}]
        case CHANGE_TITLE_TODOLIST:
            copyState = state.map((i) => {
                if (i.id === action.id) {
                    return ({...i, title:action.title})
                } else {
                    return i
                }
            })
            return copyState
        case CHANGE_FILTER_TODOLIST:
            copyState = state.map((i) => {
                if (i.id === action.id) {
                    return ({...i, filter:action.filter})
                } else {
                    return i
                }
            })
            return copyState

        default:
            throw new Error("This action is unknown")
    }
}

