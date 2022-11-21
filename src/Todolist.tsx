
import React from "react";
import {FilterValuesType} from "./App";

type TodoListTypeProps = {
    title:string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: number) => void
    changeFilter: (value:FilterValuesType) => void
}

type TaskPropsType = {
    id:number,
    title:string,
    isDone:boolean
}
export const Todolist = ( props:TodoListTypeProps )=>{

    return (<div>
        <h3>{props.title}</h3>

        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map ((task: TaskPropsType) =>
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={(event)=> props.removeTask(task.id)}>
                              ✖️
                    </button>
                </li>
             )}
        </ul>
        <div>
            <button onClick={()=> {props.changeFilter("all")}}>All</button>
            <button onClick={()=> {props.changeFilter( "active")}}>Active</button>
            <button onClick={()=> {props.changeFilter("completed")}}>Completed</button>
        </div>
    </div>);
}