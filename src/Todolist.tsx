
import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox, IconButton} from "@mui/material";


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
    changeFilter: ( toDoListId:string, value: FilterValuesType) => void
    addTask: (title: string, toDoListId:string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListId:string) => void
    changeTaskTitle: (value:string,id: string, toDoListId:string)=> void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, "all" );
    const onActiveClickHandler = () => props.changeFilter(props.id ,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed" );

    const addTask = (title: string) => {
        props.addTask (title,props.id )
    }

    const onchangeTitleListHandler = (title: string) => {
        debugger
        props.changeTitleList (title, props.id )
    }

    return <div>
        <h2 style={{display:"inline"}}> <EditableSpan title={props.title} onChange={onchangeTitleListHandler}/></h2>
        <IconButton onClick={()=>{props.removeTodoList(props.id)}}><Delete/></IconButton>
        <AddItemForm addItem = {addTask}/>
        <div>

            {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) =>{
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus (t.id,newIsDoneValue, props.id)
                    }

                const onChangeTitleHandler = (value:string) =>{
                    props.changeTaskTitle (t.id,value, props.id)
                }
                    return <div key={t.id} className={t.isDone?"is-done":""}>
                        <Checkbox checked={t.isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton style = {{display:"inline"}} onClick={onClickHandler}><Delete/></IconButton>
                    </div>
                })
            }

        </div>
        <div>
            <Button onClick={onAllClickHandler} color="inherit" variant={props.filter === "all"?"contained":"text"}>All</Button>
            <Button onClick={onActiveClickHandler} color = 'primary' variant={props.filter === "active"?"contained":"text"}>Active</Button>
            <Button onClick={onCompletedClickHandler} color = 'secondary' variant={props.filter === "completed"?"contained":"text"}>Completed</Button>
        </div>
    </div>
}


