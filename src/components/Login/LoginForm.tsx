import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./LoginForm.module.css";
import {requiredField} from "./validators";
import {Input} from "./FormsControls/FormsControls";

export interface IFormData {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<IFormData>> = ({handleSubmit, error,}) => {
    return (
        <div className={s.LoginReduxForm}>
            <form onSubmit={handleSubmit}>
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
                    error && <div className={s.formError}>{error}</div>
                }
                <div className={s.loginButton}>
                    <button>Sign in</button>
                </div>
            </form>
        </div>
    )
}

export const LoginReduxForm = reduxForm<IFormData>({form: 'login'})(LoginForm)