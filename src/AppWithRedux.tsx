import React from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
     TodolistType
} from "./Store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";
import {TasksStateType} from "./App";



export  type FilterValuesType = "all"|"active"|"completed"



function AppWithRedux() {



    const todolists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()


    function addTodoList (title:string)  {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    function removeTodoList(toDoListId:string) {
        dispatch(removeTodolistAC(toDoListId))

    }

    function changeTitleList (id:string, title:string) {
        dispatch(changeTitleTodolistAC(id,title))
    }

    function changeFilter (toDoListId:string, value: FilterValuesType) {
        dispatch(changeFilterTodolistAC(toDoListId,value))
    }


    function removeTask(id: string, toDoListId:string) {
        dispatch(removeTaskAC(id, toDoListId))
    }

    function addTask (title:string, toDoListId:string)  {
        dispatch(addTaskAC(title,toDoListId))
    }

    function changeTasksStatus(id: string, isDone: boolean,  toDoListId:string) {
        dispatch(changeTaskStatusAC(id, isDone, toDoListId))
    }

    function changeTaskTitle (id: string, value:string,  toDoListId:string) {
        dispatch(changeTaskTitleAC(id, value, toDoListId))
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


export default AppWithRedux;
