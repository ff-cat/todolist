import s from './FormsControls.module.css'
import {Checkbox, TextField} from "@mui/material";

export const FormControl = ({input, meta, child, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea{...input} {...restProps}/></FormControl>
}
export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl{...props}><input className={s.input} {...input}{...restProps}/></FormControl>
}
export const InputMU = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl{...props}><TextField className={s.input} {...input}{...restProps}/></FormControl>
}

export const checkboxMU = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl{...props}><Checkbox className={s.input} {...input}{...restProps}/></FormControl>
}

