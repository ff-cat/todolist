import React, {useEffect} from 'react'
import './App.css'
import {AppBar, Button, IconButton, LinearProgress, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useAppSelector} from "./state/hooks";
import {LoginContainer} from "./components/Login/LoginContainer";
import {Routes, Navigate, Route} from 'react-router-dom';
import {MainTodoContainer} from "./components/MainTodoContainer/MainTodoContainer";
import {FetchAuthUserData, LogOut} from "./state/actions/auth-actions";
import {useDispatch} from "react-redux";
import {Preloader} from "./components/Preloader/Preloader";


export const App = () => {
    const {status} = useAppSelector(state => state.app)
    const {isAuth, initializationSuccess} = useAppSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchAuthUserData())
    }, [])


    return !initializationSuccess
        ? <Preloader/>
        : <div className='App'>
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
            {status === 'loading' && <LinearProgress/>}
            <Routes>
                <Route path='/' element={isAuth ? <MainTodoContainer/> : <Navigate to="/login" replace/>}/>
                <Route path='/login' element={!isAuth ? <LoginContainer/> : <Navigate to="/todo" replace/>}/>
                <Route path='/todo' element={<MainTodoContainer/>}/>
            </Routes>
        </div>
}
