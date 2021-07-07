import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle((e.currentTarget.value))

    return (
        editMode
            ? <TextField
                value={title}
                onBlur={activateViewMode}
                onChange={onChangeHandler}
                autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}