import React, {ChangeEvent, KeyboardEvent, useState} from "react";


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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error? "error":""}
            />
            <button onClick={addTask}>+</button>
            {error&&<div className="error-message"> {error} </div>}
        </div>
    )
}
