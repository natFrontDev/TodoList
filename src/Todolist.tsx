
import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodoList: (toDoListId:string) => void
    changeTitleList: (title:string, id:string) => void
    removeTask: (taskId: string, toDoListId:string) => void
    changeFilter: (value: FilterValuesType, toDoListId:string) => void
    addTask: (title: string, toDoListId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListId:string) => void
    changeTaskTitle: (value:string,id: string, toDoListId:string)=> void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id );
    const onActiveClickHandler = () => props.changeFilter("active", props.id );
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id );

    const addTask = (title: string) => {
        props.addTask (title,props.id )
    }

    const onchangeTitleListHandler = (title: string) => {
        debugger
        props.changeTitleList (title, props.id )
    }

    return <div>
        <h3> <EditableSpan title={props.title} onChange={onchangeTitleListHandler}/></h3>
        <button onClick={()=>{props.removeTodoList(props.id)}}>x</button>
        <AddItemForm addItem = {addTask}/>
        <ul>

            {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) =>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus (t.id,newIsDoneValue, props.id)
                    }

                const onChangeTitleHandler = (value:string) =>{
                    props.changeTaskTitle (t.id,value, props.id)
                }
                    return <li key={t.id} className={t.isDone?"is-done":""}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }

        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === "all"?"active-filter":""}>All</button>
            <button onClick={onActiveClickHandler} className={props.filter === "active"?"active-filter":""}>Active</button>
            <button onClick={onCompletedClickHandler} className={props.filter === "completed"?"active-filter":""}>Completed</button>
        </div>
    </div>
}



