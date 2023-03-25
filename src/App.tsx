import React from 'react'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import {MainLayout} from "./layouts/MainLayout";
import {MainTodoContainer} from "./components/MainTodoContainer/MainTodoContainer";
import {useAppSelector} from "./state/hooks";
import {LoginContainer} from "./components/Login/LoginContainer";


export const App = () => {
    const {isAuth} = useAppSelector(state => state.auth)

    return(
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="" element={isAuth ? <MainTodoContainer/> : <Navigate to="/login" replace/>}/>
                <Route path="login" element={!isAuth ? <LoginContainer/> : <Navigate to="/" replace/>}/>
                <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Route>
        </Routes>
    )
}

