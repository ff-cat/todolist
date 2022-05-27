import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

const changeCallback = action('Title changed')

export default {
    title: 'Editable Span Component',
    component: EditableSpan
}

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Title'} onChange={changeCallback}/>
}