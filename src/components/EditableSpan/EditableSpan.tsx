import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

interface IProps  {
    title: string
    updateTitleCallback: (value: string) => void
}

export const EditableSpan = React.memo(({title, updateTitleCallback}: IProps) => {
    const [editMode, setEditMode] = useState(false)
    const [tempTitle, setTempTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTempTitle(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        if (tempTitle !== title){
            updateTitleCallback(tempTitle)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13){
            setEditMode(false)
            updateTitleCallback(tempTitle)
        }

    }


    return (
        editMode
            ?
            <TextField
                size='small'
                value={tempTitle}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                autoFocus
                onKeyPress={onKeyPressHandler}
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
})
