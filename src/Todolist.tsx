
import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import './App.css';


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
    removeTask: (taskId: string, toDoListId:string) => void
    changeFilter: (value: FilterValuesType, toDoListId:string) => void
    addTask: (title: string, toDoListId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListId:string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")

    let [error, setError] = useState <string|null>(null)


    const addTask = () => {
        if (title.trim () !==""){
        props.addTask(title.trim(),props.id)
        setTitle("")
        setError(null)} else
        {setError("Title is required!")}
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id );
    const onActiveClickHandler = () => props.changeFilter("active", props.id );
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id );

    return <div>
        <span>{props.title}</span>
        <button onClick={()=>{props.removeTodoList(props.id)}}>x</button>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error? "error":""}
            />
            <button onClick={addTask}>+</button>
            {error&&<div className="error-message"> {error} </div>}
        </div>
        <ul>
            {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus (t.id,newIsDoneValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone?"is-done":""}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
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


