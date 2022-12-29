import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";



export  type FilterValuesType = "all"|"active"|"completed"

export  type TodolistsType = {
    id:string,
    title: string,
    filter: "all"|"active"|"completed"
}


type TasksStateType = {
[key:string]: Array <TaskType>
}



function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function addTodoList (title:string)  {
        let newTodolistId= v1();
        let newTodolist:TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists ([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]:[]})
    }

    function removeTodoList(toDoListId:string) {
        setTodolists(todolists.filter(t => t.id !== toDoListId))
        delete tasks[toDoListId]
        setTasks({...tasks})
    }


    function changeTitleList (title:string,id:string) {
        debugger
       const todolist = todolists.find(t => t.id === id);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string, toDoListId:string) {
        let todolistTasks = tasks[toDoListId]
        tasks[toDoListId]=todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask (title:string, toDoListId:string)  {
       let todolistTasks = tasks[toDoListId]
       let task = {id: v1(), title: title, isDone: false}
       tasks[toDoListId] = [task,...todolistTasks]
       setTasks({...tasks})
    }

    function changeTasksStatus(id: string, isDone: boolean,  toDoListId:string) {
        let todolistTasks = tasks[toDoListId]
        let task= todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle (id: string, value:string,  toDoListId:string) {
        let todolistTasks = tasks[toDoListId]
        let task= todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = value
            setTasks({...tasks})
        }
    }


    function changeFilter (value: FilterValuesType, toDoListId:string) {
        let todolist = todolists.find (tl => tl.id === toDoListId)
        if (todolist) {
            todolist.filter=value
            setTodolists([...todolists])
        }
    }

    return (

        <div className="App">
            <AddItemForm addItem={addTodoList}/>

            {todolists.map ((tl)=> {

                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(task => task.isDone  === false)
                }

                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(task => task.isDone  === true)
                }

                return <Todolist key = {tl.id}
                                 id = {tl.id}
                                 title= {tl.title}
                                 tasks={tasksForTodolist}
                                 removeTodoList={removeTodoList}
                                 changeTitleList = {changeTitleList}
                                 changeTaskTitle = {changeTaskTitle}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 filter = {tl.filter}
                                 changeTaskStatus = {changeTasksStatus}/>
            })}
        </div>
);
}

export default App;
