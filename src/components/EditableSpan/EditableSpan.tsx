import {ChangeEvent, KeyboardEvent, useState, memo} from "react";
import {TextField} from "@mui/material";
import {RequestStatusType} from "../../state/types/app-types";

interface IProps {
    title: string
    updateTitleCallback: (value: string) => void
    entityStatus: RequestStatusType
}

export const EditableSpan = memo(({title, updateTitleCallback, entityStatus}: IProps) => {
    const [editMode, setEditMode] = useState(false)
    const [tempTitle, setTempTitle] = useState('')

    const activateEditMode = () => {
        if (entityStatus === 'loading') return
        setEditMode(true)
        setTempTitle(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        if (tempTitle !== title) {
            updateTitleCallback(tempTitle)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setEditMode(false)
            updateTitleCallback(tempTitle)
        }
    }


    return (
        editMode
            ?
            <TextField
                disabled={entityStatus === 'loading'}
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
