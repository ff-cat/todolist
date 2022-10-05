import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


interface IProps  {
    addItemCallback: (title: string) => void
}

export const AddItemForm = React.memo(({addItemCallback}: IProps) => {
    const [tempTitle, setTempTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onAddItem = () => {
        if (tempTitle.trim() !== '') {
            addItemCallback(tempTitle)
            setTempTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null)
        e.charCode === 13 && onAddItem()
    }

    return (
        <div>
            <TextField
                variant='outlined'
                size='small'
                label='Title'
                value={tempTitle}
                error={!!error}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />

            <IconButton color='primary' onClick={onAddItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})