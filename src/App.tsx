import React, {useEffect} from 'react'
import './App.css'
import {useAppSelector} from "./state/hooks";
import {LoginContainer} from "./components/Login/LoginContainer";
import {Routes, Navigate, Route} from 'react-router-dom';
import {MainTodoContainer} from "./components/MainTodoContainer/MainTodoContainer";
import {FetchAuthUserData, LogOut} from "./state/actions/auth-actions";
import {useDispatch} from "react-redux";
import {AppBar, Button, IconButton, LinearProgress, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "./components/Common/ErrorSnackbar/ErrorSnackbar";
import {Preloader2} from "./components/Common/Preloader/Preloader2";


export const App = () => {
    const {status} = useAppSelector(state => state.app)
    const {isAuth, initializationSuccess} = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchAuthUserData())
    }, [])


    return !initializationSuccess
        ? <Preloader2/>
        : <div className='App'>
            <ErrorSnackbar/>
            <AppBar position='static'>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    {
                        isAuth
                            ? <Button onClick={() => {
                                dispatch(LogOut())
                            }} color='inherit'>Logout</Button>
                            : <Button onClick={() => {
                            }} color='inherit'>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            {status === 'loading' && <div className='app-linear'><LinearProgress/></div>}
            <Routes>
                <Route path='/' element={isAuth ? <MainTodoContainer/> : <Navigate to="/login" replace/>}/>
                <Route path='/login' element={!isAuth ? <LoginContainer/> : <Navigate to="/todo" replace/>}/>
                <Route path='/todo' element={<MainTodoContainer/>}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
}

