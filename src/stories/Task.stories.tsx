import {action} from "@storybook/addon-actions";
import React from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";

const checkboxCallback = action('Status changed')
const titleCallback = action('Title changed')
const deleteCallback = action('Task was deleted')

const Task = React.memo((props: any) => {
    return <div
        className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            color='primary'
            checked={props.isDone}
            onChange={()=>{checkboxCallback(props.title, props.isDone)}}
        />
        <EditableSpan
            title={props.title}
            updateTitleCallback={titleCallback}/>
        <IconButton
            onClick={()=>{deleteCallback(props.title)}}>
            <Delete/>
        </IconButton>
    </div>
})

export default {
    title: 'Task Component',
    component: Task
}



export const TaskBaseExample = () => {
    return <>
        <Task todolistId={'todolistId1'} taskId={'1'} title={'CSS'} isDone={true}/>
        <Task todolistId={'todolistId2'} taskId={'2'} title={'JS'} isDone={false}/>
    </>
}

