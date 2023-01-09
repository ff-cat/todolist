import  {memo, ChangeEvent, KeyboardEvent, useState} from "react"
import {Button, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {RequestStatusType} from "../../state/types/app-types";


interface IProps {
    addItemCallback: (title: string) => void
    entityStatus?: RequestStatusType
}

export const AddItemForm = memo(({addItemCallback, entityStatus}: IProps) => {
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
                disabled={entityStatus === 'loading'}
                variant='outlined'
                size='small'
                label='Title'
                value={tempTitle}
                error={!!error}
                helperText={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />

            <Button
                color='primary'
                onClick={onAddItem}
                disabled={entityStatus === 'loading'}
            >
                <AddBox/>
            </Button>
        </div>
    )
})