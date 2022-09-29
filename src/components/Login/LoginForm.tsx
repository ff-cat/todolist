import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./LoginForm.module.css";
import {requiredField} from "./validators";
import {Input} from "./FormsControls/FormsControls";

export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <div className={s.LoginReduxForm}>
            <form onSubmit={props.handleSubmit}>
                <div className={s.email}>
                    <Field
                        component={Input}
                        placeholder='Email'
                        name='email'
                        validate={[requiredField]}
                    />
                </div>
                <div className={s.password}>
                    <Field
                        component={Input}
                        placeholder='Password'
                        name='password'
                        type='password'
                        validate={[requiredField]}
                    />
                </div>
                <div className={s.remember}>
                    <Field
                        component={Input}
                        type='checkbox'
                        name='rememberMe'
                    /> remember me
                </div>
                {
                    props.error && <div className={s.formError}>{props.error}</div>
                }
                <div className={s.loginButton}>
                    <button>Sign in</button>
                </div>
            </form>
        </div>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)