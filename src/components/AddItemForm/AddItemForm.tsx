import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null)
        e.charCode === 13 && addItem()
    }

    return (
        <div>
            <TextField
                variant='outlined'
                size='small'
                label='Title'
                value={title}
                error={!!error}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />

            <IconButton color='primary' onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})