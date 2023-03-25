import {Preloader2} from "../Common/Preloader/Preloader2";
import {ErrorSnackbar} from "../Common/ErrorSnackbar/ErrorSnackbar";
import {AppBar, Button, IconButton, LinearProgress, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FetchAuthUserData, LogOut} from "../../state/actions/auth-actions";
import React, {useEffect} from "react";
import {useAppSelector} from "../../state/hooks";
import {useDispatch} from "react-redux";

export function Header() {

    const {status} = useAppSelector(state => state.app)
    const {isAuth, initializationSuccess} = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchAuthUserData())
    }, [dispatch])

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
        </div>

}