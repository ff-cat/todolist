import React from "react"
import {Login} from "./Login"
import s from './LoginContainer.module.css'

export const LoginContainer = () => {

    return (
        <div>
            <Login/>
            <TestAccount/>
        </div>

    )
}

const TestAccount = () => {
    return (
        <div className={s.testAccountBlock}>
            <div>
                <span>email:</span> fatflycat@gmail.com
                <p><span>password:</span> qwe123qwe</p>
            </div>
        </div>
    )
}

