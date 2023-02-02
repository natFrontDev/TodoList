import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type EditableSpanPropsType = {
    title: string
    onChange: (value:string)=> void
}
export const EditableSpan = (props:EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(" ")

    const changeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle (e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange (title)
    }

    return (
        editMode? <input onChange={changeTitleHandler} value={title} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}