import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import s from "./LoginForm.module.css";
import {requiredField} from "../Common/validators";
import {checkboxMU, InputMU} from "./FormsControls/FormsControls";

export interface IFormData {
    email: string
    password: string
    rememberMe: boolean
}


export const LoginForm: React.FC<InjectedFormProps<IFormData>> =
    ({handleSubmit, error,}) => {
        return (
            <div className={s.LoginReduxForm}>
                <form onSubmit={handleSubmit}>
                    <div className={s.email}>
                        <Field
                            component={InputMU}
                            placeholder='Email'
                            name='email'
                            validate={[requiredField]}
                        />
                    </div>
                    <div className={s.password}>
                        <Field
                            component={InputMU}
                            placeholder='Password'
                            name='password'
                            type='password'
                            validate={[requiredField]}
                        />
                    </div>
                    <div className={s.rememberForgotPasswordBlock}>
                        <div className={s.remember}>
                            <Field
                                component={checkboxMU}
                                name='rememberMe'
                                size='small'
                            /> Remember Me
                        </div>
                        <div className={s.forgotPassword}><a href="##">Forgot Password?</a></div>
                    </div>
                    {
                        error && <div className={s.formError}>{error}</div>
                    }
                    <div className={s.loginButton}>
                        <button>SIGN IN</button>
                    </div>
                </form>
            </div>
        )
    }

export const LoginReduxForm = reduxForm<IFormData>({form: 'login'})(LoginForm)