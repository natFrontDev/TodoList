import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./Store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Store/tasks-reducer";



export  type FilterValuesType = "all"|"active"|"completed"

export  type TodolistsType = {
    id:string,
    title: string,
    filter: "all"|"active"|"completed"
}

export type TasksStateType = {
    [key:string]: Array <TaskType>
}


function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function removeTodoList(toDoListId:string) {
       dispatchToTodolists(removeTodolistAC(toDoListId))
       dispatchToTasks(removeTodolistAC(toDoListId))
    }

    function changeTitleList (id:string, title:string) {
        dispatchToTodolists(changeTitleTodolistAC(id,title))
    }

    function changeFilter (toDoListId:string, value: FilterValuesType) {
   dispatchToTodolists(changeFilterTodolistAC(toDoListId,value))
    }


    function removeTask(id: string, toDoListId:string) {
        dispatchToTasks(removeTaskAC(id, toDoListId))
    }

    function addTask (title:string, toDoListId:string)  {
        dispatchToTasks(addTaskAC(title,toDoListId))
    }

    function changeTasksStatus(id: string, isDone: boolean,  toDoListId:string) {
      dispatchToTasks(changeTaskStatusAC(id, isDone, toDoListId))
    }

    function changeTaskTitle (id: string, value:string,  toDoListId:string) {
      dispatchToTasks(changeTaskTitleAC(id, value, toDoListId))
    }


    return (

        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed >
                <Grid container style = {{padding:"20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} >

                    {todolists.map((tl) => {

                        let tasksForTodolist = tasks[tl.id]

                        if (tl.filter === "active") {
                            tasksForTodolist = tasks[tl.id].filter(task => task.isDone === false)
                        }

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasks[tl.id].filter(task => task.isDone === true)
                        }

                        return <Grid item>
                            <Paper style = {{padding:"10px"}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                          title={tl.title}
                                          tasks={tasksForTodolist}
                                          removeTodoList={removeTodoList}
                                          changeTitleList={changeTitleList}
                                          changeTaskTitle={changeTaskTitle}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          filter={tl.filter}
                                          changeTaskStatus={changeTasksStatus}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducers;
