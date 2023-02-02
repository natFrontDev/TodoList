import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';


export type addTypeFormType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props:addTypeFormType) => {

    let [title, setTitle] = useState("")

    let [error, setError] = useState <string|null>(null)

    const addTask = () => {
        if (title.trim () !==""){
            props.addItem(title.trim())
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

    return (
        <div>
            <TextField
                label={"Type value"}
                variant="outlined"
                helperText={error}
                error = {!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton  onClick={addTask}><DataSaverOnIcon/></IconButton>
        </div>
    )
}
