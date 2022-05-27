import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        if (title !== props.title){
            props.onChange(title)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13){
            setEditMode(false)
            props.onChange(title)
        }

    }


    return (
        editMode
            ?
            <TextField
                size='small'
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                autoFocus
                onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})
